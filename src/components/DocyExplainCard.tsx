import Image from "next/image";
import { Sparkles, Hash } from "lucide-react";
import AnimatedSequenceDiagram from "./AnimatedSequenceDiagram";

export function DocyExplainCard({
  title = "Docy understands your code structure",
  description = "Docy analyzes your source code using AST parsing and AI models to generate accurate, structured, and maintainable documentation.",
  features = [
    {
      title: "AST-Based Analysis",
      description: "Understands functions, classes, and dependencies precisely.",
    },
    {
      title: "AI-Powered Documentation",
      description: "Generates clean docs aligned with your codebase.",
    },
  ],
  highlights = [
    { label: "functions" },
    { label: "types" },
    { label: "APIs" },
  ],
  previewTitle = "Generated Documentation Preview",
  previewText,
}: {
  title?: string;
  description?: string;
  features?: { title: string; description: string }[];
  highlights?: { label: string }[];
  previewTitle?: string;
  previewText?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl rounded-3xl border bg-[#f7f7f7] px-10 py-14 shadow-sm my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT */}
        <div>
          <h2 className="text-5xl font-semibold leading-tight text-gray-900 max-w-xl">
            {title}
          </h2>

          <p className="mt-6 text-base text-gray-600 max-w-lg">
            {description}
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white px-5 py-6 max-w-2xl"
              >
                <div className="mb-4 bg-gray-100 w-fit p-2 rounded-lg">
                  {i === 0 ? (
                    <Sparkles className="w-6 h-6 text-[#fa5028]" />
                  ) : (
                    <Hash className="w-6 h-6 text-[#fa5028]" />
                  )}
                </div>
                <h4 className="text-md font-medium text-gray-900">
                  {f.title}
                </h4>
                <p className="mt-1 text-md text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl px-6 py-5 min-h-[400px]">
          <h4 className="mb-4 text-md font-medium text-gray-500">
            {previewTitle}
          </h4>



          <div className="mt-8 rounded-2xl bg-white p-2">
          <AnimatedSequenceDiagram />
            {/* <Image
              src="/doc.png"
              alt="Logo"
              width={500}
              height={500}
              className="mx-auto"
            /> */}

          </div>
        </div>
      </div>
    </div>
  );
}