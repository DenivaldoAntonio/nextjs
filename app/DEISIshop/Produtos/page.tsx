'use client';
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/produtocard";
import useSWR from "swr";


export default function Page() {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR<Product[], Error>('/api/produtos', fetcher);

    if (isLoading) return <p>A carregar produtos...</p>;
    if (error) return <p>Erro: {error.message}</p>;


    return (
        <div>
            <h1>Produtos</h1>
            <div>
                 {data?.map(Product => (
                    <ProdutoCard key={Product.id} {...Product} />
                ))}    
            </div>
        </div>
    );
}