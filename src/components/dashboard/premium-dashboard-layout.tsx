"use client"

import { motion } from "framer-motion"
import { Brain, Sun, Moon, Plus, LayoutDashboard, Map, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/hooks/useAuthStore"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/trips",     label: "My Trips",  icon: Map },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0,100,0], y: [0,-100,0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-10" />
        <motion.div animate={{ x: [0,-100,0], y: [0,100,0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  TripAI
                </span>
              </Link>

              {/* Nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href || (href === "/trips" && pathname.startsWith("/trips") && pathname !== "/trips/create")
                  return (
                    <Link key={href} href={href}>
                      <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                    </Link>
                  )
                })}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {user?.name && (
                  <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 px-2 border-r border-gray-200 dark:border-gray-700 mr-1">
                    {user.name}
                  </span>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {theme === "dark" ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
                </motion.button>
                <Link href="/trips/create">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-md">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Trip</span>
                  </motion.button>
                </Link>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors" title="Sign out">
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
