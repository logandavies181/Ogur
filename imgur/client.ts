const baseUrl = "https://api.imgur.com/3"

export class Client {
  private fopts: RequestInit
  private initialized: boolean
  private items: GalleryItem[]
  private currIndex: number
  constructor(clientId: string) {
    const headers = {
      Authorization: `Client-ID ${clientId}`,
    }
    this.fopts = {
      headers: headers,
      referrerPolicy: "no-referrer",
    }
    this.initialized = false
    this.currIndex = 0
    this.items = []
  }

  private async fetch<T>(subPath: string) {
    const raw = await fetch(`${baseUrl}/${subPath}`, this.fopts)
    const apiResp = (await raw.json()) as ApiResponse<T>

    if (apiResp.status !== 200) {
      console.error(apiResp)
      return null
    }

    return apiResp.data
  }

  private rationalizeGallery(items: GalleryItem[]) {
    for (const i in items) {
      const item = items[i]
      if (item.is_album) {
        continue
      }

      // unsafe cast to ImageItem to deal with awkward dynamic response model
      const imageItem = item as unknown as ImageItem

      items[i].images = [imageItem]
    }
  }

  private async initializeGallery() {
    const items = await this.fetch<GalleryItem[]>(`gallery/hot/viral/day/0`)
    if (items === null) {
      console.error("no items in response")
      return []
    }

    this.rationalizeGallery(items)
    this.items = items
    this.initialized = true
  }

  // Imgur API for gallery gives incomplete albums - they only have 3 images in them!
  private async ensureUpcomingAlbumsFilled() {
    for (let i = 0; i < 5; i++) {
      const item = this.items[this.currIndex + i]
      if (item == undefined) {
        return
      }

      if (item.images.length == item.images_count) {
        return
      }

      console.log(`index: ${i}. id: ${item.id}`)

      const album = await this.fetch<AlbumItem>(`album/${item.id}`)
      if (album == null) {
        console.error("null album response")
        continue
      }
      item.images = album.images
    }
  }

  async GalleryFirst() {
    if (!this.initialized) {
      await this.initializeGallery()
    }
    this.currIndex = 0
    await this.ensureUpcomingAlbumsFilled()
    console.log(this.items)
    return this.items[this.currIndex]
  }

  async GalleryNext() {
    this.currIndex++
    await this.ensureUpcomingAlbumsFilled()
    console.log(`curr index is: ${this.currIndex}`)
    console.log(this.items[this.currIndex])
    return this.items[this.currIndex]
  }

  GalleryPrev() {
    if (this.currIndex != 0) {
      this.currIndex--
    }
    return this.items[this.currIndex]
  }
}

export type ApiResponse<T> = {
  data: T
  success: boolean
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

  // The imgur API returns only up to 3 of the images!
  images_count: number

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

export type AlbumItem = {
  id: string
  title: string
  description: string
  datetime: number
  cover: string
  cover_width: number
  cover_height: number
  account_url: string
  account_id: string
  privacy: string
  layout: string
  views: number
  link: string
  favorite: boolean
  nsfw: boolean
  section: string
  order: number
  deletehash: string
  images_count: number
  images: ImageItem[]
  in_gallery: boolean
}
