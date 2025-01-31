import { useEffect, useState } from "https://esm.sh/preact/hooks"

import { html } from "../html.ts"
import { GalleryItem } from "../imgur/client.ts"
import { Client } from "../imgur/client.ts"
import { GalleryPage } from "../components/galleryPage.ts"
import { IMGUR_TOKEN } from "../.env.ts"
import { KeyDownEvent, KeyDownKeys, KeyDownTopic, SwipeEvent } from "../lib/events.ts"

const client = new Client(IMGUR_TOKEN)

export function Gallery() {
  const [galleryItem, _setGalleryItem] = useState<GalleryItem | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState("")

  useEffect(() => {
    ;(async () => {
      const galleryPage = await client.GalleryFirst()
      setGalleryItem(galleryPage)
      setLoaded(true)
      history.replaceState("", "", `gallery/${galleryItem?.id}`)
    })()
  }, [])

  const setGalleryItem = (gi: GalleryItem) => {
    _setGalleryItem(gi)
    history.replaceState("", "", `${gi.id}`)
  }

  const handleDecr = () => {
    const galleryPage = client.GalleryPrev()
    setSwipeDirection("swipe-right")
    setGalleryItem(galleryPage)
  }

  const handleIncr = () => {
    const galleryPage = client.GalleryNext()
    setSwipeDirection("swipe-left")
    setGalleryItem(galleryPage)
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

  KeyDownTopic.Subscribe("galleryPage", onKeyDown)

  if (!loaded) {
    return html`Loading...`
  }

  return html`
    <div
      class="min-w-full w-full min-h-full h-full flex flex-col grow"
      onswiped=${onSwiped}
    >
      <div class="min-w-full w-full min-h-full h-full flex flex-row overflow-hidden rounded-lg">
        <div class="min-w-full w-full">
          <${GalleryPage}
            galleryItem=${galleryItem}
            swipeDirection=${swipeDirection}
          />
        </div>
      </div>
    </div>
  `
}
