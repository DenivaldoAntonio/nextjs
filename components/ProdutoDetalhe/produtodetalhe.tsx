import { ProductProps } from "@/components/ProdutoCard/produtocard";
import Link from "next/link";

interface Props {
    produto: ProductProps;
}

export default function ProdutoDetalhe({ produto }: Props) {
    return (
        <div className="p-4">
            <h1>{produto.title}</h1>

            <img src={produto.image} alt={produto.title} width={300} />

            <p><strong>ID:</strong> {produto.id}</p>
            <p><strong>Preço:</strong> {produto.price}</p>
            <p><strong>Categoria:</strong> {produto.category}</p>

            <p><strong>Descrição:</strong></p>
            <p>{produto.description}</p>

            <p>
                <strong>Avaliação:</strong>{" "}
                {produto.rating.rate} ⭐ ({produto.rating.count})
            </p>

            {/* botão voltar */}
            <Link href="/produtos">
                <button className="mt-4 bg-blue-600 text-white px-3 py-1">
                    Voltar aos produtos
                </button>
            </Link>
        </div>
    );
}
