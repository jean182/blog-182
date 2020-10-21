import React from "react"

export function useOutsideHandler(
  ref: React.MutableRefObject<HTMLElement>,
  handler: () => void
) {
  React.useEffect(() => {
    function listener(event) {
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
