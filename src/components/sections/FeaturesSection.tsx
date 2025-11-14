import Image from "next/image";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Code2, FileText, Sparkles } from "lucide-react";
import { Animated } from "../ui/animated";


const features = [
  {
    name: "AST-Powered Analysis",
    description: "Deep code parsing using Abstract Syntax Trees to understand your codebase structure and generate accurate documentation.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 overflow-hidden rounded-xl translate-yy-">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="absolute top-0 left-0 right-0 bottom-[35%] p-4">
          <div className="relative w-full rounded-2xl overflow-hidden h-[100%] bg-white p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Code2 className="w-4 h-4 text-[#ff4d1a]" />
                <span className="font-mono text-xs text-gray-600">Analyzing...</span>
              </div>
              <div className="bg-gray-50 rounded p-3 font-mono text-xs">
                <div className="text-green-600">✓ 247 components parsed</div>
                <div className="text-green-600">✓ 89 functions extracted</div>
                <div className="text-green-600">✓ 40 classes extracted</div>
                <div className="text-green-600">✓ 40 interfaces detected</div>
                <div className="text-green-600">✓ 156 types analyzed</div>
                <div className="text-green-600">✓ 78 modules scanned</div>
                <div className="text-green-600">✓ 320 dependencies mapped</div>
                <div className="text-orange-500 animate-pulse">⟳ Building docs...</div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="h-2 bg-orange-200 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#ff4d1a] w-[75%] rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500">75% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Complete API & Technical Documentation ",
    description: "Auto-generated technical docs with architecture overview, component hierarchy, API references, endpoints, and interactive examples.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center p-4 rounded-2xl">
        <div className="relative w-full h-full bg-gray-100 rounded-2xl overflow-hidden -translate-y-3 ">
          <div className="absolute top-0 left-0 right-0 bottom-[35%] p-4">
            <div className="relative w-full rounded-2xl overflow-hidden h-[120%] bg-white p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Technical Documentation Side */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <FileText className="w-4 h-4 text-[#ff4d1a]" />
                    <h3 className="font-semibold text-gray-900 text-sm">Technical Docs</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d1a] mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Architecture Overview</p>
                        <p className="text-gray-500 text-[10px]">System design structure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d1a] mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Component Hierarchy</p>
                        <p className="text-gray-500 text-[10px]">Visual relationships</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d1a] mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Type Definitions</p>
                        <p className="text-gray-500 text-[10px]">Complete type system</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d1a] mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Module Dependencies</p>
                        <p className="text-gray-500 text-[10px]">Import/export mapping</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d1a] mt-1"></div>
                      <div>
                        <p className="font-medium text-gray-900">Code Examples</p>
                        <p className="text-gray-500 text-[10px]">Usage & snippets</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Documentation Side */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Code2 className="w-4 h-4 text-[#ff4d1a]" />
                    <h3 className="font-semibold text-gray-900 text-sm">API Docs</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-mono">GET</span>
                      <span className="text-[10px] text-gray-500">200 OK</span>
                    </div>
                    <div className="font-mono text-xs text-gray-900">/api/users/:id</div>
                    <div className="space-y-1 text-[10px]">
                      <div className="flex gap-2">
                        <span className="text-gray-500">Params:</span>
                        <span className="font-mono text-[#ff4d1a]">id: string</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Auth:</span>
                        <span className="font-mono text-purple-600">Bearer</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Returns:</span>
                        <span className="font-mono text-blue-600">User</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 font-mono text-[9px] text-gray-700">
                      {`{\n  "id": "123",\n  "name": "John",\n  "email": "j@x.com"\n}`}
                    </div>
                    <div className="text-[10px] text-gray-500 pt-1">+ 47 more endpoints</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Multi-Language Support",
    description: "Supports multiple programming languages including JavaScript, TypeScript, Python, Java, Rust, Go, and more.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-50">
        <div className="relative w-full h-full  rounded-2xl overflow-hidden -translate-y-20">
          <Animated />
        </div>
      </div>
    ),
  },
  {
    name: "Seamless Integration",
    description: "Easy integration with your development workflow and popular platforms.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 p-4 bg-gray-100">
        <div className="relative w-[380px] h-[320px]  bg-gray-100 rounded-2xl overflow-hidden">
          <Image 
            src="/integeration.png" 
            alt="Language Support"
            fill
            className="object-cover"
          />
        </div>


      </div>
    ),
  },
];

export function DocyBentoGrid() {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default function DocyFeaturesGrid() {
  return (
    <div className="min-h-[200vh] bg-white py-30 px-4">
      <div className="max-w-7xl mx-auto">
      
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-gray-600 border border-[#ff4d1a] rounded-full px-4 py-1 shadow-sm">
              FEATURES
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform code into <br />
            <span className="text-black">professional documentation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Docy helps you automatically generate comprehensive documentation from your codebase. 
            Upload your code and get instant technical docs, API references, and architecture overviews powered by AST analysis.
          </p>
        </div>
        <DocyBentoGrid />
      </div>
    </div>
  );
}