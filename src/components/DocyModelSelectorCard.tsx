export function DocyModelSelectorCard() {
  return (
    <div className="mx-auto max-w-[1200px] rounded-3xl bg-[#fdf6f1] px-7 py-17">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT */}
        <div className="bg-white rounded-2xl px-5 py-6 shadow-sm">
          <h4 className="mb-5 text-sm font-semibold text-gray-900">
            Documentation Type
          </h4>
          
          {/* Option 1 */}
          <div className="border border-gray-200 rounded-2xl p-5 mb-4 cursor-pointer hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900">Technical Documentation (Architecture & Code Overview)</h5>
                  <span className="text-[#fa5028] text-sm font-medium">Recommended for developers</span>
                </div>

              </div>
            </div>
          </div>

          {/* Option 2 */}
          <div className="border border-gray-200 rounded-2xl p-5 mb-4 cursor-pointer hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900">API Documentation (Endpoints & Integration Guide)</h5>
                  <span className="text-[#fa5028] text-sm font-medium">Recommended for backend teams</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option 3 - Selected */}
          <div className="border-2 border-[#fa5028] bg-[#fff8f6] rounded-2xl p-5 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-[#fa5028] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#fa5028]"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900">Full Documentation Package (Technical + API)</h5>
                  <span className="text-[#fa5028] text-sm font-medium">Complete package</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
        <h2
  className="
    text-3xl       
    sm:text-4xl      
    md:text-5xl       
    font-semibold
    leading-tight
    text-gray-900
    max-w-xl
  "
>            Choose the right documentation for your project
          </h2>

          <p className="mt-6 text-base text-gray-600 max-w-lg">
            Select the documentation type that best fits your team's needs. Docy will generate comprehensive, professional docs based on your selection.
          </p>
        </div>
      </div>
    </div>
  );
}