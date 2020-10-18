import { Breakpoint, BreakpointValues } from "./breakpoints.interfaces"

export const values: BreakpointValues = {
  xs: 256,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export const keys: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"]

const step = 2

const unit = "px"

export function up(key: Breakpoint | number) {
  const value = typeof key === "number" ? key : values[key]
  return `@media (min-width:${value}${unit})`
}

export function down(key: Breakpoint | number) {
  if (typeof key === "number") {
    return `@media (max-width:${key - step / 100}${unit})`
  }
  const endIndex = keys.indexOf(key)
  const upperbound = values[keys[endIndex]]

  if (endIndex === keys.length) {
    // down from the biggest breakpoint applies to all sizes
    return up("xs")
  }
  return `@media (max-width:${upperbound - step / 100}${unit})`
}

export function between(start: Breakpoint | number, end: Breakpoint | number) {
  const startValue = typeof start !== "number" ? values[start] : start
  const endValue = typeof end !== "number" ? values[end] : end

  const endIndex = typeof end !== "number" ? keys.indexOf(end) : -1

  if (startValue > endValue) {
    throw new Error("End value must be greater than Start value")
  }

  return (
    `@media (min-width:${startValue}${unit}) and ` +
    `(max-width:${(endIndex !== -1 ? values[keys[endIndex]] : endValue) -
      step / 100}${unit})`
  )
}

export function only(key: Breakpoint) {
  if (keys.indexOf(key) + 1 < keys.length) {
    return between(key, keys[keys.indexOf(key) + 1])
  }

  return up(key)
}

export function width(key: Breakpoint) {
  return values[key]
}
