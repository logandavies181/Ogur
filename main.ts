import { render } from 'https://esm.sh/preact';

import { html } from './html.ts'

import { para } from './para.ts'

type nprops = {
  name: string
}

function App(props: nprops) {
  const picsum = html`<div><img src="https://picsum.photos/200/300" /></div>`
  return html`
    <header>
      <h1>
        Hello ${props.name}!
      </h1>
    </header>
    <main>
      <${para} message=hi >
        ${Array(3).fill(0).map(() => picsum)}
      </para>
    </main>
  `;
}

render(html`<${App} name="World" />`, document.body);
