

import {tecnologias} from '@/data/tecnologias'
import Tecnologia from '@/components/tecnologia/tecnologia'

export default function TecnologiaPage(){

    return(
        <>
            <h2>Lista de Tecnologias</h2>

            <ul>
                {tecnologias.map((tecnologia, i) => (
                    <Tecnologia 
                        key={i}
                        titulo={tecnologia.titulo}
                        descricao={tecnologia.descricao}                        
                    />
                ))}

            </ul>
        </>
    )

}