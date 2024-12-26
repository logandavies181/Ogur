import { useEffect, useState } from "https://esm.sh/preact/hooks"

import { GalleryItem } from "../imgur/client.ts"

import { html } from "../html.ts"
import { Client } from "../imgur/client.ts"
import { Carousel } from "../components/carousel.ts"
import { GalleryPage } from "../components/galleryPage.ts"
import { IMGUR_TOKEN } from "../.env.ts"

export function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])

  useEffect(() => {
    ;(async () => {
      const client = new Client(IMGUR_TOKEN)
      const gallery = await client.Gallery()
      setGallery(gallery)
    })()
  }, [])

  if (gallery.length == 0) {
    return html`Loading...`
  }

  return html`
    <${Carousel}>
      ${gallery.map((gallery) => html`<${GalleryPage} gallery=${gallery} />`)}
    </Carousel>
  `
}
