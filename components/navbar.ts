import { html } from "../html.ts"

export function Navbar() {
  return html`
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-row" >
        <img class="ml-2" src="dist/favicon.svg" width="50" height="50" />
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Test App!</span>
        </div>
        <div class="spaceholder grow" >
        </div>
      </div>
    </nav>
  `
}
