alias c := check
@check:
    deno check **/*.ts

alias b := build
@build: check
    bun build main.ts --outdir dist
    bun build sw.ts --outdir dist
    echo "\n// $(git rev-parse HEAD) $(uuidgen)" >> dist/sw.js # trigger reload
    deno run -A npm:tailwindcss -o dist/output.css
    cp public/favicon.svg index.html manifest.json dist

alias s := serve
@serve: build
    #!/usr/bin/env bash
    cd dist
    python3 -m http.server 8080

alias f := fmt
@fmt:
    deno run -A npm:prettier -w **/*.ts

alias i := init
@init:
    deno run -A bin/init-env.ts
