'use client'

import { useState } from "react";

export default function Input() {
  const [texto, setTexto] = useState("");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Página Input</h1>

      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Digite algo..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {/* Texto exibido */}
      <p className="text-lg">Você digitou: {texto}</p>
    </div>
  );
}
