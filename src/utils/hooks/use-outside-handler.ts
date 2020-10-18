import React from "react"

export function useOutsideHandler(
  ref: React.MutableRefObject<HTMLElement>,
  handler: () => void
) {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener: any = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler()
    }
    document.addEventListener("mousedown", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
    }
  }, [ref, handler])
}
