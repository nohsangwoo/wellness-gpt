"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuggestionButtonProps {
  text: string
  onClick: () => void
}

export function SuggestionButton({ text, onClick }: SuggestionButtonProps) {
  return (
    <Button
      variant="outline"
      className="justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200 w-full max-w-md"
      onClick={onClick}
    >
      <MessageSquare className="mr-2 h-4 w-4 text-gray-400" />
      {text}
    </Button>
  )
}
