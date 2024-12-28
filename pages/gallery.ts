import { useEffect, useState } from "https://esm.sh/preact/hooks"

import { GalleryItem } from "../imgur/client.ts"

import { html } from "../html.ts"
import { Client } from "../imgur/client.ts"
import { GalleryPage } from "../components/galleryPage.ts"
import { IMGUR_TOKEN } from "../.env.ts"

import { KeyDownEvent, KeyDownKeys, KeyDownTopic, SwipeEvent } from "../lib/events.ts"

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [showIndex, setShowIndex] = useState(0)
  const [fetching, setFetching] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

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

  const handleDecr = () => {
    if (showIndex == 0) {
      return
    }

    setShowIndex(showIndex - 1)
  }

  const handleIncr = () => {
    setShowIndex(showIndex + 1)

    if (showIndex < galleryItems.length * 0.8) {
      return
    }

    setPageNumber(pageNumber + 1)

    if (fetching) {
      return
    } else {
      setFetching(true)
    }

    ;(async () => {
      const nextPage = await client.Gallery(pageNumber)
      setGalleryItems(galleryItems.concat(nextPage))
      setFetching(false)
    })()
  }

  const onSwiped = (event: SwipeEvent) => {
    switch (event.detail.dir) {
      case "left":
        handleIncr()
        break

      case "right":
        handleDecr()
        break
    }
  }

  const onKeyDown = (event: KeyDownEvent) => {
    switch (event.code) {
      case KeyDownKeys.right:
        handleIncr()
        break
      case KeyDownKeys.left:
        handleDecr()
        break
    }
  }

  KeyDownTopic.Subscribe(onKeyDown)

  if (galleryItems.length == 0) {
    return html`Loading...`
  }

  return html`
    <div
      class="min-w-full w-full min-h-full h-full flex flex-col grow"
      onswiped=${onSwiped}
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
