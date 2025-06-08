"use client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>("top")
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const hash = url.split("#")[1]
      setActiveSection(hash || "top")
    }

    // Set initial active section
    handleRouteChange(router.asPath)

    // Listen for hash changes
    router.events.on("hashChangeComplete", handleRouteChange)

    // Cleanup listener on unmount
    return () => {
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router])

  return activeSection
}

export default useActiveSection
