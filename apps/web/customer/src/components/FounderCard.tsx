import { useReveal } from "../../lib/useReveal";

export type Person = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

export default function FounderCard({
  person,
  delay = 0,
}: {
  person: Person;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className={`team-card reveal${visible ? " reveal-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="team-image-wrap">
        <img src={person.image} alt={person.name} />
      </div>
      <div className="team-body">
        <h3>{person.name}</h3>
        <strong>{person.title}</strong>
        <p className="team-bio">{person.bio}</p>
      </div>
    </article>
  );
}
