import { CheckCircle, Cloud, Scale } from "lucide-react"

export function Features() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 md:py-24 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-gray-100">
            <CheckCircle className="h-10 w-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">Curation based on top-rated OTA / SNS reviews</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            We analyze thousands of reviews to select only the best wellness experiences
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-gray-100">
            <Cloud className="h-10 w-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">Local weather and traffic for your visit dates</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Real-time data ensures your wellness activities are optimized for current conditions
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-gray-100">
            <Scale className="h-10 w-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">Objective analysis of up-to-date data</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Unbiased recommendations based on comprehensive data analysis
          </p>
        </div>
      </div>
    </section>
  )
}
