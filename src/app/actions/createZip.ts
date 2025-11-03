"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { extractFile } from "@/lib/zipExtract";
import { generateDocumentation } from "@/lib/ai";
import { revalidatePath } from "next/cache";

export async function createZipFile(formData: FormData) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to upload files"
      };
    }

    const zipFile = formData.get("zipFile") as string;
    const zipFileName = formData.get("zipFileName") as string;

    if (!zipFile || !zipFileName) {
      return {
        success: false,
        error: "Missing file or filename"
      };
    }

    const buffer = Buffer.from(zipFile, 'base64');
    
    console.log('Buffer length:', buffer.length);
    console.log('First 4 bytes (should be PK for zip):', buffer.slice(0, 4).toString('hex'));
    
    if (buffer.length === 0) {
      return {
        success: false,
        error: "Empty file received"
      };
    }
    
    if (buffer[0] !== 0x50 || buffer[1] !== 0x4B) {
      return {
        success: false,
        error: "Invalid zip file: does not start with PK signature"
      };
    }
    
    const projectData = await db.projectData.create({
      data: {
        userId: session.user.id,
        zipFileName: zipFileName
      }
    });
    
    console.log('✅ Project data created:', projectData.id);
    
    console.log('🔍 Extracting files...');
    const ast = await extractFile(buffer);
    
    console.log('📝 Generating documentation...');
    const documentation = await generateDocumentation(ast);
    
    console.log('💾 Saving documentation...');
    const doc = await db.documentation.create({
      data: {
        projectDataId: projectData.id,
        body: JSON.stringify(documentation)
      }
    });

    console.log('✅ Documentation created:', doc.id);

    revalidatePath('/dashboard');

    return {
      success: true,
      projectId: projectData.id,
      documentationId: doc.id
    };
    
  } catch (error) {
    console.error('❌ Error creating project:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create project'
    };
  }
}