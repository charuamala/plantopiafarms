import Link from "next/link";
import { stories } from "../lib/stories";

export default function StoriesPage() {
  return (
    <main className="page-shell">
      <section className="stories-hero">
        <h1>Stories from Plantopia</h1>
        <p className="lead">
          Farm stories, grower spotlights, and a look behind how your berries
          are grown.
        </p>
      </section>

      <section className="stories-grid">
        {stories.map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}`} className="story-card">
            <div
              className="story-card-image"
              style={{ backgroundImage: `url(${story.image})` }}
            />
            <div className="story-card-body">
              <span className="story-card-category">{story.category}</span>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>

      <style jsx>{`
        .stories-hero {
          text-align: center;
          padding: 48px 20px 8px;
          max-width: 720px;
          margin: 0 auto;
        }

        .stories-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .stories-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 48px 0 60px;
        }

        .story-card {
          display: flex;
          flex-direction: column;
          background: var(--card);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          text-decoration: none;
          color: var(--text);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(24, 40, 26, 0.12);
        }

        .story-card-image {
          height: 200px;
          background-size: cover;
          background-position: center;
        }

        .story-card-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .story-card-category {
          color: var(--primary-dark);
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .story-card-body h3 {
          margin: 0;
          font-size: 1.15rem;
        }

        .story-card-body p {
          margin: 0;
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .stories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
