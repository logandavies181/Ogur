import { Client } from "../imgur/client.ts"

import { IMGUR_TOKEN } from "../.env.ts"

const client = new Client(IMGUR_TOKEN)

const gal = await client.Gallery(2)

console.log(gal.length)
