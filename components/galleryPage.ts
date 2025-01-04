import { html } from "../html.ts"
import { GalleryItem } from "../imgur/client.ts"
import { ImageCard } from "./imageCard.ts"

type GalleryPageProps = {
  galleryItem: GalleryItem
  swipeDirection: "swipe-left" | "swipe-right" | ""
}

export function GalleryPage({ galleryItem, swipeDirection }: GalleryPageProps) {
  return html`
    <div
      class="flex flex-col ${swipeDirection}"
      key=${galleryItem.id}
    >
      <h2 class="text-lg font-bold ml-2">${galleryItem.title}</h2>
      ${galleryItem.images.map(
        (image) =>
          html`<${ImageCard}
            input=${image}
            pageTitle=${galleryItem.title}
          /> `,
      )}
    </div>
  `
}
