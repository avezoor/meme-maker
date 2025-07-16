import { MemeMaker } from "@/components/meme-maker"

export default function HomePage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        background: `
          linear-gradient(to right, #e0e0e0 1px, transparent 1px),
          linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <MemeMaker />
      <footer className="mt-12 text-gray-600 dark:text-gray-400 text-sm"></footer>
    </div>
  )
}
