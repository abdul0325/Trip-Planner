"use client"

import { motion } from "framer-motion"
import { Moon, Sun, Eye, EyeOff, Brain, ArrowRight, Loader2, Home } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useAuthStore } from "@/hooks/useAuthStore"
import { AuthService } from "@/services"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { setIsAuthenticated, setUser, setAccessToken } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    try {
      const data = await AuthService.login({ email, password })
      // Persist token in both localStorage and zustand
      localStorage.setItem("accessToken", data.accessToken)
      setAccessToken(data.accessToken)
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Login failed"
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [0, 80, 0], y: [0, -80, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <motion.div animate={{ x: [0, -80, 0], y: [0, 80, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
      </div>
      {/* Home Button */}

      <Link
        href="/"
        className="
    fixed
    top-6
    left-6
    z-50
  "
      >

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
      flex
      items-center
      gap-2
      px-4
      py-2.5
      rounded-full
      bg-white/80
      dark:bg-gray-800/80
      backdrop-blur-xl
      shadow-md
      border
      border-white/20
      dark:border-white/10
      text-gray-800
      dark:text-white
    "
        >

          <Home className="w-4 h-4" />

          <span className="text-sm font-medium">
            Home
          </span>
        </motion.button>
      </Link>
      {/* Theme toggle */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md">
        {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your TripAI account</p>
          </motion.div>

          {/* Form card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
              </motion.button>
            </form>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 text-center text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Sign up for free
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
