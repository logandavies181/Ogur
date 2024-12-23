import { render } from "https://esm.sh/preact"

import { html } from "./html.ts"

import { Navbar } from "./components/navbar.ts";

import { Gallery } from "./pages/gallery.ts"

type SwipeEvent = {
  detail: SwipeData
}

type SwipeData = {
  dir: "up" | "down" | "left" | "right"
}

function App() {
  const onSwiped = (event: SwipeEvent) => {
    console.log(event.detail.dir)
  }

  return html`
    <${Navbar} />
    <main onswiped=${onSwiped} >
      <${Gallery} />
    </main>
  `;
}

render(html`<${App} />`, document.body);
