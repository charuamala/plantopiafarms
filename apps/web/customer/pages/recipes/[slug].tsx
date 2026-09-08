import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { recipes, Recipe } from "../../lib/recipes";
import SocialShare from "../../src/components/SocialShare";

export default function RecipeDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    const key = Array.isArray(slug) ? slug[0] : slug;
    setRecipe(recipes.find((r) => r.slug === key) ?? null);
  }, [slug]);

  if (recipe === undefined) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading recipe…</p>
        </section>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Recipe not found</h1>
          <button type="button" onClick={() => router.push("/recipes")}>
            Back to recipes
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page-shell">
      <div className="detail-card recipe-detail-card">
        <button type="button" className="back-button" onClick={() => router.back()}>
          ← Back
        </button>

        <span className="recipe-detail-category">
          {recipe.category} · {recipe.berry}
        </span>
        <h1>{recipe.title}</h1>
        <p className="recipe-detail-excerpt">{recipe.excerpt}</p>

        <div className="recipe-detail-meta">
          <div>
            <strong>{recipe.prepTime}</strong>
            <span>Prep time</span>
          </div>
          <div>
            <strong>{recipe.difficulty}</strong>
            <span>Difficulty</span>
          </div>
          <div>
            <strong>{recipe.servings}</strong>
            <span>Serves</span>
          </div>
        </div>

        <div
          className="recipe-detail-image"
          style={{ backgroundImage: `url(${recipe.image})` }}
        />

        <div className="recipe-detail-columns">
          <div>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Method</h2>
            <ol>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare title={recipe.title} />
        </div>

        <div className="recipe-detail-more">
          <Link href="/recipes">← More berry recipes</Link>
        </div>
      </div>

      <style jsx>{`
        .recipe-detail-category {
          color: var(--primary-dark);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .recipe-detail-card h1 {
          margin: 8px 0 10px;
        }

        .recipe-detail-excerpt {
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .recipe-detail-meta {
          display: flex;
          gap: 32px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(24, 40, 26, 0.08);
        }

        .recipe-detail-meta div {
          display: flex;
          flex-direction: column;
        }

        .recipe-detail-meta strong {
          font-size: 1.05rem;
        }

        .recipe-detail-meta span {
          color: var(--muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .recipe-detail-image {
          height: 320px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
          margin-bottom: 28px;
        }

        .recipe-detail-columns {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
        }

        .recipe-detail-columns h2 {
          font-size: 1.15rem;
          margin: 0 0 14px;
        }

        .recipe-detail-columns ul,
        .recipe-detail-columns ol {
          margin: 0;
          padding-left: 20px;
          color: var(--text);
          line-height: 1.9;
        }

        .recipe-detail-more {
          margin-top: 28px;
        }

        .recipe-detail-more :global(a) {
          font-weight: 700;
          color: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .recipe-detail-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
