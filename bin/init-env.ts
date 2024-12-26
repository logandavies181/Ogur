const imgurToken = Deno.env.get("IMGUR_TOKEN")
if (imgurToken == undefined) {
  console.error("IMGUR_TOKEN must be set")
  Deno.exit(1)
}

Deno.writeTextFile(".env.ts", `export const IMGUR_TOKEN = "${imgurToken}"\n`)
