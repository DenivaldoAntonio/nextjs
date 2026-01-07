"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/produtocard";
import { Loader2 } from "lucide-react";

type CartItem = {
    product: Product;
    quantity: number;
};

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Erro ao obter produtos");
    }
    return res.json();
};

export default function ProdutosPage() {
    const { data, error, isLoading } = useSWR<Product[]>(
        "https://deisishop.pythonanywhere.com/products/",
        fetcher
    );

    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [purchaseResult, setPurchaseResult] = useState<any>(null);

    /* ---------- localStorage ---------- */
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    /* ---------- filtro / ordenação ---------- */
    useEffect(() => {
        if (!data) return;

        let result = data.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );

        if (sortOption === "name-asc")
            result.sort((a, b) => a.title.localeCompare(b.title));

        if (sortOption === "name-desc")
            result.sort((a, b) => b.title.localeCompare(a.title));

        if (sortOption === "price-asc")
            result.sort((a, b) => Number(a.price) - Number(b.price));

        if (sortOption === "price-desc")
            result.sort((a, b) => Number(b.price) - Number(a.price));

        setFilteredData(result);
    }, [search, sortOption, data]);

    /* ---------- carrinho ---------- */
    const addToCart = (produto: Product) => {
        setCart((prev) => {
            const item = prev.find(
                (p) => p.product.id === produto.id
            );

            if (item) {
                return prev.map((p) =>
                    p.product.id === produto.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { product: produto, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((p) => p.product.id !== id));
    };

    const total = cart.reduce((sum, item) => {
        return sum + Number(item.product.price) * item.quantity;
    }, 0);

    /* ---------- compra ---------- */
    const buyProducts = async () => {
        if (cart.length === 0) return;

        try {
            const ids = cart.flatMap((item) =>
                Array(item.quantity).fill(item.product.id)
            );

            const res = await fetch(
                "https://deisishop.pythonanywhere.com/shop/buy",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        products: ids,
                        estudante: isStudent,
                        cupao: coupon || null,
                    }),
                }
            );

            const data = await res.json();
            setPurchaseResult(data);
            setCart([]);
        } catch {
            setPurchaseResult({ error: "Erro ao processar compra" });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">Erro ao obter produtos.</p>;
    }

    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PRODUTOS */}
            <div className="lg:col-span-2">
                <h2 className="text-3xl mb-6 text-center">DEISI SHOP</h2>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-4 p-3 border rounded"
                    placeholder="Pesquisar..."
                />

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full mb-6 p-3 border rounded"
                >
                    <option value="">Ordenar...</option>
                    <option value="name-asc">Nome A → Z</option>
                    <option value="name-desc">Nome Z → A</option>
                    <option value="price-asc">Mais barato</option>
                    <option value="price-desc">Mais caro</option>
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredData.map((product) => (
                        <ProdutoCard
                            key={product.id}
                            produto={product}
                            onAdd={addToCart}
                        />
                    ))}
                </div>
            </div>

            {/* CARRINHO */}
            <div className="border rounded-xl p-5 flex flex-col">
                <h3 className="text-2xl mb-4">Carrinho</h3>

                {cart.length === 0 && <p>Carrinho vazio</p>}

                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.product.id}
                            className="border p-3 rounded"
                        >
                            <ProdutoCard
                                produto={item.product}
                                onRemove={removeFromCart}
                            />
                            <p className="mt-2">
                                Quantidade: <strong>{item.quantity}</strong>
                            </p>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <p className="text-xl font-bold">
                    Total: {total.toFixed(2)} €
                </p>

                <div className="mt-4">
                    <label className="flex items-center gap-2 mb-3">
                        <input
                            type="checkbox"
                            checked={isStudent}
                            onChange={(e) => setIsStudent(e.target.checked)}
                        />
                        Estudante DEISI
                    </label>

                    <input
                        placeholder="Cupão"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <button
                        onClick={buyProducts}
                        className="w-full bg-green-500 text-white rounded py-2 hover:bg-green-600"
                    >
                        Comprar
                    </button>
                </div>

                {purchaseResult && (
                    <pre className="mt-4 bg-gray-100 p-2 text-sm overflow-auto">
                        {JSON.stringify(purchaseResult, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}
