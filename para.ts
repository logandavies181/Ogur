import { ComponentChildren } from 'https://esm.sh/preact';

import { html } from './html.ts'

type messageProps = {
  message: string
}

type myprops = {
  message: string
  children: ComponentChildren
}

export function para(props: myprops) {
  console.log(`${props.message}`)

  return html`
    <div class="flex flex-col content-start justify-center items-center" >
      ${props.children}
    </div>
  `
}
