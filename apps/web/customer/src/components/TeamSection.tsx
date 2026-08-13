type Person = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

const founders: Person[] = [
  // Placeholder entry — replace with actual founder details from the HortBio page
  {
    name: "Founder Name",
    title: "Co-founder & CEO",
    bio: "Passionate about sustainable horticulture and farm-to-table produce. Replace this text with the founder's bio from the source site.",
    image: "/logo.svg",
  },
];

export default function TeamSection() {
  return (
    <section className="team-section">
      <div className="section-intro">
        <h2>Founders</h2>
        <p className="muted">Meet the people who started Plantopia Farms.</p>
      </div>

      <div className="team-grid">
        {founders.map((p, idx) => (
          <article
            key={p.name}
            className="team-card"
            style={{ animationDelay: `${idx * 120}ms` }}
          >
            <div className="team-image-wrap">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="team-body">
              <h3>{p.name}</h3>
              <strong>{p.title}</strong>
              <p className="team-bio">{p.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
