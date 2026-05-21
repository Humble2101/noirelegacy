"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users, Shield, Trash2, RefreshCw, Crown, UserCheck,
  TrendingUp, Eye, Search, ChevronDown
} from "lucide-react";
import clsx from "clsx";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  profile: {
    bio: string | null;
    location: string | null;
    experienceLevel: string | null;
    categories: string | null;
    applicationStatus: string;
  } | null;
};

const statCards = (users: User[]) => [
  { label: "Total Members", value: users.length, icon: Users, color: "#C9A84C" },
  { label: "Admins", value: users.filter((u) => u.role === "ADMIN").length, icon: Shield, color: "#6B1A2A" },
  { label: "Regular Users", value: users.filter((u) => u.role === "USER").length, icon: UserCheck, color: "#888880" },
  { label: "This Month", value: users.filter((u) => {
    const d = new Date(u.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length, icon: TrendingUp, color: "#C9A84C" },
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "ADMIN">("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session.user.role !== "ADMIN") router.push("/profile");
  }, [status, session, router]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") fetchUsers();
  }, [status, session, fetchUsers]);

  const handleRoleChange = async (userId: string, role: "USER" | "ADMIN") => {
    setActionLoading(userId);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
      showToast(`Role updated to ${role}`);
    } else {
      showToast("Failed to update role", "error");
    }
    setActionLoading(null);
  };

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setActionLoading(userId);
    const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showToast("User deleted.");
      if (selectedUser?.id === userId) setSelectedUser(null);
    } else {
      showToast("Failed to delete user", "error");
    }
    setActionLoading(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch = !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-4" />
          <p className="font-cormorant text-[#888880] tracking-[0.3em] uppercase text-sm">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Toast */}
        {toast && (
          <div className={`fixed top-24 right-6 z-[2000] border px-6 py-3 font-cormorant text-sm tracking-wide shadow-xl transition-all ${
            toast.type === "success"
              ? "border-[#C9A84C]/60 bg-[#C9A84C]/10 text-[#C9A84C]"
              : "border-[#6B1A2A]/60 bg-[#6B1A2A]/10 text-[#F5F0E8]"
          }`}>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3">
              Administration
            </p>
            <h1 className="font-playfair text-5xl font-black text-[#F5F0E8]">
              Admin Dashboard
            </h1>
            <div className="gold-divider max-w-xs mt-4" />
          </div>
          <button onClick={fetchUsers}
            className="flex items-center gap-2 border border-[#2A2A2A] px-4 py-2 text-[#888880] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all font-cormorant text-xs tracking-[0.3em] uppercase">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards(users).map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="border border-[#2A2A2A] p-6 bg-[#0d0d0d] hover:border-[#C9A84C]/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <Icon size={20} style={{ color }} />
                <span className="font-playfair text-3xl font-black text-[#F5F0E8]">{value}</span>
              </div>
              <p className="font-cormorant text-[#888880] text-sm tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="border border-[#2A2A2A] bg-[#0d0d0d]">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-6 border-b border-[#2A2A2A]">
            <h2 className="font-playfair text-xl text-[#F5F0E8]">
              All Members <span className="text-[#888880] text-base font-normal">({filtered.length})</span>
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888880]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members..."
                  className="form-input pl-9 text-sm py-2 w-full sm:w-52"
                />
              </div>
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as "ALL" | "USER" | "ADMIN")}
                  className="form-input text-sm py-2 pr-8 appearance-none cursor-pointer"
                >
                  <option value="ALL">All Roles</option>
                  <option value="USER">Users</option>
                  <option value="ADMIN">Admins</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888880] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  {["Member", "Role", "Location", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 font-cormorant text-xs tracking-[0.4em] uppercase text-[#888880]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center font-cormorant text-[#888880] text-lg">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id}
                      className="border-b border-[#1a1a1a] hover:bg-[#C9A84C]/3 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 border border-[#2A2A2A] bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                            {user.role === "ADMIN"
                              ? <Crown size={14} className="text-[#C9A84C]" />
                              : <span className="font-playfair text-sm text-[#888880] font-bold">
                                  {(user.name || user.email)[0].toUpperCase()}
                                </span>
                            }
                          </div>
                          <div>
                            <p className="font-cormorant text-[#F5F0E8] text-base">{user.name || "—"}</p>
                            <p className="font-cormorant text-[#888880] text-sm">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "font-cormorant text-xs tracking-[0.3em] uppercase px-3 py-1 border",
                          user.role === "ADMIN"
                            ? "border-[#C9A84C]/60 text-[#C9A84C] bg-[#C9A84C]/10"
                            : "border-[#2A2A2A] text-[#888880]"
                        )}>
                          {user.role === "ADMIN" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-cormorant text-[#888880] text-sm">
                          {user.profile?.location || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-cormorant text-[#888880] text-sm">
                          {new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                            className="p-2 border border-[#2A2A2A] text-[#888880] hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          {user.id !== session?.user?.id && (
                            <>
                              <button
                                onClick={() => handleRoleChange(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")}
                                disabled={actionLoading === user.id}
                                className="p-2 border border-[#2A2A2A] text-[#888880] hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all disabled:opacity-40"
                                title={user.role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
                              >
                                {user.role === "ADMIN" ? <UserCheck size={14} /> : <Crown size={14} />}
                              </button>
                              <button
                                onClick={() => handleDelete(user.id, user.name || user.email)}
                                disabled={actionLoading === user.id}
                                className="p-2 border border-[#2A2A2A] text-[#888880] hover:border-[#6B1A2A]/50 hover:text-[#6B1A2A] transition-all disabled:opacity-40"
                                title="Delete User"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                          {user.id === session?.user?.id && (
                            <span className="font-cormorant text-[#888880] text-xs italic">You</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Detail Panel */}
        {selectedUser && (
          <div className="mt-6 border border-[#C9A84C]/30 bg-[#0d0d0d] p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-playfair text-2xl text-[#F5F0E8]">{selectedUser.name || "No name"}</h3>
                <p className="font-cormorant text-[#888880]">{selectedUser.email}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-[#888880] hover:text-[#C9A84C] font-cormorant text-xs tracking-[0.3em] uppercase">
                Close ✕
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Role", value: selectedUser.role },
                { label: "Location", value: selectedUser.profile?.location || "—" },
                { label: "Experience", value: selectedUser.profile?.experienceLevel || "—" },
                { label: "Categories", value: selectedUser.profile?.categories || "—" },
                { label: "Member Since", value: new Date(selectedUser.createdAt).toLocaleDateString() },
                { label: "Application", value: selectedUser.profile?.applicationStatus || "none" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-1">{label}</p>
                  <p className="font-cormorant text-[#F5F0E8] text-base capitalize">{value}</p>
                </div>
              ))}
            </div>
            {selectedUser.profile?.bio && (
              <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                <p className="font-cormorant text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-2">Bio</p>
                <p className="font-cormorant text-[#F5F0E8]/70 text-base leading-relaxed">{selectedUser.profile.bio}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
