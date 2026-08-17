import { useState } from "react";
import { FaqItem } from "../../lib/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className={`faq-item${isOpen ? " open" : ""}`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-answer">
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
