---
name: upgrade-package-json
description: >-
  Upgrades dependency and devDependency versions in package.json using the
  repo’s package manager, updates the lockfile, and verifies with lint/build.
  Use when bumping npm/bun/pnpm/yarn packages, updating dependencies,
  refreshing lockfiles, or when the user asks to upgrade package versions.
---

# Upgrade package.json versions

## Detect the package manager

Use the lockfile at the repo root (first match wins):

| Lockfile            | Tool   |
|---------------------|--------|
| `bun.lock` / `bun.lockb` | Bun |
| `pnpm-lock.yaml`    | pnpm   |
| `yarn.lock`         | Yarn   |
| `package-lock.json` | npm    |

If multiple exist, prefer **Bun** if `bun.lock*` is present; otherwise prefer **pnpm** if `pnpm-lock.yaml` exists.

## Semver in package.json (quick reference)

- `^1.2.3` - compatible with `>=1.2.3 <2.0.0`
- `~1.2.3` - compatible with `>=1.2.3 <1.3.0`
- Exact `1.2.3` - only that version

Changing `package.json` without installing leaves the lockfile stale; always run the install/update step for that tool.

## Workflow

1. **See what is outdated** (run in project root):
   - Bun: `bun outdated`
   - npm: `npm outdated`
   - pnpm: `pnpm outdated`
   - Yarn: `yarn outdated`

2. **Choose scope**
   - **Safe batch**: patch/minor within current ranges - use the tool’s bulk update (below).
   - **Single package** to a specific range: add/install that package (updates `package.json` + lockfile).
   - **Major upgrades** (e.g. React, Vite, ESLint): do one ecosystem at a time; read the library’s migration guide and fix breaking changes before moving on.

3. **Apply updates**

   **Bun**
   - All dependencies to latest within existing semver ranges: `bun update`
   - One package to latest allowed by range: `bun update <name>`
   - Bump range and resolve latest: `bun add <name>@latest` or `bun add -d <name>@latest` for devDependencies

   **npm**
   - Respect existing ranges: `npm update`
   - One package: `npm install <name>@latest` or `npm install -D <name>@latest`

   **pnpm**
   - Interactive: `pnpm update -i`
   - Latest within range: `pnpm update`
   - One package: `pnpm add <name>@latest` / `pnpm add -D <name>@latest`

   **Yarn (Berry)**
   - `yarn up` / `yarn up <name>` (see Yarn docs for exact flags if needed)

4. **Verify**
   - Run the project’s scripts after changes, typically `lint` and `build` (e.g. `bun run lint && bun run build`).
   - Fix any type errors, deprecations, or config migrations surfaced by the upgraded packages.

5. **Commit**
   - Include both `package.json` and the lockfile in the same commit.

## Editing package.json by hand

Prefer CLI updates so the lockfile stays consistent. If you must edit JSON manually:

- Keep valid JSON (trailing commas are invalid).
- Match existing quoting and key order style in the file.
- Run install/update for the detected tool immediately after so the lockfile reflects the change.

## Anti-patterns

- Upgrading everything to `@latest` in one shot on a large app without testing intermediate steps.
- Ignoring peer dependency warnings after an upgrade.
- Committing `package.json` without the matching lockfile change.
