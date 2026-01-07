"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/models/interfaces";

export default function ProdutoDetalhe({ produto }: { produto: Product }) {
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        const guardados = localStorage.getItem("favoritos");
        if (guardados) {
            const ids = JSON.parse(guardados);
            setFavorito(ids.includes(produto.id));
        }
    }, [produto.id]);

    function alternarFavorito() {
        const guardados = localStorage.getItem("favoritos");
        let ids: number[] = guardados ? JSON.parse(guardados) : [];

        if (ids.includes(produto.id)) {
            ids = ids.filter((id) => id !== produto.id);
            setFavorito(false);
        } else {
            ids.push(produto.id);
            setFavorito(true);
        }

        localStorage.setItem("favoritos", JSON.stringify(ids));
    }

    return (
        <div className="border p-6 rounded flex flex-col gap-4 items-center">

            <button onClick={alternarFavorito} className="text-2xl">
                {favorito ? "Coracao vermelho" : "Coracao branco"}
            </button>

            <Image
                src={produto.image}
                alt={produto.title}
                width={250}
                height={250}
            />


            <h2>{produto.title}</h2>
            <p>{produto.description}</p>
            <p>{produto.price} €</p>

        </div>
    );
}