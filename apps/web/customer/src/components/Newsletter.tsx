import { FormEvent, useState } from "react";
import { subscribeToNewsletter } from "../../lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await subscribeToNewsletter(email.trim());
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2>Stay Fresh with Plantopia</h2>
        <p>
          Get berry recipes, fresh ideas, stories, and Plantopia updates
          delivered to your inbox.
        </p>
        {status === "done" ? (
          <p className="newsletter-success">
            You&apos;re subscribed — thanks for joining us!
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              required
            />
            <button type="submit" className="cta-button" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="form-error">Please enter a valid email and try again.</p>
        )}
      </div>
    </section>
  );
}
