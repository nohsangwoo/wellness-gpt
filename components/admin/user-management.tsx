"use client"

import { useState } from "react"
import { Search, Filter, User, Mail, Phone, MapPin, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for user management
const mockUsers = [
  {
    id: "U123",
    name: "Kim Min-ji",
    email: "minji@example.com",
    phone: "+82 10-1234-5678",
    location: "Seoul, South Korea",
    joinDate: "2023-06-15T10:23:45",
    lastActive: "2023-08-01T08:23:45",
    status: "active",
    searches: 12,
    bookings: 3,
  },
  {
    id: "U456",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 212-555-1234",
    location: "New York, USA",
    joinDate: "2023-05-22T14:12:33",
    lastActive: "2023-07-30T14:12:33",
    status: "active",
    searches: 8,
    bookings: 2,
  },
  {
    id: "U789",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+44 20-1234-5678",
    location: "London, UK",
    joinDate: "2023-07-10T19:45:12",
    lastActive: "2023-07-29T19:45:12",
    status: "active",
    searches: 5,
    bookings: 1,
  },
  {
    id: "U234",
    name: "Park Ji-sung",
    email: "jisung@example.com",
    phone: "+82 10-9876-5432",
    location: "Seoul, South Korea",
    joinDate: "2023-04-05T10:33:21",
    lastActive: "2023-07-28T10:33:21",
    status: "inactive",
    searches: 20,
    bookings: 0,
  },
  {
    id: "U567",
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+81 3-1234-5678",
    location: "Tokyo, Japan",
    joinDate: "2023-07-20T12:50:18",
    lastActive: "2023-07-26T12:50:18",
    status: "active",
    searches: 3,
    bookings: 2,
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("lastActive")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredUsers = mockUsers
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter ? user.status === statusFilter : true

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortField === "lastActive" || sortField === "joinDate") {
        return sortDirection === "asc"
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime()
      } else if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "searches" || sortField === "bookings") {
        return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>
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
              placeholder="Search by name, email, or ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  User
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("lastActive")}
              >
                <div className="flex items-center">
                  Last Active
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("searches")}
              >
                <div className="flex items-center">
                  Searches
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("bookings")}
              >
                <div className="flex items-center">
                  Bookings
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 ${selectedUser === user.id ? "bg-blue-50" : ""}`}
                  onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail size={14} className="mr-1 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone size={14} className="mr-1 text-gray-400" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.lastActive)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(user.status)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.searches}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.bookings}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="p-1 rounded-full hover:bg-gray-200">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="p-4 border-t bg-blue-50">
          <h3 className="font-medium text-blue-800 mb-2">User Details</h3>
          {(() => {
            const user = mockUsers.find((u) => u.id === selectedUser)
            if (!user) return null

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      {user.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      {user.location}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-medium">Join date:</span> {formatDate(user.joinDate)}
                    </div>
                    <div>
                      <span className="font-medium">Last active:</span> {formatDate(user.lastActive)}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {getStatusBadge(user.status)}
                    </div>
                    <div>
                      <span className="font-medium">Total searches:</span> {user.searches}
                    </div>
                    <div>
                      <span className="font-medium">Total bookings:</span> {user.bookings}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                      View Activity
                    </button>
                    {user.status === "active" ? (
                      <button className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center">
                        Deactivate
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
