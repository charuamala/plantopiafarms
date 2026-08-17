import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { blogPosts, BlogPost } from "../../lib/blog";
import SocialShare from "../../src/components/SocialShare";

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    const key = Array.isArray(slug) ? slug[0] : slug;
    setPost(blogPosts.find((p) => p.slug === key) ?? null);
  }, [slug]);

  if (post === undefined) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading post…</p>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Post not found</h1>
          <button type="button" onClick={() => router.push("/blog")}>
            Back to blog
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page-shell">
      <div className="detail-card blog-post-card">
        <button
          type="button"
          className="back-button"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <span className="blog-card-category">{post.category}</span>
        <h1>{post.title}</h1>
        <span className="blog-card-date">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        <div className="blog-post-image-wrap">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="blog-post-body">
          {post.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare />
        </div>

        <div className="blog-post-more">
          <Link href="/blog">← More stories from the farm</Link>
        </div>
      </div>
    </main>
  );
}
