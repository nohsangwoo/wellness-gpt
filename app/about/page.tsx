import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About WellnessGPT",
  description: "Learn about our curated wellness recommendation service for travelers in Seoul",
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-8 text-[#0a1a3a]">About WellnessGPT</h1>

        <div className="prose max-w-none mx-auto">
          <h2>Our Mission</h2>
          <p>
            WellnessGPT is an AI-powered service that provides curated wellness recommendations for travelers in Seoul.
            We combine data from OTA reviews, social media, and real-time information to offer personalized suggestions
            for wellness activities.
          </p>

          <h2>Why WellnessGPT?</h2>
          <p>
            Travelers are increasingly seeking wellness experiences beyond traditional tourism. However, finding
            reliable, personalized recommendations can be challenging. WellnessGPT solves this by:
          </p>

          <ul>
            <li>Curating the top 5-10% of wellness experiences based on reviews</li>
            <li>Considering your schedule, accommodation, and preferences</li>
            <li>Incorporating real-time weather and traffic data</li>
            <li>Offering crowd sessions for unique wellness experiences</li>
          </ul>

          <h2>Our Categories</h2>
          <p>We currently focus on the following wellness categories in Seoul:</p>

          <ul>
            <li>Running routes</li>
            <li>Yoga classes</li>
            <li>Trekking experiences</li>
            <li>Spa treatments</li>
            <li>Healthy restaurants and cafes</li>
            <li>Medical facilities (certified by Korea Tourism Organization)</li>
          </ul>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button className="bg-blue-500 hover:bg-blue-600">Try WellnessGPT Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
