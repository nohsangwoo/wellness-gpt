"use client"

import { useState } from "react"
import { Check, X, AlertCircle, Calendar, Clock, MapPin, Users, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for crowd session requests
const mockSessionRequests = [
  {
    id: "CS001",
    title: "Seoul Sunrise Runners Group",
    date: "August 7, 2023",
    time: "5:30 AM",
    location: "Gangnam Station Exit 11",
    participants: {
      required: 5,
      confirmed: 3,
    },
    status: "pending",
    requestedBy: "Kim Min-ji",
    requestDate: "July 25, 2023",
  },
  {
    id: "CS002",
    title: "Outdoor Yoga Session at Yeouido Park",
    date: "July 21, 2023",
    time: "8:00 AM",
    location: "Yeouido Park, near the main entrance",
    participants: {
      required: 8,
      confirmed: 5,
    },
    status: "confirmed",
    requestedBy: "John Smith",
    requestDate: "July 10, 2023",
  },
  {
    id: "CS003",
    title: "Traditional Korean Spa & Tea Ceremony",
    date: "September 17, 2023",
    time: "2:00 PM",
    location: "Meeting at Myeongdong Station Exit 4",
    participants: {
      required: 6,
      confirmed: 4,
    },
    status: "pending",
    requestedBy: "Sarah Johnson",
    requestDate: "August 5, 2023",
  },
  {
    id: "CS004",
    title: "Bukhansan Trekking Group",
    date: "August 15, 2023",
    time: "7:00 AM",
    location: "Gupabal Station Exit 1",
    participants: {
      required: 4,
      confirmed: 4,
    },
    status: "confirmed",
    requestedBy: "Park Ji-sung",
    requestDate: "July 30, 2023",
  },
  {
    id: "CS005",
    title: "Healthy Cooking Class: Korean Temple Food",
    date: "August 20, 2023",
    time: "11:00 AM",
    location: "Insadong Cultural Center",
    participants: {
      required: 8,
      confirmed: 3,
    },
    status: "cancelled",
    requestedBy: "Emma Wilson",
    requestDate: "July 28, 2023",
  },
]

export function CrowdSessionRequests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const filteredSessions = mockSessionRequests.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? session.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by title, requester, or ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border rounded-md p-2 text-sm"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <tr
                  key={session.id}
                  className={`hover:bg-gray-50 ${selectedSession === session.id ? "bg-blue-50" : ""}`}
                  onClick={() => setSelectedSession(session.id === selectedSession ? null : session.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{session.title}</div>
                    <div className="text-xs text-gray-400">Requested by: {session.requestedBy}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {session.date}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {session.time}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-gray-400" />
                      {session.participants.confirmed}/{session.participants.required} confirmed
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(session.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {session.status === "pending" && (
                        <>
                          <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                            <Check size={16} />
                          </button>
                          <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                        <AlertCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No session requests found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedSession && (
        <div className="p-4 border-t bg-blue-50">
          <h3 className="font-medium text-blue-800 mb-2">Session Details</h3>
          {(() => {
            const session = mockSessionRequests.find((s) => s.id === selectedSession)
            if (!session) return null

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      {session.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-500" />
                      {session.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      {session.location}
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-gray-500" />
                      {session.participants.confirmed} confirmed of {session.participants.required} required
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-medium">Requested by:</span> {session.requestedBy}
                    </div>
                    <div>
                      <span className="font-medium">Request date:</span> {session.requestDate}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {getStatusBadge(session.status)}
                    </div>
                  </div>

                  {session.status === "pending" && (
                    <div className="mt-4 flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                        <Check size={16} className="mr-1" /> Approve
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                        <X size={16} className="mr-1" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
