import type { Metadata } from "next"
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
      <div className="w-full max-w-5xl mx-auto px-4">
        <WellnessHero />
        <ChatInterface />
        <Features />
      </div>
    </main>
  )
}
