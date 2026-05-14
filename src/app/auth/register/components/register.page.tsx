"use client"

import { motion } from "framer-motion"
import { Moon, Sun, Eye, EyeOff, Brain, ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { AuthService } from "@/services"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const passwordStrength = () => {
    let s = 0
    if (password.length >= 6) s++
    if (password.match(/[A-Z]/)) s++
    if (password.match(/[0-9]/)) s++
    if (password.match(/[^a-zA-Z0-9]/)) s++
    return s
  }

  const strengthColors = ["bg-gray-300","bg-red-500","bg-yellow-500","bg-blue-500","bg-green-500"]
  const strengthLabels = ["","Weak","Fair","Good","Strong"]
  const ps = passwordStrength()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return }
    setIsLoading(true)
    try {
      const data = await AuthService.register({ name, email, password })
      toast.success(data.message || "Account created! Please sign in.")
      router.push("/auth/login")
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Registration failed"
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [0,-80,0], y: [0,80,0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20" />
        <motion.div animate={{ x: [0,80,0], y: [0,-80,0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
      </div>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md">
        {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Create account</h1>
            <p className="text-gray-500 dark:text-gray-400">Start planning smarter trips with AI</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Your full name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white/60 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="At least 6 characters" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(l => (
                        <div key={l} className={`h-1 flex-1 rounded-full transition-colors ${ps >= l ? strengthColors[ps] : "bg-gray-200 dark:bg-gray-700"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{strengthLabels[ps]} password</p>
                  </div>
                )}
              </div>

              <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
              </motion.button>
            </form>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
              Sign in here
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
