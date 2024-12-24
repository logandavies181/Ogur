import { useState } from "https://esm.sh/preact/hooks"
import { html } from "../html.ts"

import { ComponentChild } from "https://esm.sh/preact"

type CarouselProps = {
  children: ComponentChild[]
}

type SwipeEvent = {
  detail: SwipeData
}

type SwipeData = {
  dir: "up" | "down" | "left" | "right"
}

export function Carousel({ children }: CarouselProps) {
  const [showIndex, setShowIndex] = useState(0)

  const onSwiped = (event: SwipeEvent) => {
    console.log(`swiped ${event.detail.dir}`)
    switch (event.detail.dir) {
    case "left":
      setShowIndex(showIndex+1)
      break
    case "right":
      setShowIndex(showIndex-1)
      break
    }
  }

  return html`
    <div class="min-w-full w-full flex flex-row overflow-hidden rounded-lg"
      onswiped=${onSwiped}
    >
      ${children.map((child, index) => {
        return html`
          <div class="min-w-full w-full" style=${index == showIndex ? {} : {display: "none"}} >
            ${child}
          </div>
        `
      })}
    </div>
  `
}
