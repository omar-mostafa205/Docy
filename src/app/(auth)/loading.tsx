// app/sign-in/loading.tsx
export default function Loading() {
    return (
      <div className="min-h-screen bg-[#f2f1ed] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }