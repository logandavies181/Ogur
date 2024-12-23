import { html } from "../html.ts"

import { ComponentChild } from "https://esm.sh/preact"

type CarouselProps = {
  children: ComponentChild[]
}

export function Carousel({ children }: CarouselProps) {
  return html`
    <div class="min-w-full w-full flex flex-row overflow-hidden rounded-lg" >
      ${children.map(child => {
        return html`
          <div class="min-w-full w-full" >
            ${child}
          </div>
        `
      })}
    </div>
  `
}
