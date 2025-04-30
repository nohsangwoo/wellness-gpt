"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/chat-message"
import { Card } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, ClockIcon, CloudSunIcon, CarIcon, StarIcon, UsersIcon } from "lucide-react"
import { ActionButton } from "@/components/action-button"

type Message = {
  role: "user" | "assistant"
  content: string | React.ReactNode
}

// Yoga scenario data
const yogaScenario = {
  steps: [
    {
      user: "Suggest an outdoor yoga class",
      assistant:
        "Great! Seoul offers several wonderful outdoor yoga options. To recommend the best option, could you tell me:\n- When will you be visiting?\n- Which area will you be staying?\n- Morning or evening session preferred?",
    },
    {
      user: "I'll be in Seoul from July 20 to July 25. Staying in Hongdae. Morning session preferred.",
      assistant: (
        <div className="space-y-4">
          <p>Thanks for sharing!</p>
          <div className="flex items-center space-x-2">
            <CloudSunIcon className="h-5 w-5 text-blue-500" />
            <span>Weather forecast for July 20: Clear skies, 24–29°C.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CarIcon className="h-5 w-5 text-green-500" />
            <span>Traffic: No congestion expected around Han River parks in the morning.</span>
          </div>

          <p className="font-medium mt-4">
            Here are the top outdoor yoga options based on OTA and SNS reviews from our Seoul Wellness Top100:
          </p>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-blue-700">Han River Morning Yoga at Mangwon Park</h4>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">5.0/5 from 130+ reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>8:30 AM start</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>10-minute taxi ride from Hongdae</span>
                </div>
              </div>

              <p className="text-sm">English-speaking instructors</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sample Review on Klook</p>
                <p className="text-sm italic">"Relaxing riverside session! Great vibe, beginner-friendly."</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <h4 className="font-bold text-blue-700">Seoul Forest Morning Yoga Program</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>9:00 AM start</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>20-minute taxi ride</span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">SNS Review on Xiaohongshu</p>
                <p className="text-sm italic">"Quiet, green, perfect for morning yoga photos!"</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "Are there any special sessions?",
      assistant: (
        <div className="space-y-4">
          <p>Yes!</p>
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-blue-600" />
                <h4 className="font-bold text-blue-700">Crowd-powered Outdoor Yoga Session at Yeouido Park</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  <span>July 21 (Sunday)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-600" />
                  <span>8:00 AM</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <UsersIcon className="h-4 w-4 text-gray-600" />
                <span>Minimum 8 participants needed (currently 5 confirmed)</span>
              </div>

              <p className="text-sm">Payment requested only after confirmation</p>

              <ActionButton
                actionType="view"
                className="bg-blue-600 hover:bg-blue-700 w-full"
                eventDetails={{
                  title: "Outdoor Yoga Session at Yeouido Park",
                  date: "July 21 (Sunday)",
                  time: "8:00 AM",
                  location: "Yeouido Park, near the main entrance",
                  participants: "Minimum 8 participants needed (currently 5 confirmed)",
                  price: "₩25,000 per person (payment after confirmation)",
                }}
              >
                View Crowd Session Details
              </ActionButton>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "What if it rains on July 21?",
      assistant:
        "If rain is forecasted, we'll notify all participants by email, and the session will be canceled automatically without any payment charged. We can also recommend indoor yoga options nearby as a backup if you'd like!",
    },
    {
      user: "Can I book more than one session?",
      assistant:
        "Of course! I can suggest a customized 2–3 day wellness itinerary, combining yoga sessions, spa visits, and healthy brunch spots near Hongdae, based on your preferred pace and schedule.",
    },
  ],
}

// Running scenario data
const runningScenario = {
  steps: [
    {
      user: "Find a running route in Seoul",
      assistant:
        "Seoul has beautiful running routes! The Han River Park is particularly popular. When will you be visiting, and where are you staying? I can recommend routes based on your location and the weather forecast.",
    },
    {
      user: "I'll be in Seoul from August 5 to August 10. Staying in Gangnam. Early morning runs, around 5-10km.",
      assistant: (
        <div className="space-y-4">
          <p>Thanks for sharing!</p>
          <div className="flex items-center space-x-2">
            <CloudSunIcon className="h-5 w-5 text-blue-500" />
            <span>Weather forecast: Partly cloudy, 22–27°C, low humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <CarIcon className="h-5 w-5 text-green-500" />
            <span>Traffic: Light traffic in early mornings, bike lanes clear</span>
          </div>

          <p className="font-medium mt-4">
            Here are the top running routes based on OTA and SNS reviews from our Seoul Wellness Top100:
          </p>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-blue-700">Gangnam to Jamwon Han River Route</h4>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">4.8/5 from 240+ runners</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>Best before 8:00 AM</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>6.5km loop</span>
                </div>
              </div>

              <p className="text-sm">Flat, paved paths with river views</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sample Review on Strava</p>
                <p className="text-sm italic">"Perfect morning route with beautiful sunrise views over the river!"</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <h4 className="font-bold text-blue-700">Bongeunsa Temple Loop</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>Any time before 9:00 AM</span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>4.2km</span>
                </div>
              </div>

              <p className="text-sm">Some gentle hills, mix of urban and temple grounds</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sample Review on AllTrails</p>
                <p className="text-sm italic">"Unique route combining urban running with peaceful temple grounds"</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "Are there any running groups I can join?",
      assistant: (
        <div className="space-y-4">
          <p>Yes!</p>
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-blue-600" />
                <h4 className="font-bold text-blue-700">Seoul Sunrise Runners Group</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  <span>August 7 (Wednesday)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-600" />
                  <span>5:30 AM</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <UsersIcon className="h-4 w-4 text-gray-600" />
                <span>Minimum 5 participants needed (currently 3 confirmed)</span>
              </div>

              <p className="text-sm">Free event, just show up at the meeting point</p>

              <ActionButton
                actionType="join"
                className="bg-blue-600 hover:bg-blue-700 w-full"
                eventDetails={{
                  title: "Seoul Sunrise Runners Group",
                  date: "August 7 (Wednesday)",
                  time: "5:30 AM",
                  location: "Gangnam Station Exit 11",
                  participants: "Minimum 5 participants needed (currently 3 confirmed)",
                  price: "Free event",
                }}
              >
                Join Running Group
              </ActionButton>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "What if it rains during my stay?",
      assistant:
        "If it rains, we recommend the COEX Mall indoor walking course (2.5km loop) or the Premium Fitness Club in Gangnam which offers day passes for treadmill access with Han River views.",
    },
    {
      user: "Can you suggest a running schedule for my entire stay?",
      assistant:
        "I can create a running schedule for your entire stay, alternating between different routes and including a recovery day with a sports massage at one of Gangnam's top-rated wellness centers.",
    },
  ],
}

// Spa scenario data
const spaScenario = {
  steps: [
    {
      user: "Where can I have a spa day?",
      assistant:
        "Seoul is famous for its spa experiences! From traditional Korean jjimjilbangs to luxury hotel spas. Could you tell me your preferred location and budget range so I can recommend the best options?",
    },
    {
      user: "I'll be in Seoul from September 15 to September 20. Staying in Myeongdong. Mid-range budget, authentic Korean spa experience.",
      assistant: (
        <div className="space-y-4">
          <p>Thanks for sharing!</p>
          <div className="flex items-center space-x-2">
            <CloudSunIcon className="h-5 w-5 text-blue-500" />
            <span>Weather forecast: Rainy season, 18–23°C, high humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <CarIcon className="h-5 w-5 text-yellow-500" />
            <span>Traffic: Moderate traffic due to rain, subway recommended</span>
          </div>

          <p className="font-medium mt-4">
            Here are the top spa options based on OTA and SNS reviews from our Seoul Wellness Top100:
          </p>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-blue-700">Dragon Hill Spa & Resort</h4>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">4.5/5 from 890+ reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>15-minute subway ride from Myeongdong</span>
                </div>

                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>₩12,000 for full-day access</span>
                </div>
              </div>

              <p className="text-sm">Traditional jjimjilbang, multiple saunas, body scrub services</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sample Review on TripAdvisor</p>
                <p className="text-sm italic">
                  "Authentic Korean spa experience with excellent facilities and reasonable prices"
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <h4 className="font-bold text-blue-700">Spa Lei in Lotte Hotel</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span>5-minute walk from Myeongdong</span>
                </div>

                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span>₩150,000 for signature treatment</span>
                </div>
              </div>

              <p className="text-sm">Luxury spa, traditional Korean herbal treatments</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sample Review on Booking.com</p>
                <p className="text-sm italic">
                  "Perfect balance of Korean traditions with modern luxury spa amenities"
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "Are there any special spa experiences?",
      assistant: (
        <div className="space-y-4">
          <p>Yes!</p>
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-blue-600" />
                <h4 className="font-bold text-blue-700">Traditional Korean Spa & Tea Ceremony Experience</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  <span>September 17 (Tuesday)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4 text-gray-600" />
                  <span>2:00 PM</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <UsersIcon className="h-4 w-4 text-gray-600" />
                <span>Minimum 6 participants needed (currently 4 confirmed)</span>
              </div>

              <p className="text-sm">₩80,000 per person, includes transportation and tea ceremony</p>

              <ActionButton
                actionType="book"
                className="bg-blue-600 hover:bg-blue-700 w-full"
                eventDetails={{
                  title: "Traditional Korean Spa & Tea Ceremony Experience",
                  date: "September 17 (Tuesday)",
                  time: "2:00 PM",
                  location: "Meeting at Myeongdong Station Exit 4",
                  participants: "Minimum 6 participants needed (currently 4 confirmed)",
                  price: "₩80,000 per person",
                }}
              >
                Book Spa Experience
              </ActionButton>
            </div>
          </Card>

          <Card className="p-4 border-green-200 bg-green-50">
            <div className="space-y-2">
              <h4 className="font-bold text-green-700">Special WellnessGPT Offer</h4>
              <p>
                We've arranged a special 20% discount for WellnessGPT users at Spa Lei if you book through our platform
                for your dates!
              </p>
              <ActionButton
                actionType="claim"
                className="bg-green-600 hover:bg-green-700 w-full mt-2"
                eventDetails={{
                  title: "20% Discount at Spa Lei",
                  date: "Valid September 15-20, 2023",
                  location: "Spa Lei in Lotte Hotel, Myeongdong",
                  price: "Original: ₩150,000 → Discounted: ₩120,000",
                }}
              >
                Claim Discount
              </ActionButton>
            </div>
          </Card>
        </div>
      ),
    },
    {
      user: "Should I space out my spa visits?",
      assistant:
        "I'd recommend spacing out your spa visits - perhaps one traditional jjimjilbang experience and one luxury treatment. I can also suggest complementary wellness activities like a tea ceremony or meditation session at Jogyesa Temple between spa days.",
    },
    {
      user: "Can you create a wellness itinerary for my entire stay?",
      assistant:
        "Here's a suggested wellness itinerary for your stay in Seoul:\n\nDay 1: Morning arrival, afternoon visit to Dragon Hill Spa to recover from travel fatigue\nDay 2: Morning meditation at Jogyesa Temple, afternoon tea ceremony\nDay 3: Full day at a traditional Korean spa with body scrub treatment\nDay 4: Morning yoga session, afternoon free time\nDay 5: Luxury treatment at Spa Lei with our special discount\n\nWould you like me to book any of these experiences for you?",
    },
  ],
}

// Array of all scenarios
const scenarios = [yogaScenario, runningScenario, spaScenario]

export function ChatFullInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm WellnessGPT, your AI assistant for wellness recommendations in Seoul. How can I help you today?",
    },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState<any>(null)
  const [nextMessage, setNextMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize on component mount
  useEffect(() => {
    // Try to get the query from sessionStorage
    const query = typeof window !== "undefined" ? sessionStorage.getItem("wellnessQuery") : null

    if (query) {
      // Determine which scenario to use based on the query
      let scenario
      if (query.toLowerCase().includes("yoga")) {
        scenario = yogaScenario
      } else if (query.toLowerCase().includes("run") || query.toLowerCase().includes("running")) {
        scenario = runningScenario
      } else if (query.toLowerCase().includes("spa")) {
        scenario = spaScenario
      } else {
        // Default to a random scenario if query doesn't match
        scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      }

      setSelectedScenario(scenario)
      setNextMessage(scenario.steps[0].user)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedScenario || isLoading) return

    setIsLoading(true)

    // Get the current step data
    const stepData = selectedScenario.steps[currentStep]

    // Add user message from the pre-populated input
    const userMessage: Message = {
      role: "user",
      content: stepData.user,
    }
    setMessages((prev) => [...prev, userMessage])

    // Add assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: stepData.assistant,
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Move to next step
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)

      // Set up next message if available
      if (nextStep < selectedScenario.steps.length) {
        setNextMessage(selectedScenario.steps[nextStep].user)
      } else {
        setNextMessage("Thank you for the recommendations!")
      }

      setIsLoading(false)
    }, 1500) // Slightly longer delay to make the loading state more noticeable
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-center text-[#0a1a3a] hover:text-blue-600 transition-colors block"
        >
          WellnessGPT
        </Link>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 justify-center max-w-2xl mx-auto">
          <Input className="flex-1" value={nextMessage} readOnly onChange={() => {}} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[80px]"
            disabled={!selectedScenario || currentStep >= selectedScenario.steps.length || isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
        {selectedScenario && currentStep >= selectedScenario.steps.length && (
          <p className="text-center text-sm text-gray-500 mt-2">Demo conversation complete! Refresh to start over.</p>
        )}
      </div>
    </div>
  )
}
