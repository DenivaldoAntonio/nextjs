import { Rating } from "@/models/interfaces";
import Link from "next/link";

export interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating
}

export default function ProdutoCard({ id, title, price, description, category, image, rating }: ProductProps) {

    return (
        <div className="bg-blue-600 p-2 m-2">
            <h2>{id}</h2>
            <h2>{title}</h2>
            <h2>{price}</h2>
            <h2>{description}</h2>
            <h2>{category}</h2>
            <h2>{image}</h2>
            <h2>{rating.rate} - {rating.count}</h2>

            {/* botão +info */}
            <Link href={`/produtos/${id}`}>
                <button className="bg-white text-black px-3 py-1 mt-2">
                    +info
                </button>
            </Link>
        </div>
    )
}