import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.session) {
      setInfo("Zalogowano.");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setInfo("Konto utworzone. Sprawdź e-mail, jeśli Supabase wymaga potwierdzenia.");
    }
  }

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>System 2030 Biznes</h1>
        <p>Zaloguj się swoim e-mailem i hasłem.</p>
        <input
          type="email"
          placeholder="twoj@mail.pl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button className="primary-btn" type="submit">
          Zaloguj
        </button>
        <button className="secondary-btn" onClick={handleRegister} style={{ marginTop: "0.5rem" }}>
          Zarejestruj
        </button>
        {info && <p className="info">{info}</p>}
        {error && <p className="error">{error}</p>}
        <p className="copyright">© 2025 SYSTEM 2030 BIZNES</p>
      </form>
    </div>
  );
}