alias c := check
@check:
    deno check **/*.ts

alias b := build
@build: check
    bun build main.ts --outdir dist
    deno run -A npm:tailwindcss -o dist/output.css
    cp public/favicon.svg dist

alias s := serve
@serve: build
    python3 -m http.server 8080

alias f := fmt
@fmt:
    deno run -A npm:prettier -w **/*.ts

alias i := init
@init:
    deno run -A bin/init-env.ts
