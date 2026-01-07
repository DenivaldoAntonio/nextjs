"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/interfaces";

export default function ProdutoCard({
    produto,
    onAdd,
    onRemove
}: {
    produto: Product;
    onAdd?: (p: Product) => void;
    onRemove?: (id: number) => void;
}) {
    const [favorito, setFavorito] = useState<boolean>(false);

    useEffect(() => {
        const guardados = localStorage.getItem("favoritos");
        if (guardados) {
            const ids: number[] = JSON.parse(guardados);
            setFavorito(ids.includes(produto.id));
        }
    }, [produto.id]);

    function alternarFavorito() {
        const guardados = localStorage.getItem("favoritos");
        let ids: number[] = guardados ? JSON.parse(guardados) : [];

        if (ids.includes(produto.id)) {
            ids = ids.filter(id => id !== produto.id);
            setFavorito(false);
        } else {
            ids.push(produto.id);
            setFavorito(true);
        }

        localStorage.setItem("favoritos", JSON.stringify(ids));
    }

    return (
        <div className="border p-4 rounded flex flex-col gap-2">

            {/* Favorito */}
            <button
                onClick={alternarFavorito}
                className="self-end text-2xl"
                aria-label="Favorito"
            >
                {favorito ? "❤️" : "🤍"}
            </button>

            {/* Imagem */}
            <Image
                src={`https://deisishop.pythonanywhere.com${produto.image}`}
                alt={produto.title}
                width={150}
                height={150}
            />

            <h3 className="font-semibold">{produto.title}</h3>
            <p>{produto.price} €</p>

            {/* Botão +info */}
            <Link
                href={`/DEISIshop/produtos/${produto.id}`}
                className="text-blue-500 underline text-sm"
            >
                + info
            </Link>

            {onAdd && (
                <button
                    onClick={() => onAdd(produto)}
                    className="bg-blue-500 text-white p-1 rounded"
                >
                    Adicionar
                </button>
            )}

            {onRemove && (
                <button
                    onClick={() => onRemove(produto.id)}
                    className="bg-red-500 text-white p-1 rounded"
                >
                    Remover
                </button>
            )}
        </div>
    );
}
