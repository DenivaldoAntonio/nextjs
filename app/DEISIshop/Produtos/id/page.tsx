'use client';

import { useParams } from "next/navigation";
import useSWR from "swr";
import ProdutoDetalhe from "@/components/ProdutoDetalhe/produtodetalhe";
import { ProductProps } from "@/components/ProdutoCard/produtocard";

export default function Page() {

    const params = useParams();

    // ✅ garantir que id é string
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR<ProductProps>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (isLoading) return <p>A carregar produto...</p>;
    if (error) return <p>Erro ao carregar produto</p>;
    if (!data) return <p>Produto não encontrado</p>;

    return <ProdutoDetalhe produto={data} />;
}
