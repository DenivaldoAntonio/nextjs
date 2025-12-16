import { Rating } from "@/models/interfaces";
import Link from "next/link";

export interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;

    onAddToCart?: (product: ProductProps) => void;
    onRemoveFromCart?: (id: number) => void;          // −1 unidade
    onRemoveAllFromCart?: (id: number) => void;       // remover tudo
    isInCart?: boolean;
    quantity?: number;
}

export default function ProdutoCard({
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    onAddToCart,
    onRemoveFromCart,
    onRemoveAllFromCart,
    isInCart = false,
    quantity
}: ProductProps) {

    return (
        <div className="bg-blue-600 text-white p-3 rounded-lg w-full max-w-xs mx-auto">
            {/* TÍTULO */}
            <h2 className="font-bold text-sm mb-1">{title}</h2>

            {/* DESCRIÇÃO */}
            <p className="text-xs mb-1 line-clamp-2">{description}</p>

            {/* PREÇO */}
            <p className="text-sm font-semibold mb-2">{price} €</p>

            {/* CARRINHO */}
            {isInCart && quantity !== undefined && (
                <>
                    {/* + / − */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <button
                            className="bg-red-500 px-2 rounded"
                            onClick={() => onRemoveFromCart?.(id)}
                        >
                            −
                        </button>

                        <span className="font-bold text-sm">{quantity}</span>

                        <button
                            className="bg-green-500 px-2 rounded"
                            onClick={() =>
                                onAddToCart?.({
                                    id,
                                    title,
                                    price,
                                    description,
                                    category,
                                    image,
                                    rating
                                })
                            }
                        >
                            +
                        </button>
                    </div>

                    {/* REMOVER PRODUTO */}
                    <button
                        className="bg-gray-800 w-full py-1 text-xs rounded"
                        onClick={() => onRemoveAllFromCart?.(id)}
                    >
                        Remover produto
                    </button>
                </>
            )}

            {/* FORA DO CARRINHO */}
            {!isInCart && (
                <div className="flex gap-2 mt-2">
                    {/* ADICIONAR */}
                    {onAddToCart && (
                        <button
                            className="bg-white text-black flex-1 py-1 text-xs rounded"
                            onClick={() =>
                                onAddToCart({
                                    id,
                                    title,
                                    price,
                                    description,
                                    category,
                                    image,
                                    rating
                                })
                            }
                        >
                            Adicionar
                        </button>
                    )}

                    {/* +INFO */}
                    <Link href={`/produtos/${id}`} className="flex-1">
                        <button className="bg-gray-200 text-black w-full py-1 text-xs rounded">
                            +info
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
