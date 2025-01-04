import { html } from "../html.ts"
import { ImageItem } from "../imgur/client.ts"

type ImageCardProps = {
  input: ImageItem
  pageTitle: string
}

const ImageTypes = {
  Jpeg: "image/jpeg",
  Gif: "image/gif",
  Mp4: "video/mp4",
  Png: "image/png",
} as const

export function ImageCard({ input, pageTitle }: ImageCardProps) {
  let imageOrVideo = html``

  switch (input.type) {
    case ImageTypes.Jpeg:
    case ImageTypes.Gif:
    case ImageTypes.Png:
      imageOrVideo = html`<img src=${input.link} />`
      break
    case ImageTypes.Mp4:
      imageOrVideo = html`
        <video
          id=${input.id}
          class="w-full"
          autoplay
          muted
          controls
          src=${input.link}
        >
          Your browser does not support the video tag.
        </video>
      `
      break
    default:
      return html`<h3>Type: ${input.type} not implemented</h3>`
  }

  return html`
    <div class="flex flex-col m-1">
      ${input.title && input.title != pageTitle && html`<h3 class="ml-2">${input.title}</h3>`} ${imageOrVideo}
      ${input.description && html`<div class="ml-2">${input.description}</div>`}
    </div>
  `
}
