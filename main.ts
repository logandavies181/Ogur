import { render } from "https://esm.sh/preact"

import { html } from "./html.ts"

import { Navbar } from "./components/navbar.ts"

import { Gallery } from "./pages/gallery.ts"

import "./vendor/swiped-events/swiped-events.min.js"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js", { scope: "/" })
}

function App() {
  return html`
    <${Navbar} />
    <main class="flex flex-col grow">
      <${Gallery} />
    </main>
  `
}

render(html`<${App} />`, document.body)
