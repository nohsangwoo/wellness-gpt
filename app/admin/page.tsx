import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - WellnessGPT",
  description: "Admin dashboard for WellnessGPT",
}

export default function AdminPage() {
  return <AdminDashboard />
}
