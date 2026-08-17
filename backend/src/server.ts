import app from './app';

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(
    'Note: product/category/admin routes need Cloudflare D1 and only work under `npm run dev:worker` (wrangler dev), not this plain Node entry point.'
  );
});
