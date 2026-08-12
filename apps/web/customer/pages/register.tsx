import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window === "undefined") return;

    const storedUsers = window.localStorage.getItem("plantopiaUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    if (users.some((user: any) => user.email === email)) {
      setMessage("This email is already registered. Please login.");
      return;
    }

    users.push({ name, email, password });
    window.localStorage.setItem("plantopiaUsers", JSON.stringify(users));
    window.localStorage.setItem(
      "plantopiaCurrentUser",
      JSON.stringify({ name, email }),
    );
    router.push("/orders");
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <section className="auth-page">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p>
            Register now to save billing, track orders, and checkout faster.
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
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
            {message && <p className="form-error">{message}</p>}
            <button type="submit" className="cta-button">
              Register
            </button>
          </form>
          <p>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
