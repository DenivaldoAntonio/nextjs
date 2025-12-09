'use client'

import { useState } from "react";

export default function Input() {
  const [texto, setTexto] = useState("");
  const [tecnologia, setTecnologia] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([])
  const [novaTarefa, setNovaTarefa] = useState<string>("")

  function adicionarTarefa() {
    setTarefas([...tarefas, novaTarefa])
    setNovaTarefa("")
  }

  function apagarTarefa(index: number, tarefas: string[], setTarefas: (t: string[]) => void) {
  const novasTarefas = tarefas.filter((_, i) => i !== index);
  setTarefas(novasTarefas);
}

function editarTarefa(index: number, tarefas: string[], setNovaTarefa: (t: string) => void, setEditIndex: (i: number | null) => void) {
  setNovaTarefa(tarefas[index]);
  setEditIndex(index);
}

  return (


    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold"></h1>

      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Digite algo..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <p className="text-lg">Você digitou: {texto}</p>


      <select
        className="border p-2 rounded w-full"
        value={tecnologia}
        onChange={(e) => setTecnologia(e.target.value)}
      >
        <option value="">Selecione uma tecnologia...</option>
        <option value="React">React</option>
        <option value="Next.js">Next.js</option>
        <option value="HTML">HTML</option>
        <option value="Java">CSS</option>
        <option value="JSON">Python</option>

      </select>

      {tecnologia && (
        <p className="text-lg">Tecnologia escolhida: {tecnologia}</p>
      )}

      <section className="bg-blue-300 p-2 pb-4 mt-6 rounded-xl">
        <h2>Tarefas</h2>
        <input
          type="text"
          placeholder="Escreva algo..."
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 m-2 border border-green-700 rounded"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 hover:pointer text-white font-bold py-2 px-4 m-2 border border-green-700 rounded"
          onClick={adicionarTarefa}
        >
          Adicionar
        </button>
        <p>Tarefas:</p>
        <ul>
          {tarefas.map((tarefa, index) => (
    <li key={index} className="flex items-center space-x-2">
              <span>{tarefa}</span>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 rounded"
                onClick={() => editarTarefa(index, tarefas, setNovaTarefa, () => {})}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 rounded"
                onClick={() => apagarTarefa(index, tarefas, setTarefas)}
              >
                Apagar
              </button>
            </li>
          ))}
        </ul>
      </section>
      

    </div>


  );
}
