"use client";

import { use } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Product } from "@/models/interfaces";
import ProdutoDetalhe from "@/components/ProdutoDetalhe/produtodetalhe";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Erro ao obter produto");
    }
    return res.json();
};

export default function ProdutoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // 🔑 Next.js 15/16: params é uma Promise
    const { id } = use(params);

    const { data, error, isLoading } = useSWR<Product>(
        `https://deisishop.pythonanywhere.com/products/${id}`,
        fetcher
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <p className="text-center text-red-500">
                Produto não encontrado.
            </p>
        );
    }

    return (
        <div className="p-8 flex flex-col items-center gap-6">
            <ProdutoDetalhe produto={data} />

            <Link
                href="/DEISIshop/produtos"
                className="bg-blue-500 px-6 py-2 text-white rounded hover:bg-blue-600 transition"
            >
                Voltar à lista
            </Link>
        </div>
    );
}
