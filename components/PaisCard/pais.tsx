import { Nome } from "@/models/interfacesP";


interface PaisProps {
    name: Nome
    area: number
    populacao: number
}

export default function Pais({ name, area, populacao }: PaisProps) {

    return (
        <div className="bg-blue-600 p-2 m-2">
            <h2>{name.common}</h2>
            <h2>{area}</h2>
            <h2>{populacao}</h2>
        </div>
    )
}