import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { berryCatalog, BerryKey, socialLinks } from "../lib/berries";
import { recipes } from "../lib/recipes";
import { stories } from "../lib/stories";
import Newsletter from "../src/components/Newsletter";

const whyBerries = [
  { icon: "🫐", title: "Naturally Nutrient-Dense", body: "Berries are rich in vitamin C, fiber, and antioxidants — real nutrition in every bite, not added later." },
  { icon: "🌿", title: "Low Effort, High Reward", body: "No peeling, no cooking — wash and eat. An easy way to build a healthier plate every day." },
  { icon: "🎉", title: "A Fit for Every Occasion", body: "From breakfast bowls to festival sweets and gifting boxes, berries fit the way India already eats." },
  { icon: "🌍", title: "Grown Close to Home", body: "Grown in Kotagiri and delivered fresh, instead of travelling halfway around the world to reach you." },
];

const whyJams = [
  { icon: "🍯", title: "Real Fruit, Not Just Sugar", body: "Made from our own farm berries in small batches — fruit first, sugar second." },
  { icon: "📦", title: "Berries, All Year Round", body: "Jam captures the harvest at its peak, so you can enjoy berry flavour long after the season ends." },
  { icon: "🎁", title: "Ready to Gift", body: "A jar of handcrafted jam travels well and feels personal — a natural gifting choice for festivals and celebrations." },
  { icon: "🍞", title: "Everyday Versatility", body: "Toast, parathas, desserts, or a spoonful on its own — jam earns its place in the pantry." },
];

const growerReasons = [
  { title: "Commercial Growing", body: "For farmers looking to add a high-value crop, berries offer strong returns on relatively small plots of land." },
  { title: "Hobby & Rooftop Growing", body: "You don't need acres to start — many berry varieties grow well in containers, balconies, and rooftop setups." },
  { title: "Guidance, Not Just Seeds", body: "We share what we've learned growing in Kotagiri's conditions, so new growers don't have to start from zero." },
];

