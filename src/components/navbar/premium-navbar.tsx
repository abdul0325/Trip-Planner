"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X, Brain } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useAuthStore } from "@/hooks/useAuthStore"

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Trips", href: "/trips" },
    { label: "AI Planner", href: "/trips/create" },
    { label: "Explore", href: "/destinations" },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "glass-card border-b border-white/10 backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
            >
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>

            <span className="text-lg sm:text-xl font-bold gradient-text whitespace-nowrap">
              TripAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-xl glass-card hover:bg-white/10 transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-white" />
              )}
            </motion.button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">

              {isAuthenticated ? (
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                    px-5
                    py-2
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-purple-600
                    text-white
                    text-sm
                    font-medium
                    hover:shadow-lg
                    hover:shadow-blue-500/25
                    transition-all
                  "
                  >
                    Dashboard
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                      px-5
                      py-2
                      rounded-full
                      glass-card
                      hover:bg-white/10
                      text-sm
                      font-medium
                      text-gray-700
                      dark:text-gray-300
                      transition-all
                    "
                    >
                      Login
                    </motion.button>
                  </Link>

                  <Link href="/auth/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                      px-5
                      py-2
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-600
                      text-white
                      text-sm
                      font-medium
                      hover:shadow-lg
                      hover:shadow-blue-500/25
                      transition-all
                    "
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="lg:hidden p-2 rounded-xl glass-card"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
            lg:hidden
            mt-4
            p-4
            rounded-2xl
            glass-card
            border
            border-white/10
          "
          >
            <div className="flex flex-col gap-4">

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-300
                  hover:text-blue-500
                  transition-colors
                "
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-white/10">

                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="
                    flex
                    items-center
                    justify-center
                    w-full
                    py-3
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-purple-600
                    text-white
                    font-medium
                  "
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">

                    <Link
                      href="/auth/login"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                      flex
                      items-center
                      justify-center
                      w-full
                      py-3
                      rounded-full
                      glass-card
                      text-gray-700
                      dark:text-gray-300
                    "
                    >
                      Login
                    </Link>

                    <Link
                      href="/auth/register"
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                      flex
                      items-center
                      justify-center
                      w-full
                      py-3
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-600
                      text-white
                      font-medium
                    "
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
