'use client';

import { useEffect, useState } from "react";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/produtocard";
import useSWR from "swr";

export default function Page() {

    // estado da pesquisa
    const [search, setSearch] = useState<string>("");

    // estado da ordenação
    const [ordenacao, setOrdenacao] = useState<string>("nome-asc");

    // estado dos produtos filtrados e ordenados
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    // fetcher
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR<Product[], Error>(
        '/api/produtos',
        fetcher
    );

    // filtrar + ordenar sempre que search, ordenacao ou data muda
    useEffect(() => {
        if (!data) return;

        let resultado = data.filter(produto =>
            produto.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        resultado.sort((a, b) => {
            switch (ordenacao) {
                case "nome-asc":
                    return a.title.localeCompare(b.title);
                case "nome-desc":
                    return b.title.localeCompare(a.title);
                case "preco-asc":
                    return Number(a.price) - Number(b.price);
                case "preco-desc":
                    return Number(b.price) - Number(a.price);
                default:
                    return 0;
            }
        });

        setFilteredData(resultado);
    }, [search, ordenacao, data]);

    if (isLoading) return <p>A carregar produtos...</p>;
    if (error) return <p>Erro: {error.message}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Produtos</h1>

            {/* input de pesquisa */}
            <input
                type="text"
                placeholder="Pesquisar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "8px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "400px"
                }}
            />

            {/* select de ordenação */}
            <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                style={{
                    padding: "8px",
                    marginBottom: "20px",
                    marginLeft: "10px"
                }}
            >
                <option value="nome-asc">Nome (A - Z)</option>
                <option value="nome-desc">Nome (Z - A)</option>
                <option value="preco-asc">Preço (baixo - alto)</option>
                <option value="preco-desc">Preço (alto - baixo)</option>
            </select>

            {/* lista de produtos */}
            <div>
                {filteredData.map(produto => (
                    <ProdutoCard key={produto.id} {...produto} />
                ))}
            </div>
        </div>
    );
}
