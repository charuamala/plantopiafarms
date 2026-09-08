import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey, socialLinks } from "../lib/berries";
import { fetchProducts, Product } from "../lib/api";
import { addToCart } from "../lib/cart";
import { recipes } from "../lib/recipes";
import { stories } from "../lib/stories";
import { stores } from "../lib/stores";
import Newsletter from "../src/components/Newsletter";

const bannerOrder: BerryKey[] = [
  "strawberry",
  "blueberry",
  "blackberry",
  "raspberry",
];

const offerCards = [
  {
    title: "Strawberry Summer Set",
    subtitle: "Sweet strawberry bundles for smoothies, jams, and snacks.",
    label: "Best seller",
    button: "Shop strawberries",
    image: berryCatalog.strawberry.image,
    link: "/shop?berry=strawberry",
  },
  {
    title: "Blueberry Antioxidant Pack",
    subtitle: "Deep purple blueberries for bowls, baking, and brain boosting.",
    label: "New arrival",
    button: "Shop blueberries",
    image: berryCatalog.blueberry.image,
    link: "/shop?berry=blueberry",
  },
  {
    title: "Blackberry Dessert Duo",
    subtitle: "Bold blackberries for rich desserts, cocktails, and treats.",
    label: "Limited time",
    button: "Shop blackberries",
    image: berryCatalog.blackberry.image,
    link: "/shop?berry=blackberry",
  },
  {
    title: "Raspberry Refresh Set",
    subtitle: "Tangy raspberries for bright bowls, salads, and snacks.",
    label: "Seasonal offer",
    button: "Shop raspberries",
    image: berryCatalog.raspberry.image,
    link: "/shop?berry=raspberry",
  },
];

