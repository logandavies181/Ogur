alias c := check
@check:
    deno check **/*.ts

alias b := build
@build: check
    deno run -A npm:tailwindcss -o dist/output.css
    bun build main.ts --outdir dist

alias s := serve
@serve: build
    python3 -m http.server 8080
