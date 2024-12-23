import { html } from '../html.ts'
import { ImageItem } from "../imgur/client.ts";

type ImageCardProps = {
  input: ImageItem
}

const ImageTypes = {
  Image: "image/jpeg"
} as const

export function ImageCard({ input }: ImageCardProps) {
  console.log(input)

  if (input.type !== ImageTypes.Image) {
    return html`<h3>Not implemented</h3>`
  }

  return html`
    <div class="flex flex-col" >
      <h3>Title is: [ ${input.title} ]</h3>
      <img src=${input.link} />
      Description is: [ ${input.description} ]
    </div>
  `
}