const whyCards = [
  { icon: "🌱", title: "Freshness", body: "Harvested early, cooled fast, and moved through a short cold chain." },
  { icon: "✅", title: "Quality", body: "Every berry hand-checked before it's packed for delivery." },
  { icon: "🚜", title: "Farm Care", body: "Grown with minimal synthetic inputs on our own farm in Kotagiri." },
  { icon: "🤝", title: "Trusted Sourcing", body: "Direct from farm to you, with no long, unclear supply chain." },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedBerry, setSelectedBerry] = useState<BerryKey | null>(null);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % bannerOrder.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const activeBerry = bannerOrder[activeSlide];
  const slideInfo = berryCatalog[activeBerry];

  useEffect(() => {
    let cancelled = false;
    fetchProducts({ category: activeBerry, sort: "featured", limit: 1 })
      .then((result) => {
        if (!cancelled) setFeaturedProduct(result.products[0] ?? null);
      })
      .catch(() => {
        if (!cancelled) setFeaturedProduct(null);
      });
    return () => {
      cancelled = true;
    };
  }, [activeBerry]);

  const handleQuickAdd = () => {
    if (featuredProduct) addToCart(featuredProduct.id, 1);
  };

  return (
    <main className="page-shell">
      {/* Hero — existing approved banner, unchanged */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 30, 18, 0.55), rgba(14, 62, 32, 0.18)), url(${slideInfo.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content">
          <p className="eyebrow">Fresh from our farm</p>
          <h1>Premium berries delivered to your table.</h1>
          <p>
            Natural sweetness, farm-fresh quality, and healthy berry goodness
            for every day.
          </p>
          <div className="cta-row">
            <button type="button" onClick={() => router.push("/shop")}>
              Shop Now
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => router.push("/about")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="berry-badge">Featured</div>
          <h3>{featuredProduct?.name ?? slideInfo.name}</h3>
          <p>{featuredProduct?.shortDescription ?? slideInfo.short}</p>
          <strong>
            {featuredProduct
              ? `₹${featuredProduct.salePrice ?? featuredProduct.price} / ${featuredProduct.weight}`
              : slideInfo.price}
          </strong>
          <div className="hero-card-actions">
            <button
              type="button"
              className="cta-button"
              onClick={() => setSelectedBerry(activeBerry)}
            >
              Quick view
            </button>
            {featuredProduct && (
              <button type="button" className="secondary" onClick={handleQuickAdd}>
                Add to cart
              </button>
            )}
          </div>
        </div>

        <div className="hero-dots" aria-label="banner slider dots">
          {bannerOrder.map((berry, index) => (
            <button
              key={berry}
              type="button"
              className={index === activeSlide ? "dot active" : "dot"}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to ${berry}`}
            />
          ))}
        </div>
      </section>

      {/* Discover Plantopia Berries */}
      <section className="section-intro">
        <div>
          <h2>Discover Plantopia Berries</h2>
          <p>
            Fresh, wholesome berries grown with care in Kotagiri — naturally
            sweet, carefully harvested, and delivered close to peak
            ripeness. Berries come first here; shopping is just the last
            step.
          </p>
        </div>
      </section>

      {/* Berry varieties */}
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
                onClick={() => router.push(`/shop?berry=${key}`)}
              >
                Shop now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* How to Buy preview */}
      <section className="farm-story">
        <div className="farm-story-content">
          <h2>How to Buy Plantopia Berries</h2>
          <p>
            Order online for home delivery, find us at a store near you, or
            reach out for wholesale quantities — see the full guide for every
            option, step by step.
          </p>
          <button type="button" className="secondary" onClick={() => router.push("/how-to-buy")}>
            How to Buy
          </button>
        </div>
        <div className="farm-story-image" style={{ backgroundImage: "url(/images/farm-harvest.jpg)" }} />
      </section>

      {/* Why Plantopia + farm story */}
      <section className="section-intro">
        <div>
          <h2>Why Plantopia</h2>
          <p>Grown on our sustainable farm in Kotagiri, harvested at peak ripeness and delivered within 24 hours.</p>
        </div>
      </section>

      <section className="why-grid">
        {whyCards.map((card) => (
          <div key={card.title} className="why-card">
            <div className="why-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </section>

      <section className="farm-story">
        <div className="farm-story-content">
          <h2>How to Enjoy Fresh Berries</h2>
          <p>
            A little care after delivery keeps berries sweet and firm for
            longer — how to wash, store, refrigerate, and freeze them
            properly.
          </p>
          <button type="button" className="secondary" onClick={() => router.push("/berry-care")}>
            Berry Care Guide
          </button>
        </div>
        <div className="farm-story-image" style={{ backgroundImage: "url(/images/farm-growing-care.jpg)" }} />
      </section>

      {/* Featured products */}
      <section className="section-intro">
        <div>
          <h2>Featured Products</h2>
          <p>
            Discover our fresh strawberry, blueberry, blackberry, and
            raspberry packs, with product detail pages and easy checkout.
          </p>
        </div>
      </section>

      <section className="offer-grid">
        {offerCards.map((offer) => (
          <div key={offer.title} className="offer-card">
            <div className="offer-image" style={{ backgroundImage: `url(${offer.image})` }} />
            <div className="offer-copy">
              <span className="offer-chip">{offer.label}</span>
              <h2>{offer.title}</h2>
              <p>{offer.subtitle}</p>
              <button type="button" onClick={() => router.push(offer.link)}>
                {offer.button}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Recipes preview */}
      <section className="section-intro">
        <div>
          <h2>Berry Recipes</h2>
          <p>Indian-inspired recipes that put fresh berries at the center.</p>
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

      {/* Business strip */}
      <section className="business-strip">
        <div>
          <h2>Growing, Wholesale &amp; Investment</h2>
          <p>Beyond retail — partner with Plantopia as a grower, business, or investor.</p>
        </div>
        <div className="business-strip-links">
          <Link href="/growers" className="secondary">Growers</Link>
          <Link href="/business" className="secondary">Wholesale &amp; Distributors</Link>
          <Link href="/investors" className="secondary">Investors</Link>
        </div>
      </section>

      <Newsletter />

      {/* Where to buy */}
      <section className="section-intro">
        <div>
          <h2>Where to Buy</h2>
          <p>Find Plantopia berries at a store near you.</p>
        </div>
      </section>

      <section className="home-store-grid">
        {stores.slice(0, 3).map((store) => (
          <div key={store.name} className="home-store-card">
            <h3>{store.name}</h3>
            <p>{store.city}</p>
          </div>
        ))}
      </section>
      <div className="home-preview-more">
        <Link href="/where-to-buy">View all stores →</Link>
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
                <strong>{berryCatalog[selectedBerry].price}</strong>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    router.push(`/shop?berry=${selectedBerry}`);
                    setSelectedBerry(null);
                  }}
                >
                  Shop {berryCatalog[selectedBerry].name.toLowerCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
