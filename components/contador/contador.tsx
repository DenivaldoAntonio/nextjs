'use client'

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carregar valores do localStorage ao abrir a página
  useEffect(() => {
    const savedValue = localStorage.getItem("contador");
    const savedHistory = localStorage.getItem("contadorHistory");

    if (savedValue !== null) setValor(Number(savedValue));
    if (savedHistory !== null) setHistorico(JSON.parse(savedHistory));
  }, []);

  // Sempre que valor mudar, guardar no localStorage
  useEffect(() => {
    localStorage.setItem("contador", String(valor));
    localStorage.setItem("contadorHistory", JSON.stringify(historico));
  }, [valor, historico]);

  // Funções
  function incrementar() {
    setValor((prev) => {
      const novo = Math.min(prev + 1, 10);
      setHistorico((h) => [...h, novo]);
      return novo;
    });
  }

  function decrementar() {
    setValor((prev) => {
      const novo = Math.max(prev - 1, 0);
      setHistorico((h) => [...h, novo]);
      return novo;
    });
  }

  function reset() {
    setValor(0);
    setHistorico((h) => [...h, 0]);
  }

  // Cores conforme o valor
  function getColor() {
    if (valor <= 3) return "red";
    if (valor <= 7) return "yellow";
    return "green";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1 style={{ fontSize: "3rem", color: getColor() }}>{valor}</h1>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={incrementar}>Incrementar</button>
        <button onClick={decrementar}>Decrementar</button>
        <button onClick={reset}>Reset</button>
      </div>

      <h2>Histórico</h2>
      <ul>
        {historico.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
