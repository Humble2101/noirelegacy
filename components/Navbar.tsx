"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut, Shield, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Models", href: "/models" },
  { label: "Scout", href: "/scout" },
  { label: "Business", href: "/business" },
  { label: "Gallery", href: "/gallery" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#C9A84C]/20 py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-playfair text-xl font-black tracking-[0.3em] text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors duration-300 uppercase">
              Noire Legacy
            </span>
            <span className="text-[#C9A84C] text-[0.55rem] tracking-[0.5em] uppercase font-cormorant font-light">
              Magazine
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "nav-link font-cormorant text-sm tracking-[0.2em] uppercase transition-colors duration-300",
                    pathname === link.href
                      ? "text-[#C9A84C]"
                      : "text-[#F5F0E8]/80 hover:text-[#F5F0E8]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth area */}
          <div className="hidden lg:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-20 h-8 bg-[#2A2A2A] animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-[#C9A84C]/40 px-4 py-2 hover:border-[#C9A84C] transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                    <User size={12} className="text-[#C9A84C]" />
                  </div>
                  <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#F5F0E8] max-w-[100px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                  <ChevronDown size={12} className="text-[#C9A84C]" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#0A0A0A] border border-[#2A2A2A] shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-[#2A2A2A]">
                      <p className="font-cormorant text-[#F5F0E8] text-sm truncate">{session.user.name}</p>
                      <p className="font-cormorant text-[#888880] text-xs truncate">{session.user.email}</p>
                      {session.user.role === "ADMIN" && (
                        <span className="inline-block mt-1 text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase border border-[#C9A84C]/40 px-2 py-0.5">
                          Admin
                        </span>
                      )}
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 font-cormorant text-sm text-[#F5F0E8]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors"
                    >
                      <User size={14} /> My Profile
                    </Link>
                    {session.user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 font-cormorant text-sm text-[#F5F0E8]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors"
                      >
                        <Shield size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 font-cormorant text-sm text-[#F5F0E8]/80 hover:text-[#6B1A2A] hover:bg-[#6B1A2A]/10 transition-colors border-t border-[#2A2A2A]"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="font-cormorant text-xs tracking-[0.25em] uppercase text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="border border-[#C9A84C] text-[#C9A84C] font-cormorant text-xs tracking-[0.25em] uppercase px-5 py-2 hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 z-[999] bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 lg:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-7 mb-10">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              className={clsx(
                "transition-all duration-500",
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Link
                href={link.href}
                className={clsx(
                  "font-playfair text-3xl tracking-wider transition-colors duration-300",
                  pathname === link.href ? "text-[#C9A84C]" : "text-[#F5F0E8]/80 hover:text-[#C9A84C]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="gold-divider w-20 mb-6" />
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <Link href="/profile" className="font-cormorant text-[#F5F0E8]/80 tracking-[0.3em] uppercase text-sm">
              My Profile
            </Link>
            {session.user.role === "ADMIN" && (
              <Link href="/admin" className="font-cormorant text-[#C9A84C] tracking-[0.3em] uppercase text-sm">
                Admin Dashboard
              </Link>
            )}
            <button onClick={handleSignOut} className="font-cormorant text-[#888880] tracking-[0.3em] uppercase text-sm">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-6">
            <Link href="/login" className="font-cormorant text-[#F5F0E8]/70 tracking-[0.3em] uppercase text-sm">
              Sign In
            </Link>
            <Link href="/register" className="font-cormorant text-[#C9A84C] tracking-[0.3em] uppercase text-sm">
              Join Now
            </Link>
          </div>
        )}
      </div>

      {/* Close dropdown on outside click */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-[999]" onClick={() => setDropdownOpen(false)} />
      )}
    </>
  );
}
