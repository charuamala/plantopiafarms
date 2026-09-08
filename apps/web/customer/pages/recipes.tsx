import Link from "next/link";
import { recipes } from "../lib/recipes";

export default function RecipesPage() {
  return (
    <main className="page-shell">
      <section className="recipes-hero">
        <h1>Berry Recipes</h1>
        <p className="lead">
          Indian-inspired recipes that put fresh berries at the center — from
          breakfast bowls to festive desserts.
        </p>
      </section>

      <section className="recipes-grid">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="recipe-card"
          >
            <div
              className="recipe-card-image"
              style={{ backgroundImage: `url(${recipe.image})` }}
            />
            <div className="recipe-card-body">
              <span className="recipe-card-category">{recipe.category}</span>
              <h3>{recipe.title}</h3>
              <p>{recipe.excerpt}</p>
              <div className="recipe-card-meta">
                <span>⏱ {recipe.prepTime}</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <style jsx>{`
        .recipes-hero {
          text-align: center;
          padding: 48px 20px 8px;
          max-width: 720px;
          margin: 0 auto;
        }

        .recipes-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .recipes-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .recipes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 48px 0 60px;
        }

        .recipe-card {
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

        .recipe-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(24, 40, 26, 0.12);
        }

        .recipe-card-image {
          height: 180px;
          background-size: cover;
          background-position: center;
        }

        .recipe-card-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .recipe-card-category {
          color: var(--primary-dark);
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .recipe-card-body h3 {
          margin: 0;
          font-size: 1.15rem;
        }

        .recipe-card-body p {
          margin: 0;
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .recipe-card-meta {
          display: flex;
          gap: 14px;
          margin-top: 8px;
          font-size: 0.85rem;
          color: var(--muted);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .recipes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
