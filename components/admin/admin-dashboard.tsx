"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Calendar, Search, BarChart3, Settings, LogOut, Home, Menu, X } from "lucide-react"
import { CrowdSessionRequests } from "@/components/admin/crowd-session-requests"
import { UserSearchHistory } from "@/components/admin/user-search-history"
import { UserManagement } from "@/components/admin/user-management"
import { AdminOverview } from "@/components/admin/admin-overview"
import { AdminSettings } from "@/components/admin/admin-settings"

type AdminTab = "overview" | "sessions" | "searches" | "users" | "settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />
      case "sessions":
        return <CrowdSessionRequests />
      case "searches":
        return <UserSearchHistory />
      case "users":
        return <UserManagement />
      case "settings":
        return <AdminSettings />
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed z-50 bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 bg-[#0a1a3a] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-blue-800">
            <h1 className="text-xl font-bold">WellnessGPT Admin</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === "overview" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Dashboard
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === "sessions" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("sessions")}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Crowd Sessions
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === "searches" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("searches")}
            >
              <Search className="mr-3 h-5 w-5" />
              Search History
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === "users" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-3 h-5 w-5" />
              User Management
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === "settings" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
          </nav>

          <div className="p-4 border-t border-blue-800">
            <Link href="/" className="flex items-center w-full px-4 py-2 rounded-md hover:bg-blue-800">
              <Home className="mr-3 h-5 w-5" />
              Back to Site
            </Link>
            <button className="flex items-center w-full px-4 py-2 mt-2 rounded-md hover:bg-blue-800">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "sessions" && "Crowd Session Requests"}
              {activeTab === "searches" && "User Search History"}
              {activeTab === "users" && "User Management"}
              {activeTab === "settings" && "Admin Settings"}
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">{renderTabContent()}</main>
      </div>
    </div>
  )
}
