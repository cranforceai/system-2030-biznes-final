import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Sidebar({ profile }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="logo-block">
        <div className="logo-infinity">∞</div>
        <div className="logo-text">
          <div className="logo-title">SYSTEM 2030</div>
          <div className="logo-sub">biznes</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink end to="/" className="nav-item">
          Dashboard
        </NavLink>
        <NavLink to="/raporty" className="nav-item">
          Raporty
        </NavLink>
        <NavLink to="/operatorzy" className="nav-item">
          Operatorzy
        </NavLink>
        <NavLink to="/budowy" className="nav-item">
          Budowy
        </NavLink>
        <NavLink to="/analiza" className="nav-item">
          Analiza AI
        </NavLink>
        <NavLink to="/system" className="nav-item">
          System
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-box">
          <div className="user-name">{profile?.name || "Użytkownik"}</div>
          <div className="user-role">{profile?.role || "operator"}</div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Wyloguj
        </button>
      </div>
    </aside>
  );
}