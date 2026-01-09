'use client';

import { useState } from "react";
import useSWR from "swr";
import { Pais } from "@/models/interfacesP";
import PaisCard from "@/components/PaisCard/pais";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Page() {
    const { data } = useSWR<Pais[]>('/data/paises.json', fetcher);

    // 🔹 FILTROS
    const [search, setSearch] = useState("");
    const [minPop, setMinPop] = useState(0);
    const [minArea, setMinArea] = useState(0);

    // 🔹 APLICAR FILTROS (sem alterar o modelo)
    const filteredData = data?.filter((pais) => {
        return (
            pais.name.common.toLowerCase().includes(search.toLowerCase()) &&
            pais.population >= minPop &&
            pais.area >= minArea
        );
    });

    return (
        <div className="flex flex-col gap-4">

            {/* FILTROS */}
            <input
                type="text"
                placeholder="Pesquisar país..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded"
            />

            <input
                type="number"
                placeholder="População mínima"
                value={minPop}
                onChange={(e) => setMinPop(Number(e.target.value))}
                className="border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Área mínima"
                value={minArea}
                onChange={(e) => setMinArea(Number(e.target.value))}
                className="border p-2 rounded"
            />

            {/* LISTA DE PAÍSES */}
            <ul>
                {filteredData?.map((pais, i) => (
                    <PaisCard
                        key={i}
                        name={pais.name}              
                        area={pais.area}
                        populacao={pais.population}
                    />
                ))}
            </ul>

        </div>
    );
}
