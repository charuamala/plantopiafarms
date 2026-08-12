import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "admin@plantopia.com" && password === "Plantopia123") {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("plantopiaAdminSession", "active");
      }
      router.push("/");
      return;
    }
    setError(
      "Invalid admin credentials. Use admin@plantopia.com / Plantopia123.",
    );
  };

  return (
    <main className="page-shell">
      <section className="auth-page">
        <div className="auth-card">
          <h1>Admin login</h1>
          <p>Enter the admin credentials to manage orders and view reports.</p>
          <form onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="cta-button">
              Login
            </button>
          </form>
          <p>Admin user: admin@plantopia.com | Password: Plantopia123</p>
        </div>
      </section>
    </main>
  );
}
