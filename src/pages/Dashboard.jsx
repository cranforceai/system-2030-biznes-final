import React from "react";

export default function Dashboard({ profile }) {
  return (
    <div>
      <h1>Panel główny</h1>
      <p>Witaj {profile?.name || "operatorze"} w System 2030 Biznes.</p>
      <p>Wybierz moduł z lewej strony.</p>
    </div>
  );
}