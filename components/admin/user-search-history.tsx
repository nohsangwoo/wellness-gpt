"use client"

import { useState } from "react"
import { Search, Calendar, Clock, Filter, User, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for user search history
const mockSearchHistory = [
  {
    id: "SH001",
    query: "Find a running route in Seoul",
    user: {
      id: "U123",
      name: "Kim Min-ji",
      email: "minji@example.com",
    },
    timestamp: "2023-08-01T08:23:45",
    location: "Seoul, South Korea",
    device: "Mobile - iOS",
    resultCount: 5,
  },
  {
    id: "SH002",
    query: "Suggest an outdoor yoga class",
    user: {
      id: "U456",
      name: "John Smith",
      email: "john@example.com",
    },
    timestamp: "2023-07-30T14:12:33",
    location: "New York, USA",
    device: "Desktop - Chrome",
    resultCount: 3,
  },
  {
    id: "SH003",
    query: "Where can I have a spa day?",
    user: {
      id: "U789",
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    timestamp: "2023-07-29T19:45:12",
    location: "London, UK",
    device: "Mobile - Android",
    resultCount: 8,
  },
  {
    id: "SH004",
    query: "Recommend a medical clinic",
    user: {
      id: "U234",
      name: "Park Ji-sung",
      email: "jisung@example.com",
    },
    timestamp: "2023-07-28T10:33:21",
    location: "Seoul, South Korea",
    device: "Tablet - iPadOS",
    resultCount: 4,
  },
  {
    id: "SH005",
    query: "Best hiking trails near Seoul",
    user: {
      id: "U123",
      name: "Kim Min-ji",
      email: "minji@example.com",
    },
    timestamp: "2023-07-27T07:15:40",
    location: "Seoul, South Korea",
    device: "Mobile - iOS",
    resultCount: 6,
  },
  {
    id: "SH006",
    query: "Healthy restaurants in Gangnam",
    user: {
      id: "U567",
      name: "Emma Wilson",
      email: "emma@example.com",
    },
    timestamp: "2023-07-26T12:50:18",
    location: "Tokyo, Japan",
    device: "Desktop - Firefox",
    resultCount: 10,
  },
  {
    id: "SH007",
    query: "Morning yoga in Hongdae",
    user: {
      id: "U456",
      name: "John Smith",
      email: "john@example.com",
    },
    timestamp: "2023-07-25T09:22:05",
    location: "New York, USA",
    device: "Mobile - iOS",
    resultCount: 2,
  },
]

export function UserSearchHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredSearches = mockSearchHistory
    .filter((search) => {
      return (
        search.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortField === "timestamp") {
        return sortDirection === "asc"
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } else if (sortField === "query") {
        return sortDirection === "asc" ? a.query.localeCompare(b.query) : b.query.localeCompare(a.query)
      } else if (sortField === "user") {
        return sortDirection === "asc" ? a.user.name.localeCompare(b.user.name) : b.user.name.localeCompare(a.user.name)
      } else if (sortField === "resultCount") {
        return sortDirection === "asc" ? a.resultCount - b.resultCount : b.resultCount - a.resultCount
      }
      return 0
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by query, user name, or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select className="border rounded-md p-2 text-sm">
              <option value="">All Devices</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("query")}
              >
                <div className="flex items-center">
                  Search Query
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("user")}
              >
                <div className="flex items-center">
                  User
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center">
                  Date & Time
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("resultCount")}
              >
                <div className="flex items-center">
                  Results
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSearches.length > 0 ? (
              filteredSearches.map((search) => (
                <tr key={search.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{search.query}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <div>
                        <div>{search.user.name}</div>
                        <div className="text-xs text-gray-400">{search.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {formatDate(search.timestamp)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {formatTime(search.timestamp)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{search.location}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{search.device}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{search.resultCount} results</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No search history found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredSearches.length} of {mockSearchHistory.length} searches
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 border rounded-md text-sm bg-blue-50 text-blue-600">1</button>
          <button className="px-3 py-1 border rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}
