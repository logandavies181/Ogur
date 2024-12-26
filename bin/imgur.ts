import { Client } from "../imgur/client.ts"

import { IMGUR_TOKEN } from "../.env.ts"

const client = new Client(IMGUR_TOKEN)

const gal = await client.Gallery()

for (const item of gal) {
  for (const image of item.images) {
    console.log(image.type)
  }
}
