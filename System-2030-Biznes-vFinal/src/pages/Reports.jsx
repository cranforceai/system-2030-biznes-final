import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Reports({ profile }) {
  const [reports, setReports] = useState([]);
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const { data, error } = await supabase.from("reports").select("*").order("date", { ascending: false });
    if (!error) {
      setReports(data || []);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase.from("reports").insert({
      date: today,
      godziny: hours,
      komentarz: note,
      status: "nowy",
      author: profile?.name || profile?.email || "nieznany",
    });

    setLoading(false);

    if (!error) {
      setHours("");
      setNote("");
      fetchReports();
    } else {
      alert("Błąd przy dodawaniu raportu: " + error.message);
    }
  }

  return (
    <div>
      <h1>Raporty dzienne</h1>
      <form className="simple-form" onSubmit={handleAdd}>
        <input
          type="number"
          min="0"
          step="0.5"
          placeholder="Godziny pracy"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Komentarz / uwagi"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="primary-btn" disabled={loading}>
          {loading ? "Zapisuję..." : "Dodaj raport"}
        </button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Godziny</th>
            <th>Komentarz</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.godziny}</td>
              <td>{r.komentarz}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}