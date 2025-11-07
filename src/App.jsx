import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import Users from "./pages/Users.jsx";
import Sites from "./pages/Sites.jsx";
import SystemPage from "./pages/SystemPage.jsx";
import Analysis from "./pages/Analysis.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      setLoading(false);
      if (!data.session && location.pathname !== "/login") {
        navigate("/login");
      } else if (data.session) {
        fetchProfile(data.session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setProfile(null);
        navigate("/login");
      } else {
        fetchProfile(newSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (data) {
      setProfile(data);
    } else if (session?.user?.email) {
      setProfile({ name: session.user.email, role: "operator" });
    }
  }

  if (loading) {
    return <div className="loading-screen">Ładuję…</div>;
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar profile={profile} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard profile={profile} />} />
          <Route path="/raporty" element={<Reports profile={profile} />} />
          <Route path="/operatorzy" element={<Users />} />
          <Route path="/budowy" element={<Sites />} />
          <Route path="/analiza" element={<Analysis />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}