# Frontend (this repo)

```bash
cd frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` to your deployed API (see [museum_backend](https://github.com/TUSK56/museum_backend)).

## Docker (frontend only)

```bash
docker compose up --build -d
docker compose ps
```

## Backend API

The backend is **not** in this repo. Clone and run:

https://github.com/TUSK56/museum_backend
