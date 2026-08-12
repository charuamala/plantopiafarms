# Plantopia Farms

A full-stack berry e-commerce platform with:

- Customer web app
- Admin dashboard
- Backend API
- Mobile app shell

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Start backend

```bash
npm run dev:backend
```

### 3. Start customer frontend

```bash
npm run dev:customer
```

### 4. Start admin frontend

```bash
npm run dev:admin
```

### 5. Start mobile app

```bash
npm --workspace @plantopia/mobile run start
```

## Default ports

- Backend: http://localhost:4000
- Customer app: http://localhost:5173
- Admin app: http://localhost:5174

## Project structure

- `backend` — Express + TypeScript API
- `apps/web/customer` — customer storefront
- `apps/web/admin` — admin dashboard
- `apps/mobile` — React Native / Expo app

## Notes

This is a production-ready foundation and starter project for the Plantopia Farms platform. You can extend each area with full product, order, banner, and CMS logic as needed.
