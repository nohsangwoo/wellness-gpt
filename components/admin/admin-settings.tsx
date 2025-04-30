"use client"

import { useState } from "react"
import { Save, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AdminSettings() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">General Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <Input id="site-name" defaultValue="WellnessGPT" className="max-w-md" />
          </div>
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <Input id="admin-email" type="email" defaultValue="admin@wellnessgpt.com" className="max-w-md" />
          </div>
          <div>
            <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-1">
              Support Email
            </label>
            <Input id="support-email" type="email" defaultValue="support@wellnessgpt.com" className="max-w-md" />
          </div>
          <div>
            <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700 mb-1">
              Session Timeout (minutes)
            </label>
            <Input id="session-timeout" type="number" defaultValue="30" className="max-w-md" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Notification Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center">
            <input
              id="email-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
              Email notifications for new session requests
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="user-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="user-notifications" className="ml-2 block text-sm text-gray-700">
              Email notifications for new user registrations
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="booking-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="booking-notifications" className="ml-2 block text-sm text-gray-700">
              Email notifications for new bookings
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="daily-summary"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="daily-summary" className="ml-2 block text-sm text-gray-700">
              Daily summary email
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">API Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="flex max-w-md">
              <Input
                id="api-key"
                type="password"
                defaultValue="sk_test_wellnessgpt_api_key_12345"
                className="rounded-r-none"
                readOnly
              />
              <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600 hover:bg-gray-200">
                Copy
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-1">
              Webhook URL
            </label>
            <Input id="webhook-url" defaultValue="https://api.wellnessgpt.com/webhooks/incoming" className="max-w-md" />
          </div>
          <div className="pt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center">
              <RefreshCw size={16} className="mr-2" />
              Regenerate API Key
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <RefreshCw size={18} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  )
}
