import { html } from '../html.ts'
import { ImageItem } from "../imgur/client.ts";

type ImageCardProps = {
  input: ImageItem
}

const ImageTypes = {
  Jpeg: "image/jpeg",
  Png: "image/png",
  Mp4: "video/mp4",
} as const

export function ImageCard({ input }: ImageCardProps) {
  if (input.type == ImageTypes.Jpeg || input.type == ImageTypes.Png) {
    return html`
      <div class="flex flex-col" >
        <h3>Title is: [ ${input.title} ]</h3>
        <img src=${input.link} />
        Description is: [ ${input.description} ]
      </div>
    `
  }

  if (input.type == ImageTypes.Mp4) {
    return html`
      <video class="w-full" autoplay muted controls>
        <source src=${input.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `
  }

  return html`<h3>Type: ${input.type} not implemented</h3>`
}
