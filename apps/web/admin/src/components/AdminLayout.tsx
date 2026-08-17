import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { clearToken } from "../../lib/api";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <main className="page-shell admin-shell">
      <header className="topbar admin-topbar">
        <div className="brand">Plantopia Admin</div>
        {!isLoginPage && (
          <nav className="nav admin-nav">
            <Link href="/">Dashboard</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/reports">Reports</Link>
            <Link href="/products">Products</Link>
            <button className="secondary" type="button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </header>
      {children}
    </main>
  );
}
