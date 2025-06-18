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
  ComponentPropsWithRef,
  ElementType,
  JSX,
  PropsWithChildren,
  ReactElement,
  ReactNode,
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

/** Helper to get the right `ref` for any element/component */
type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

/**
 * What the *public* component should look like once all the casting is done.
 */
export type ForwardRefWithAs<DefaultAs extends ElementType> = <
  As extends ElementType = DefaultAs,
>(
  props: PolymorphicProps<As> & { ref?: PolymorphicRef<As> },
) => JSX.Element

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

/** Guarantees we always deal with a motion‑enhanced component. */
const toMotion = <T extends ElementType>(component: T) => {
  return motion.create(component)
}

/**
 * Generic render function. **Note**: this is *only* used to implement the
 * behavior; it will be wrapped and re‑typed before export so consumers get a
 * proper polymorphic experience.
 */
const StaggeredContainerInner = <T extends ElementType = "div">(
  {
    as,
    children,
    staggerDelay = 0.2,
    initialDelay = 0.1,
    variant = revealChildVariant,
    ...rest
  }: PolymorphicProps<T>,
  ref: PolymorphicRef<T>,
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

    // Cast props to a known shape so that `.children` is not on `any`
    const { children: nestedChildren, ...childRest } = child.props as {
      children?: ReactNode
    }

    return (
      <MotionChild key={key} variants={childVariants} {...childRest}>
        {nestedChildren}
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

/**
 * `forwardRef` doesn’t keep the generic, so we cast *after* creating the
 * component to re‑expose the polymorphic signature.
 */
const Forwarded = forwardRef(
  StaggeredContainerInner as unknown as (
    props: PolymorphicProps<ElementType>,
    ref: PolymorphicRef<ElementType>,
  ) => JSX.Element,
)

/**
 * A container that staggers its children's animations on mount.
 * Supports polymorphic "as" to render any HTML or custom component,
 * with full props and ref forwarding.
 *
 * This component is memoized to prevent unnecessary re-renders.
 */
export const StaggeredContainer = memo(Forwarded) as ForwardRefWithAs<"div">
StaggeredContainerInner.displayName = "StaggeredContentInner"
