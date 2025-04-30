import type { Metadata } from "next"
import Link from "next/link"
import { Settings } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"
import { Features } from "@/components/features"
import { WellnessHero } from "@/components/wellness-hero"

export const metadata: Metadata = {
  title: "WellnessGPT - Your AI chatbot for curated wellness recommendations",
  description:
    "WellnessGPT provides personalized wellness recommendations for travelers in Seoul based on curated experiences, real-time data, and your specific needs.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="w-full border-b p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#0a1a3a] hover:text-blue-600 transition-colors">
          WellnessGPT
        </Link>
        <Link
          href="/admin"
          className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
        >
          <Settings size={16} className="mr-1.5" />
          Admin
        </Link>
      </header>

      <div className="w-full max-w-5xl mx-auto px-4">
        <WellnessHero />
        <ChatInterface />
        <Features />
      </div>
    </main>
  )
}
