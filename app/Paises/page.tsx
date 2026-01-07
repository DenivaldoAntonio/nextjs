'use client';

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Pais } from "@/models/interfacesP";
import PaisCard from "@/components/PaisCard/pais";


export default function Page() {



    
  const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data } = useSWR<Pais[]>('/data/paises.json', fetcher);

    return (
        <ul>
            {  data?.map((pais, i) => (
                <PaisCard
                    key={i}
                    name={pais.name}
                    area={pais.area}
                    populacao={pais.population}

                />
            ))}

        </ul>


    );

}
