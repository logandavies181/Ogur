import { GalleryItem } from "../imgur/client.ts"

import { ImageCard } from "./imageCard.ts"

import { html } from "../html.ts"

type GalleryPageProps = {
  galleryItem: GalleryItem
}

export function GalleryPage({ galleryItem }: GalleryPageProps) {
  return html`
    <div class="flex flex-col">
      <h2 class="ml-2">${galleryItem.title}</h2>
      ${galleryItem.images.map((image) => html`<${ImageCard} input=${image} pageTitle=${galleryItem.title} />`)}
    </div>
  `
}
