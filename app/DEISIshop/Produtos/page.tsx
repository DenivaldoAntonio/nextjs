'use client';

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/produtocard";

interface CartItem extends Product {
    quantity: number;
}

export default function Page() {

    // pesquisa e ordenação
    const [search, setSearch] = useState("");
    const [ordenacao, setOrdenacao] = useState("nome-asc");

    // produtos
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    //  carrinho
    const [cart, setCart] = useState<CartItem[]>([]);

    //  controlo de carregamento do localStorage
    const [isLoaded, setIsLoaded] = useState(false);

    //  compra
    const [isEstudante, setIsEstudante] = useState(false);
    const [cupao, setCupao] = useState("");
    const [isBuying, setIsBuying] = useState(false);

    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR<Product[]>('/api/produtos', fetcher);

    //  carregar carrinho do localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        setIsLoaded(true);
    }, []);

    //  guardar carrinho no localStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, isLoaded]);

    //  filtrar + ordenar
    useEffect(() => {
        if (!data) return;

        let resultado = data.filter(produto =>
            produto.title.toLowerCase().includes(search.toLowerCase())
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

    //  adicionar produto
    function addToCart(product: Product) {
        setCart(prev => {
            const exists = prev.find(p => p.id === product.id);

            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    }

    //  remover uma unidade
    function removeFromCart(id: number) {
        setCart(prev =>
            prev
                .map(p =>
                    p.id === id
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                )
                .filter(p => p.quantity > 0)
        );
    }

    //  remover produto inteiro
    function removeAllFromCart(id: number) {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    //  total
    const total = cart.reduce(
        (sum, p) => sum + Number(p.price) * p.quantity,
        0
    );

    //  COMPRAR (usa a route interna)
    function buy() {
        if (cart.length === 0) return;

        setIsBuying(true);

        // transformar carrinho em array de IDs (repetidos)
        const productIds = cart.flatMap(item =>
            Array(item.quantity).fill(item.id)
        );

        fetch("/api/deisishop/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products: productIds,
                student: isEstudante,
                coupon: cupao,
                name: "Cliente DEISI"
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro na compra");
                return res.json();
            })
            .then(data => {
                alert(
                    `Compra realizada com sucesso!\n` +
                    `Referência: ${data.reference}\n` +
                    `Total: ${data.totalCost}`
                );

                setCart([]);
                localStorage.removeItem("cart");
                setCupao("");
                setIsEstudante(false);
            })
            .catch(() => {
                alert("Erro ao realizar a compra");
            })
            .finally(() => {
                setIsBuying(false);
            });
    }

    if (isLoading) return <p>A carregar produtos...</p>;
    if (error) return <p>Erro ao carregar produtos</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-blue-300 rounded-xl p-6 w-full max-w-5xl">

                <h1 className="text-2xl font-bold text-center mb-4">
                    DEISI SHOP
                </h1>

                <div className="grid grid-cols-3 gap-6">

                    {/* PRODUTOS */}
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            {filteredData.map(produto => (
                                <ProdutoCard
                                    key={produto.id}
                                    {...produto}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CARRINHO */}
                    <div className="bg-blue-200 rounded-lg p-4 max-w-sm w-full mx-auto">
                        <h2 className="font-bold text-lg mb-2">Carrinho</h2>

                        {cart.length === 0 && <p>Carrinho vazio</p>}

                        <div className="flex flex-col gap-3">
                            {cart.map(produto => (
                                <ProdutoCard
                                    key={produto.id}
                                    {...produto}
                                    isInCart
                                    quantity={produto.quantity}
                                    onAddToCart={addToCart}
                                    onRemoveFromCart={removeFromCart}
                                    onRemoveAllFromCart={removeAllFromCart}
                                />
                            ))}
                        </div>

                        {/* OPÇÕES DE COMPRA */}
                        <div className="mt-3 text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isEstudante}
                                    onChange={(e) => setIsEstudante(e.target.checked)}
                                />
                                Estudante DEISI
                            </label>

                            <input
                                type="text"
                                placeholder="Cupão de desconto"
                                value={cupao}
                                onChange={(e) => setCupao(e.target.value)}
                                className="border p-1 w-full mt-2 rounded"
                            />
                        </div>

                        <hr className="my-3" />

                        <p className="font-bold">
                            Total: {total.toFixed(2)} €
                        </p>

                        <button
                            className="bg-green-500 text-white w-full mt-3 py-2 rounded disabled:opacity-50"
                            onClick={buy}
                            disabled={cart.length === 0 || isBuying}
                        >
                            {isBuying ? "A processar..." : "Comprar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
