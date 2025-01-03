import { useEffect, useState } from "https://esm.sh/preact/hooks"

import { html } from "../html.ts"
import { GalleryItem } from "../imgur/client.ts"
import { Client } from "../imgur/client.ts"
import { GalleryPage } from "../components/galleryPage.ts"
import { IMGUR_TOKEN } from "../.env.ts"
import { KeyDownEvent, KeyDownKeys, KeyDownTopic, SwipeEvent } from "../lib/events.ts"

const client = new Client(IMGUR_TOKEN)

export function Gallery() {
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const galleryPage = await client.GalleryFirst()
      setGalleryItem(galleryPage)
      setLoaded(true)
    })()
  }, [])

  const handleDecr = () => {
    const galleryPage = client.GalleryPrev()
    setGalleryItem(galleryPage)
  }

  const handleIncr = () => {
    const galleryPage = client.GalleryNext()
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
          <${GalleryPage} galleryItem=${galleryItem} />
        </div>
      </div>
    </div>
  `
}
