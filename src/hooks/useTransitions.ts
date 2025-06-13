/**
 * @deprecated Use the `StaggeredContainer` component for staggered animations.
 * This hook will removed in the next major release.
 */
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
 *
 * @deprecated Use the `StaggeredContainer component instead.
 *             This hook will removed in the next major release.
 */
export const useTransitions = (delay: number = 0): MotionProps => {
  const shouldReduceMotion = useReducedMotion()

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[deprecation] `useTransitions` is deprecated and will be removed in the next major release. Please migrate to `StaggeredContainer`.",
    )
  }
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
