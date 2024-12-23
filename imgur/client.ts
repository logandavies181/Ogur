const baseUrl = "https://api.imgur.com/3"

export class Client {
  private fopts: RequestInit
  constructor(clientId: string) {
    const headers = {
      "Authorization": `Client-ID ${clientId}`
    }
    this.fopts = {
      headers: headers,
      referrerPolicy: "no-referrer",
    }
  }

  private async fetch<T>(subPath: string) {
    const raw = await fetch(`${baseUrl}/${subPath}`, this.fopts)
    const apiResp = await raw.json() as ApiResponse<T>

    if (apiResp.status !== 200) {
      console.error(apiResp)
      return null;
    }

    return apiResp.data
  }

  private rationalizeGallery(items: GalleryItem[]) {
    for (const i in items) {
      const item = items[i]
      if (item.is_album) {
        continue
      }

      console.log(`rationalising: ${item.id}`)

      // unsafe cast to ImageItem to deal with awkward dynamic response model
      const imageItem = item as unknown as ImageItem

      items[i].images = [imageItem]
    }
  }

  async Gallery() {
    const items =  await this.fetch<GalleryItem[]>("gallery/hot/viral/day/0")
    if (items === null) {
      console.error("no items in response")
      return []
    }

    this.rationalizeGallery(items)

    return items
  }
}

export type ApiResponse<T> = {
  data: T,
  success: boolean,
  status: number
}

export type GalleryItem = {
  id: string
  title: string
  description: string
  datetime: number
  ups: number
  down: number
  points: number
  score: number
  comment_count: number
  is_album: boolean
  topic: string
  topic_id: number
  account_url: string
  account_id: number

  images: ImageItem[]
}

export type ImageItem = {
  id: string
  title: string
  description: string
  datetime: number
  type: string
  animated: boolean
  width: number
  height: number
  size: number
  views: number
  bandwidth: number
  deletehash: string
  link: string
  gifv: string
  mp4: string
  mp4_size: number
  looping: boolean
  vote: string
  favorite: boolean
  nfsw: boolean

  name: string
  section: string
  in_gallery: boolean
}
