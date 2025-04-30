import type React from "react"
import { cn } from "@/lib/utils"

type MessageProps = {
  message: {
    role: "user" | "assistant"
    content: string | React.ReactNode
  }
}

export function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800",
        )}
      >
        {typeof message.content === "string" ? (
          <p className="whitespace-pre-line">{message.content}</p>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}
