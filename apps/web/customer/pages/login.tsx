import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentUser = window.localStorage.getItem("plantopiaCurrentUser");
    if (currentUser) router.push("/");
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window === "undefined") return;

    const storedUsers = window.localStorage.getItem("plantopiaUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find(
      (item: any) => item.email === email && item.password === password,
    );

    if (!user) {
      setError(
        "Invalid email or password. Register first if you don't have an account.",
      );
      return;
    }

    window.localStorage.setItem(
      "plantopiaCurrentUser",
      JSON.stringify({ email: user.email, name: user.name }),
    );
    router.push("/orders");
  };

  return (
    <main className="page-shell">
      <section className="auth-page">
        <div className="auth-card">
          <h1>Sign in</h1>
          <p>
            Use your account to view orders, checkout faster, and save shipping
            details.
          </p>
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
          <p>
            New to Plantopia? <Link href="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
