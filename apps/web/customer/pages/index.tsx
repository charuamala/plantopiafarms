import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey, socialLinks } from "../lib/berries";
import { fetchProducts, Product } from "../lib/api";
import { addToCart } from "../lib/cart";

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

      <section className="offer-grid">
        {offerCards.map((offer) => (
          <div key={offer.title} className="offer-card">
            <div
              className="offer-image"
              style={{ backgroundImage: `url(${offer.image})` }}
            />
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

      <section className="section-intro">
        <div>
          <h2>Berry favorites</h2>
          <p>
            Discover our fresh strawberry, blueberry, blackberry, and raspberry
            packs, with product detail pages and easy checkout.
          </p>
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
              <button
                type="button"
                onClick={() => setSelectedBerry(key as BerryKey)}
              >
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

      <section className="share-row">
        <p>Share Plantopia Farms with friends:</p>
        <div className="share-buttons">
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>

      {selectedBerry && (
        <div className="modal-backdrop" onClick={() => setSelectedBerry(null)}>
          <div
            className="modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedBerry(null)}
            >
              ✕
            </button>
            <img
              src={berryCatalog[selectedBerry].image}
              alt={berryCatalog[selectedBerry].name}
            />
            <div className="modal-content">
              <div className="berry-badge">
                {berryCatalog[selectedBerry].name}
              </div>
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
