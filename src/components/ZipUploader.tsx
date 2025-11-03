// "use client"
// import React from "react"
// import { Upload, X, FileArchive, Check, AlertCircle } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { useDropzone } from "react-dropzone"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form"
// import { useRouter } from "next/navigation"
// import { createZipFile } from "@/app/actions/createZip"

// const formSchema = z.object({
//   zipFile: z.instanceof(File).refine((file) => file.type === "application/zip" || file.name.endsWith('.zip'), {
//     message: "File must be a ZIP archive"
//   }),
// })

// const ZipUploader = () => {
//   const [status, setStatus] = React.useState<"idle" | "success">("idle")
//   const [file, setFile] = React.useState<File | null>(null)
//   const [generating, setGenerating] = React.useState(false)  
//   const [error, setError] = React.useState<string | null>(null) 
//   const router = useRouter()

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       zipFile: undefined,
//     },
//   })

//   const onDrop = React.useCallback((acceptedFiles: File[]) => {
//     const zipFile = acceptedFiles[0]
//     if (zipFile && (zipFile.type === "application/zip" || zipFile.name.endsWith('.zip'))) {
//       setFile(zipFile)
//       setStatus("success")
//       setError(null)
//       form.setValue("zipFile", zipFile)
//       form.clearErrors("zipFile")
//     } else {
//       setError("Please select a valid ZIP file")
//     }
//   }, [form])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/zip': ['.zip'],
//       'application/x-zip-compressed': ['.zip']
//     },
//     maxFiles: 1,
//     disabled: status === "success"
//   })

//   const handleReset = () => {
//     setFile(null)
//     setStatus("idle")
//     setError(null)
//     form.reset()
//   }

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         const base64 = result.split(',')[1];
//         resolve(base64);
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log('Form submitted with values:', values)
    
//     if (!values.zipFile) {
//       setError('No file selected');
//       return;
//     }
  
//     try {
//       setGenerating(true)
//       setError(null)
      
//       console.log('Converting file to base64...')
//       console.log('File name:', values.zipFile.name)
//       console.log('File size:', values.zipFile.size, 'bytes')
      
//       const base64 = await fileToBase64(values.zipFile);
      
//       console.log('Base64 length:', base64.length)
      
//       if (!base64 || base64.length === 0) {
//         throw new Error('Failed to convert file to base64');
//       }

//       const formData = new FormData();
//       formData.append('zipFile', base64);
//       formData.append('zipFileName', values.zipFile.name);
  
//       const result = await createZipFile(formData);

//       if (result.success) {
//         console.log('Upload successful:', result)
//         setGenerating(false)
//         handleReset();
//         router.push("/dashboard")
//       } else {
//         console.error('Upload error:', result.error)
//         setGenerating(false)
//         setError(result.error || 'Failed to upload file');
//       }
//     } catch (error) {
//       console.error('Submission error:', error)
//       setGenerating(false)
//       setError(error instanceof Error ? error.message : 'Failed to process file');
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
  
//         <FormField
//           control={form.control}
//           name="zipFile"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <div
//                   {...getRootProps()}
//                   className={`relative border-2 border-dashed rounded-xl w-full h-[220px] transition-all duration-300 ${
//                     status === "success"
//                       ? "border-[#6f64fa] bg-[#6f64fa]/5"
//                       : isDragActive
//                       ? "border-[#6f64fa] bg-[#6f64fa]/10"
//                       : "border-gray-300 hover:border-[#6f64fa]/50 hover:bg-gray-50"
//                   } ${status === "success" ? "cursor-not-allowed" : "cursor-pointer"}`}
//                 >
//                   <input {...getInputProps()} />
                  
//                   {status === "success" ? (
//                     <div className="flex flex-col items-center justify-center h-full gap-4">
//                       <div className="relative">
//                         <div className="w-16 h-16 rounded-full bg-[#6f64fa]/10 flex items-center justify-center">
//                           <FileArchive className="w-8 h-8 text-[#6f64fa]" />
//                         </div>
//                         <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6f64fa] rounded-full flex items-center justify-center">
//                           <Check className="w-4 h-4 text-white" />
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-medium text-gray-900">File uploaded successfully</p>
//                         <p className="text-xs text-gray-500 mt-1">Ready to generate documentation</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
//                       <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
//                         isDragActive ? "bg-[#6f64fa]/20" : ""
//                       }`}>
//                         <Upload className={`w-6 h-6 transition-colors ${
//                           isDragActive ? "text-[#6f64fa]" : "text-gray-400"
//                         }`} />
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-medium text-gray-700">
//                           Drag & Drop your zip file here
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">or</p>
//                         <button
//                           type="button"
//                           className="mt-2 text-sm font-medium text-[#6f64fa] hover:text-[#5a51d1] transition-colors underline-offset-2 hover:underline"
//                         >
//                           Browse files
//                         </button>
//                       </div>
//                       <p className="text-xs text-gray-400">Supports: .zip files only</p>
//                     </div>
//                   )}
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {error && (
//           <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm font-medium text-red-900">Upload Failed</p>
//               <p className="text-xs text-red-700 mt-1">{error}</p>
//             </div>
//           </div>
//         )}

//         {status === "success" && file && (
//           <div className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-[#6f64fa]/10 flex items-center justify-center">
//                 <FileArchive className="w-5 h-5 text-[#6f64fa]" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={handleReset}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
//             >
//               <X className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
//             </button>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={status !== "success" || generating}
//           className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
//             status === "success" && !generating
//               ? "bg-gray-800 hover:bg-black cursor-pointer text-white shadow-lg shadow-[#6f64fa]/25 hover:shadow-xl hover:shadow-[#6f64fa]/30 transform hover:scale-[1.02]"
//               : "bg-gray-200 text-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {generating ? 'Generating...' : 'Generate Documentation'}
//         </button>
//       </form>
//     </Form>
//   )
// }

// export default ZipUploader