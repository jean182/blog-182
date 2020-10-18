import { Breakpoint } from "../breakpoints/breakpoints.interfaces"

type MaxWidthKeys = Exclude<Breakpoint, "xs" | "xl">

export type MaxWidthValues = { [key in MaxWidthKeys]: string }
