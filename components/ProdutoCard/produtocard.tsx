export interface ProductProps {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
}

export default function ProdutoCard({id,title,price,description,category,image}:ProductProps){

    return(
        <div className="bg-blue-600 p-2 m-2">
            <h2>{id}</h2>
            <h2>{title}</h2>
            <h2>{price}</h2>
            <h2>{description}</h2>
            <h2>{category}</h2>
            <h2>{image}</h2>
        </div>
    )
}