<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verification notes

- Run a standalone typecheck with `node node_modules/typescript/bin/tsc --noEmit --incremental false` to avoid updating the incremental cache.
- Direct checks of `lib/seo.tsx` through the existing `jiti` dependency need `jsx: { runtime: "automatic" }` and the `@` alias mapped to the repository root.
