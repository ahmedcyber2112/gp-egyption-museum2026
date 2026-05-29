# Deploy frontend on Netlify

## Fix: "Unable to access repository" / host key verification

This repo lives at **https://github.com/TUSK56/GP-Egyption-Museum2026** (it was moved from `Ahmedcyber2112/GP-Egyption-Museum2026`). Netlify must be linked to the repo your account can access.

1. **Netlify** → your site → **Site configuration** → **Build & deploy** → **Continuous deployment** → **Link repository** (or **Manage repository**).
2. Choose **GitHub** and authorize Netlify if prompted.
3. Select **`TUSK56/GP-Egyption-Museum2026`** (not only the old owner name).
4. Branch: **`main`**.
5. Confirm **Base directory** is empty (root); `netlify.toml` sets `base = "frontend"`.
6. **Save** and **Deploy site** → **Trigger deploy** → **Clear cache and deploy site**.

If the repo is **private**, GitHub → **Settings** → **Applications** → **Netlify** → grant access to `TUSK56` / this repository.

### Manual deploy (no Git clone on Netlify)

If Git linking keeps failing:

```bash
cd fullstack/frontend
npm ci
npm run build
npx netlify deploy --prod --dir=.next
```

(Requires [Netlify CLI](https://docs.netlify.com/cli/get-started/) and `netlify login`.)

## Environment variables (optional)

Set in Netlify → **Environment variables** (or use values from `netlify.toml`):

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://muesum-a252b23f7b32.herokuapp.com` |
| `NEXT_INTERNAL_API_BASE_URL` | `https://muesum-a252b23f7b32.herokuapp.com` |

## Build settings (reference)

| Setting | Value |
|---------|--------|
| Base directory | *(empty — use repo root)* |
| Build command | *(from `netlify.toml`)* `npm ci && npm run build` in `frontend/` |
| Publish directory | *(from `netlify.toml`)* `.next` under `frontend/` |
| Plugin | `@netlify/plugin-nextjs` |
