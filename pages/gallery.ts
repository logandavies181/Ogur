import { useEffect, useState } from "https://esm.sh/preact/hooks"

import { GalleryItem } from "../imgur/client.ts"

import { html } from "../html.ts"
import { Client } from "../imgur/client.ts"
import { GalleryPage } from "../components/galleryPage.ts"
import { IMGUR_TOKEN } from "../.env.ts"

type SwipeEvent = {
  detail: SwipeData
}

type SwipeData = {
  dir: "up" | "down" | "left" | "right"
}

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [showIndex, setShowIndex] = useState(0)

  const client = new Client(IMGUR_TOKEN)

  useEffect(() => {
    if (showIndex < galleryItems.length * 0.8) {
      return
    }

    ;(async () => {
      const page0 = await client.Gallery(0)
      setGalleryItems(page0)
    })()
  }, [])

  const onSwiped = () => {
    let pageNumber = 0
    let fetching = false
    return (event: SwipeEvent) => {
      switch (event.detail.dir) {
        case "left":
          setShowIndex(showIndex + 1)

          if (showIndex < galleryItems.length * 0.8) {
            break
          }

          pageNumber += 1

          if (fetching) {
            break
          } else {
            fetching = true
          }

          (async () => {
            console.log("am fetching!")
            const nextPage = await client.Gallery(pageNumber)
            setGalleryItems(galleryItems.concat(nextPage))
            fetching = false
          })()

          break

        case "right":
          if (showIndex == 0) {
            break
          }

          setShowIndex(showIndex - 1)
          break
      }
      console.log(`page: ${showIndex} out of ${galleryItems.length}`)
    }
  }

  if (galleryItems.length == 0) {
    return html`Loading...`
  }

  return html`
    <div
      class="min-w-full w-full min-h-full h-full flex flex-col grow"
      onswiped=${onSwiped()}
    >
      <div class="min-w-full w-full min-h-full h-full flex flex-row overflow-hidden rounded-lg">
        ${galleryItems.map((item, index) => {
          return html`
            <div
              class="min-w-full w-full"
              style=${index == showIndex ? {} : { display: "none" }}
            >
              <${GalleryPage} galleryItem=${item} />
            </div>
          `
        })}
      </div>
    </div>
  `
}
