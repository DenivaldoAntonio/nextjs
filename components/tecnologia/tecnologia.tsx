interface TecnologiaProps {
    titulo: string
    descricao: string
}

export default function Tecnologia({titulo, descricao}:TecnologiaProps){

    return(
        <div className="bg-blue-600 p-2 m-2">
            <h2>{titulo}</h2>
            <h2>{descricao}</h2>
        </div>
    )
}