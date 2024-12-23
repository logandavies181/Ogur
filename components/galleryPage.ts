import { GalleryItem } from "../imgur/client.ts";

import { ImageCard } from "./imageCard.ts"

import { html } from '../html.ts'

type GalleryPageProps = {
  gallery: GalleryItem
}

export function GalleryPage({ gallery }: GalleryPageProps) {
  return html`
    <div class="flex flex-col" >
      <h2 class="ml-2" >${gallery.title}</h2>
      ${gallery.images.map(image => html`<${ImageCard} input=${image} />`)}
    </div>
  `
}
