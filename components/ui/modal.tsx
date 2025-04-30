"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const modalVariants = cva("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", {
  variants: {
    position: {
      default: "items-center justify-center",
      top: "items-start justify-center pt-16",
      bottom: "items-end justify-center pb-16",
    },
  },
  defaultVariants: {
    position: "default",
  },
})

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
}

export function Modal({ className, position, isOpen, onClose, title, description, children, ...props }: ModalProps) {
  // Close modal when pressing Escape key
  React.useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose, isOpen])

  if (!isOpen) return null

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={cn(modalVariants({ position }), className)} onClick={handleBackdropClick} {...props}>
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg animate-in fade-in zoom-in duration-300">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        {description && <p className="text-gray-500 mb-4">{description}</p>}

        {children}
      </div>
    </div>
  )
}
