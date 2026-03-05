import { Breakpoint } from "../breakpoints/breakpoints.interfaces"

type MaxWidthKeys = Exclude<Breakpoint, "xs">

export type MaxWidthValues = { [key in MaxWidthKeys]: string }
