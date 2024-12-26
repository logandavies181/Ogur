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
    <div class="min-w-full w-full min-h-full h-full flex flex-col grow"
      onswiped=${onSwiped}
    >
      <div class="min-w-full w-full min-h-full h-full flex flex-row overflow-hidden rounded-lg"
      >
        ${children.map((child, index) => {
          return html`
            <div class="min-w-full w-full" style=${index == showIndex ? {} : {display: "none"}} >
              ${child}
            </div>
          `
        })}
      </div>
    </div>
  `
}
