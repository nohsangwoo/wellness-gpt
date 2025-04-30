import type { Metadata } from "next"
import { ChatFullInterface } from "@/components/chat-full-interface"

export const metadata: Metadata = {
  title: "Chat with WellnessGPT",
  description: "Get personalized wellness recommendations for your trip to Seoul",
}

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <ChatFullInterface />
    </main>
  )
}
