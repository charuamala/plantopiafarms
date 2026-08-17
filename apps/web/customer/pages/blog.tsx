import { blogPosts } from "../lib/blog";
import BlogCard from "../src/components/BlogCard";

export default function BlogPage() {
  return (
    <main className="page-shell">
      <section className="page-hero simple blog-hero">
        <div>
          <p className="eyebrow">Blog</p>
          <h1>Stories from the field, and your fridge.</h1>
          <p>
            Farming notes, nutrition tips, and what's happening at Plantopia
            Farms this season.
          </p>
        </div>
        <div className="hero-float-image blog-hero-image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&w=900&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="blog-grid">
        {blogPosts.map((post, idx) => (
          <BlogCard key={post.slug} post={post} delay={idx * 90} />
        ))}
      </section>
    </main>
  );
}
