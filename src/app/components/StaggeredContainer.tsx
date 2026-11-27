"use client"

import { designTokens } from "@/styles/theme"
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
type PolymorphicProps<T extends ElementType> = StaggeredContainerOwnProps &
  MotionProps &
  Omit<ComponentPropsWithoutRef<T>, keyof StaggeredContainerOwnProps> & {
    as?: T
  }

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
 * Crisp planar registration entrance — replaces soft foggy blur with a
 * sharp horizontal/vertical settle that matches the portfolio's graphic identity.
 */
export const signalRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    clipPath: "inset(0 0 8% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.36,
      ease: designTokens.motion.easeOut,
    },
    transitionEnd: {
      clipPath: "none",
    },
  },
}

const zeroMotionChildVariant: Variants = {
  hidden: {},
  visible: { transition: { duration: 0 } },
}

const motionComponentCache = new Map<ElementType, ElementType>()

/** Guarantees we always deal with a stable, cached motion-enhanced component. */
const toMotion = <T extends ElementType>(component: T): ElementType => {
  const cached = motionComponentCache.get(component)
  if (cached) return cached
  const created = motion.create(component) as ElementType
  motionComponentCache.set(component, created)
  return created
}

const StaggeredContainerInner = <T extends ElementType = "div">(
  {
    as,
    children,
    staggerDelay = 0.08,
    initialDelay = 0.04,
    variant = signalRevealVariant,
    ...rest
  }: PolymorphicProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const shouldReduceMotion = useReducedMotion()

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

  const renderedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child

    const key = child.key ?? index

    if (isMotionComponent(child.type)) {
      const motionChild = child as ReactElement<MotionProps>
      return cloneElement<MotionProps>(motionChild, {
        key,
        variants: childVariants,
      })
    }

    const MotionChild = toMotion(child.type as ElementType)

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

const Forwarded = forwardRef(
  StaggeredContainerInner as unknown as (
    props: PolymorphicProps<ElementType>,
    ref: PolymorphicRef<ElementType>,
  ) => JSX.Element,
)

export const StaggeredContainer = memo(Forwarded) as ForwardRefWithAs<"div">
StaggeredContainerInner.displayName = "StaggeredContentInner"
