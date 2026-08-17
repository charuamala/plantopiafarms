import FounderCard, { Person } from "./FounderCard";

const founders: Person[] = [
  {
    name: "James Susaimuthu",
    title: "Founder & CEO",
    bio: "Holds a PhD in Plant Sciences and brings 15 years of experience in the field, leading Plantopia Farms with a focus on sustainable horticulture and farm-to-table produce.",
    image: "/images/james-susaimuthu.jpg",
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
          <FounderCard key={p.name} person={p} delay={idx * 120} />
        ))}
      </div>
    </section>
  );
}
