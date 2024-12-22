import { Client } from "../imgur/client.ts"

const clientId = (function(): string {
  const val = Deno.env.get("IMGUR_TOKEN")
  if (val === undefined) {
    console.error("IMGUR_TOKEN must be set!")
    Deno.exit(1)
  } else {
    return val!
  }
})()

const client = new Client(clientId)

const gal = await client.Gallery()

for (const item of gal) {
  if (!item.is_album) {
    console.log(item.images[0].id)
    console.log(item.images[0].link)
  }
}
