# Caminos de santidad

An Astro application containing a first-person Three.js prototype.

## Run locally

    pnpm install
    pnpm dev

Open the localhost URL printed by Astro (normally http://localhost:4321).
Use WASD/arrows to walk, mouse to look, E to interact and Escape to pause.
Touch devices use the direction buttons and drag to look. Desktop play starts only after pointer lock succeeds: the browser hides the cursor and supplies unrestricted relative mouse movement. Escape pauses and restores the cursor. If the embedded browser rejects capture, a visible message asks you to open the same URL in Chrome or Edge; no edge-limited mouse fallback is used.

## Verify and build

    pnpm test
    pnpm check
    pnpm build
    pnpm preview

Tests exercise the actual TypeScript sources, including cinematic pause/resume.
Astro processes and bundles the client script; no manual JavaScript compilation is required.
Build output goes into dist. The development server binds only to localhost.

## Structure

- src/pages/index.astro: document and client entry.
- src/components/GameOverlay.astro: game interface, menus and historical note.
- src/game/scene.ts: Three.js scene, input and cinematic.
- src/game/world.ts: navigation and progression rules.
- src/styles/game.css: global game styles.
- tests: movement, camera and cinematic regression checks.
- legacy: preserved standalone prototypes, not deployed by Astro.

Astro 5.18.2 was selected for compatibility with the installed Node 22.15.0.
Three.js remains at 0.170.0 to avoid changing engine behavior during migration.
Use pnpm; pnpm-lock.yaml records the resolved dependencies.
Only esbuild and sharp dependency build scripts are approved in pnpm configuration.

## Current scope

The main route begins in Jerusalem: listen to the neighbor, inspect the authorization and use the gate to depart. A fade loads /camino, a short playable outdoor road ending at a reconstructed refuge. At the refuge, a directed light/voice sequence leads to blindness; the chapter currently ends there. The voice is text-only and explicitly adapted from Acts 9. Guided entry into Damascus and Ananias are not implemented. /damasco retains the separate escape technical prototype.

The road reuses movement, pointer lock, touch input, collision, pause and restart. Terrain and props are provisional geometry, not final art or an exact historical route. There is no final audio, animated traveling party or persistent chapter save.

Automated checks cover progression, collisions, input lifecycle, encoding and road arrival. Browser traversal was checked with touch emulation; physical-phone testing and captured desktop mouse validation remain pending.
