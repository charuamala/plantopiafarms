import { FormEvent, useState } from "react";
import { EnquiryType, submitEnquiry } from "../../lib/api";

type Props = {
  type: EnquiryType;
  companyLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

export default function EnquiryForm({
  type,
  companyLabel = "Company / Farm name",
  messageLabel = "Tell us more",
  messagePlaceholder = "Share a few details about your enquiry...",
}: Props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name || !values.email) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitEnquiry({ type, ...values });
      setStatus("sent");
      setValues({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="enquiry-form-success">
        <h3>Thank you — we&apos;ve received your enquiry.</h3>
        <p>Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form className="checkout-form enquiry-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Full name
          <input
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone (optional)
          <input
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </label>
        <label>
          {companyLabel}
          <input
            value={values.company}
            onChange={(e) => setValues({ ...values, company: e.target.value })}
          />
        </label>
      </div>
      <label>
        {messageLabel}
        <textarea
          rows={4}
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
      </label>
      {status === "error" && (
        <p className="form-error">
          Please fill in your name and email, then try again.
        </p>
      )}
      <button type="submit" className="cta-button" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
