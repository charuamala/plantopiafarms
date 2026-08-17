import Link from "next/link";
import { BlogPost } from "../../lib/blog";
import { useReveal } from "../../lib/useReveal";

export default function BlogCard({
  post,
  delay = 0,
}: {
  post: BlogPost;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/blog/${post.slug}`}
      className={`blog-card reveal${visible ? " reveal-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="blog-card-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="blog-card-body">
        <span className="blog-card-category">{post.category}</span>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="blog-card-date">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
