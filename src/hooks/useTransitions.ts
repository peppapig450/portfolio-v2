import type { MotionProps } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { useMemo } from "react"

// define the two variant sets once
const defaultVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
} as const

const reducedVariants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: 0, scale: 1 },
} as const

/**
 * A hook that returns { transition, initial, animate, exit }
 * automatically adjusting for prefers-reduced-motion.
 */
export const useTransitions = (delay: number = 0): MotionProps => {
  const shouldReduceMotion = useReducedMotion()

  // memoize the transition object
  const transition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0 : 0.5,
      delay,
    }),
    [delay, shouldReduceMotion],
  )

  // pick the correct variants
  const variants = shouldReduceMotion ? reducedVariants : defaultVariants

  // return in the shape of MotionProps
  return { transition, ...variants }
}
