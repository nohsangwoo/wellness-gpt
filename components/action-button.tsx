"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { CheckCircle, Calendar, Clock, MapPin, Users } from "lucide-react"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  actionType: "join" | "view" | "book" | "claim"
  eventDetails?: {
    title: string
    date?: string
    time?: string
    location?: string
    participants?: string
    price?: string
  }
}

export function ActionButton({ children, className, actionType, eventDetails }: ActionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleAction = () => {
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
    // In a real app, this would send data to the server
    setTimeout(() => {
      setIsModalOpen(false)
    }, 1500)
  }

  const getModalContent = () => {
    if (isConfirmed) {
      return (
        <div className="flex flex-col items-center justify-center py-4">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-medium text-center">Success!</h3>
          <p className="text-center mt-2">
            {actionType === "join" && "You've successfully joined the group!"}
            {actionType === "view" && "Details have been sent to your email!"}
            {actionType === "book" && "Your booking has been confirmed!"}
            {actionType === "claim" && "Your discount has been applied!"}
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {eventDetails && (
          <div className="space-y-3 mb-4">
            <h3 className="text-lg font-medium">{eventDetails.title}</h3>

            {eventDetails.date && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{eventDetails.date}</span>
              </div>
            )}

            {eventDetails.time && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{eventDetails.time}</span>
              </div>
            )}

            {eventDetails.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{eventDetails.location}</span>
              </div>
            )}

            {eventDetails.participants && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{eventDetails.participants}</span>
              </div>
            )}

            {eventDetails.price && (
              <div className="mt-2">
                <span className="font-medium">Price: </span>
                <span>{eventDetails.price}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button onClick={handleConfirm} className="w-full bg-blue-600 hover:bg-blue-700">
            {actionType === "join" && "Confirm Join"}
            {actionType === "view" && "Send Details to Email"}
            {actionType === "book" && "Confirm Booking"}
            {actionType === "claim" && "Apply Discount"}
          </Button>
          <Button variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button className={className} onClick={handleAction}>
        {children}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setIsConfirmed(false)
        }}
        title={
          !isConfirmed
            ? actionType === "join"
              ? "Join Group"
              : actionType === "view"
                ? "View Details"
                : actionType === "book"
                  ? "Confirm Booking"
                  : "Claim Discount"
            : null
        }
      >
        {getModalContent()}
      </Modal>
    </>
  )
}
