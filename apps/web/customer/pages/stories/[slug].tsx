import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { stories, Story } from "../../lib/stories";
import SocialShare from "../../src/components/SocialShare";

export default function StoryDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [story, setStory] = useState<Story | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    const key = Array.isArray(slug) ? slug[0] : slug;
    setStory(stories.find((s) => s.slug === key) ?? null);
  }, [slug]);

  if (story === undefined) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading story…</p>
        </section>
      </main>
    );
  }

  if (!story) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Story not found</h1>
          <button type="button" onClick={() => router.push("/stories")}>
            Back to stories
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page-shell">
      <div className="detail-card">
        <button type="button" className="back-button" onClick={() => router.back()}>
          ← Back
        </button>

        <span className="blog-card-category">{story.category}</span>
        <h1>{story.title}</h1>

        <div className="blog-post-image-wrap">
          <img src={story.image} alt={story.title} />
        </div>

        <div className="blog-post-body">
          {story.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare title={story.title} />
        </div>

        <div className="blog-post-more">
          <Link href="/stories">← More stories</Link>
        </div>
      </div>
    </main>
  );
}
