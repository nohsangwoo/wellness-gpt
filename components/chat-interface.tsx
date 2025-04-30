"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SuggestionButton } from "@/components/suggestion-button"
import { useRouter } from "next/navigation"

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const suggestions = [
    "Find a running route in Seoul",
    "Suggest an outdoor yoga class",
    "Where can I have a spa day?",
    "Recommend a medical clinic",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Store the query in sessionStorage to use in the chat page
    sessionStorage.setItem("wellnessQuery", inputValue)

    // Navigate to the chat page
    router.push("/chat")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)

    // Store the suggestion in sessionStorage
    sessionStorage.setItem("wellnessQuery", suggestion)

    // Navigate to the chat page
    router.push("/chat")
  }

  return (
    <section className="py-12 bg-white w-full max-w-3xl mx-auto">
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 justify-center">
            <Input
              className="flex-1 bg-white border-gray-200 h-12 text-base"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" size="icon" className="h-12 w-12 bg-blue-500 hover:bg-blue-600">
              <Send className="h-5 w-5 text-white" />
            </Button>
          </form>
          <div className="mt-6 flex flex-col gap-2 items-center">
            {suggestions.map((suggestion, index) => (
              <SuggestionButton key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
