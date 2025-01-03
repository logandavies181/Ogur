import { IMGUR_TOKEN } from "../.env.ts"
import { Client } from "../imgur/client.ts"

const client = new Client(IMGUR_TOKEN)

const gal = await client.Gallery()

for (const g of gal) {
  if (g.id != "mLbKsUy") {
    continue
  }

  console.log(g)
}
