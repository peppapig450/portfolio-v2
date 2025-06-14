"use client"

import { isMotionComponent, motion, useReducedMotion } from "framer-motion"
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useMemo,
} from "react"

import type { MotionProps, Variants } from "framer-motion"
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
  ReactElement,
} from "react"

interface StaggeredContainerOwnProps extends PropsWithChildren {
  /** Delay between each child's animation */
  staggerDelay?: number
  /** Initial delay before the first child's animation */
  initialDelay?: number
  /** Variant configuration for child animations */
  variant?: Variants
}

/**
 * Merges the container's own props, Framer Motion's MotionProps,
 * and the props of the wrapped component T (omitting any conflicts).
 */
type PolymorphicProps<T extends ElementType> = StaggeredContainerOwnProps & // own props
  MotionProps & // Framer Motion base props
  Omit<ComponentPropsWithoutRef<T>, keyof StaggeredContainerOwnProps> & {
    as?: T
  } // polymorphic "as"

/**
 * A soft, spring-based entrance animation for staggered children.
 * - Fades in with upward motion, slight scale-up, and blur reduction.
 * - Creates a "floating in from the fog" visual effect.
 */
const revealChildVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 150,
    },
  },
}

/*
 * Non-motion child variant for our motion-sensitive pals
 */
const zeroMotionChildVariant: Variants = {
  hidden: {},
  visible: { transition: { duration: 0 } },
}

/**
 * Returns a motion-enhanced component regardless of whether the input is already
 * a motion component. Framer will detect and simply return the same component
 *  if it's already wrapped.
 */
const toMotion = <T extends ElementType>(component: T) => {
  return motion.create(component)
}

const StaggeredContainerInner = <T extends ElementType = "div">(
  {
    as,
    children,
    staggerDelay = 0.2,
    initialDelay = 0.1,
    variant = revealChildVariant,
    ...rest
  }: PolymorphicProps<T>,
  ref: ForwardedRef<any>,
) => {
  const shouldReduceMotion = useReducedMotion()

  /**
   * Parent variants – either instant for reduced‑motion users or a staggered
   * sequence for everyone else.
   */
  const parentVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: {},
        visible: { transition: { duration: 0 } },
      }
    }
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: initialDelay,
        },
      },
    }
  }, [shouldReduceMotion, staggerDelay, initialDelay])

  const childVariants: Variants = useMemo(
    () => (shouldReduceMotion ? zeroMotionChildVariant : variant),
    [shouldReduceMotion, variant],
  )

  const MotionContainer = useMemo(() => toMotion(as ?? "div"), [as])

  // Avoid an extra wrapper where the child is already a motion component.
  const renderedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child

    const key = child.key ?? index

    // If it's already a motion component, just clone it with variants added
    if (isMotionComponent(child.type)) {
      const motionChild = child as ReactElement<MotionProps>
      return cloneElement<MotionProps>(motionChild, {
        key,
        variants: childVariants,
      })
    }

    // Convert the child's underlying type to a motion component
    const MotionChild = toMotion(child.type as ElementType)

    return (
      <MotionChild key={key} variants={childVariants} {...child.props}>
        {child.props.children}
      </MotionChild>
    )
  })

  return (
    <MotionContainer
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {renderedChildren}
    </MotionContainer>
  )
}

// Give the inner component a fancy display name for debugging
StaggeredContainerInner.displayName = "StaggeredContentInner"

/**
 * A container that staggers its children's animations on mount.
 * Supports polymorphic "as" to render any HTML or custom component,
 * with full props and ref forwarding.
 *
 * This component is memoized to prevent unnecessary re-renders.
 */
export const StaggeredContainer = memo(
  forwardRef(StaggeredContainerInner),
  (prev, next) =>
    prev.staggerDelay === next.staggerDelay &&
    prev.initialDelay === next.initialDelay &&
    prev.variant === next.variant &&
    prev.as === next.as,
) as unknown as <T extends ElementType = "div">(
  props: PolymorphicProps<T> & { ref?: ForwardedRef<any> },
) => JSX.Element