export default function HomePage() {
  const [selectedBerry, setSelectedBerry] = useState<BerryKey | null>(null);
  const router = useRouter();

  return (
    <main className="page-shell">
      {/* Hero — bold brand statement, no pricing/cart */}
      <section
        className="hero hero-single"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(7, 30, 18, 0.6), rgba(14, 62, 32, 0.25)), url(/images/farm-strawberry-field.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content hero-content-wide">
          <p className="eyebrow">Goodness Grows Here</p>
          <h1>Bringing premium berries to India, grown with care.</h1>
          <p>
            Plantopia Farms is on a mission to help India discover fresh
            berries — as a healthier everyday habit, a farming opportunity,
            and a crop worth investing in.
          </p>
          <div className="cta-row">
            <button type="button" onClick={() => router.push("/about")}>
              Our Story
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => router.push("/berries")}
            >
              Explore Berries
            </button>
          </div>
        </div>
      </section>

      {/* Our Story — what inspired us, where & how we grow */}
      <section className="section-intro">
        <div>
          <h2>Our Story</h2>
          <p>
            [Placeholder — replace with your real founding story: what
            inspired growing berries in India, and why Kotagiri.] Berries
            are barely grown in India today, despite ideal conditions in
            our highlands. We started Plantopia Farms to change that —
            bringing a crop we believe in to the people we believe will
            love it.
          </p>
        </div>
      </section>

      <section className="farm-story">
        <div className="farm-story-content">
          <h2>Where &amp; How We Grow</h2>
          <p>
            Our farm sits in the cool highlands of Kotagiri, a climate
            naturally suited to berries. We grow with sustainable
            practices — minimal synthetic inputs, careful soil health, and
            hands-on care through every stage of the season.
          </p>
          <button type="button" className="secondary" onClick={() => router.push("/farm")}>
            See Our Farm
          </button>
        </div>
        <div className="farm-story-image" style={{ backgroundImage: "url(/images/farm-growing-care.jpg)" }} />
      </section>

      <section className="vision-statement">
        <p className="vision-eyebrow">Our Vision</p>
        <h2>A future where fresh berries are simply part of how India eats.</h2>
      </section>

      {/* Why Berries */}
      <section className="section-intro">
        <div>
          <h2>Why Berries</h2>
          <p>Small fruit, real benefits — here's why berries belong in your everyday diet.</p>
        </div>
      </section>

      <section className="why-grid">
        {whyBerries.map((card) => (
          <div key={card.title} className="why-card">
            <div className="why-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </section>

      {/* Kinds of berries — informational, no shop/cart */}
      <section className="section-intro">
        <div>
          <h2>Berries We Grow</h2>
          <p>Strawberries, blueberries, blackberries, and raspberries — each with its own character.</p>
        </div>
      </section>

      <section className="category-grid">
        {Object.entries(berryCatalog).map(([key, berry]) => (
          <div
            key={key}
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.22)), url(${berry.image})`,
            }}
          >
            <strong>{berry.name}</strong>
            <p>{berry.short}</p>
            <div className="category-actions">
              <button type="button" onClick={() => setSelectedBerry(key as BerryKey)}>
                Quick view
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => router.push(`/berry/${key}`)}
              >
                Learn more
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Why Jams */}
      <section className="section-intro">
        <div>
          <h2>Why Our Jams</h2>
          <p>The same farm berries, made to last — real fruit, small batches, no shortcuts.</p>
        </div>
      </section>

      <section className="why-grid">
        {whyJams.map((card) => (
          <div key={card.title} className="why-card">
            <div className="why-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </section>

      {/* How to use berries: recipes, festivals, gifts */}
      <section className="section-intro">
        <div>
          <h2>How to Enjoy Berries</h2>
          <p>
            Indian-inspired recipes, festival-season sweets, and gifting
            ideas that put fresh berries at the center.
          </p>
        </div>
      </section>

      <section className="home-preview-grid">
        {recipes.slice(0, 3).map((recipe) => (
          <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="home-preview-card">
            <div className="home-preview-image" style={{ backgroundImage: `url(${recipe.image})` }} />
            <div className="home-preview-body">
              <span>{recipe.category}</span>
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </section>
      <div className="home-preview-more">
        <Link href="/recipes">See all recipes →</Link>
      </div>

      {/* Easy purchasing — informational only, no cart widgets on homepage */}
      <section className="farm-story">
        <div className="farm-story-content">
          <h2>Easy to Order, However You Shop</h2>
          <p>
            Order online in a few clicks for home delivery, or pick up
            Plantopia berries and jams at a store near you.
          </p>
          <div className="cta-row">
            <button type="button" onClick={() => router.push("/how-to-buy")}>
              How to Buy
            </button>
            <button type="button" className="secondary" onClick={() => router.push("/where-to-buy")}>
              Find a Store
            </button>
          </div>
        </div>
        <div className="farm-story-image" style={{ backgroundImage: "url(/images/farm-harvest.jpg)" }} />
      </section>

      <Newsletter />

      {/* Stories preview */}
      <section className="section-intro">
        <div>
          <h2>Stories from Plantopia</h2>
          <p>Farm stories, grower spotlights, and a look behind the harvest.</p>
        </div>
      </section>

      <section className="home-preview-grid">
        {stories.slice(0, 3).map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}`} className="home-preview-card">
            <div className="home-preview-image" style={{ backgroundImage: `url(${story.image})` }} />
            <div className="home-preview-body">
              <span>{story.category}</span>
              <h3>{story.title}</h3>
            </div>
          </Link>
        ))}
      </section>
      <div className="home-preview-more">
        <Link href="/stories">See all stories →</Link>
      </div>

      {/* Grow with us */}
      <section className="section-intro">
        <div>
          <h2>Why Grow Berries?</h2>
          <p>Commercial farmer or rooftop hobbyist — there's a place to start.</p>
        </div>
      </section>

      <section className="biz-sections">
        {growerReasons.map((reason) => (
          <div key={reason.title} className="biz-section-card">
            <h3>{reason.title}</h3>
            <p>{reason.body}</p>
          </div>
        ))}
      </section>

      <div className="home-preview-more">
        <Link href="/growers">Learn about growing with Plantopia →</Link>
      </div>

      {/* Bold vision & scale statement */}
      <section className="scale-statement">
        <p className="scale-eyebrow">Our Vision &amp; Scale</p>
        <h2>Building India&apos;s berry category — from one farm to a national habit.</h2>
        <p className="scale-note">
          [Placeholder — replace with your real scale ambitions and
          milestones once approved for public sharing.]
        </p>
        <Link href="/investors" className="scale-cta">
          For Investors →
        </Link>
      </section>

      {/* Business strip */}
      <section className="business-strip">
        <div>
          <h2>Partner With Plantopia</h2>
          <p>Growers, wholesale buyers, and investors — every partnership starts with a conversation.</p>
        </div>
        <div className="business-strip-links">
          <Link href="/growers" className="secondary">Growers</Link>
          <Link href="/business" className="secondary">Wholesale &amp; Distributors</Link>
          <Link href="/investors" className="secondary">Investors</Link>
        </div>
      </section>

      {/* Reach us */}
      <section className="section-intro">
        <div>
          <h2>Get in Touch</h2>
          <p>Questions, partnerships, or just want to say hello — we'd love to hear from you.</p>
        </div>
      </section>

      <div className="home-preview-more">
        <Link href="/contact">Contact Us →</Link>
      </div>

      <section className="share-row">
        <p>Share Plantopia Farms with friends:</p>
        <div className="share-buttons">
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={socialLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </section>

      {selectedBerry && (
        <div className="modal-backdrop" onClick={() => setSelectedBerry(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBerry(null)}>
              ✕
            </button>
            <img src={berryCatalog[selectedBerry].image} alt={berryCatalog[selectedBerry].name} />
            <div className="modal-content">
              <div className="berry-badge">{berryCatalog[selectedBerry].name}</div>
              <h3>{berryCatalog[selectedBerry].short}</h3>
              <p>{berryCatalog[selectedBerry].description}</p>
              <ul>
                {berryCatalog[selectedBerry].benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    router.push(`/berry/${selectedBerry}`);
                    setSelectedBerry(null);
                  }}
                >
                  Learn more about {berryCatalog[selectedBerry].name.toLowerCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
