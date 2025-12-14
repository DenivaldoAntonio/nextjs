interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const produtos: Product[] = [
    {
        id: 1,
        title: "O mundo do binário",
        price: "22.5",
        description:
            "Mostra ao mundo que percebes de matemática fora da caixa! Com esta t-shirt, podes provar que 1 + 1 = 10... mas só para os génios da programação e entusiastas do sistema binário. Perfeita para descontrair o ambiente e deixar toda a gente a pensar. Quem disse que estilo e código não combinam?",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt-1-1.png",
        rating: { rate: 4.7, count: 200 }
    },
    {
        id: 2,
        title: "Programar: 10% vs. 90%",
        price: "20.0",
        description:
            "Quando achas que já entendeste o problema, mas ainda precisas de mais 3 horas de \"esboços\" no quadro branco...",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt-10-90.png",
        rating: { rate: 3.8, count: 150 }
    },
    {
        id: 3,
        title: "És o CSS do meu HTML",
        price: "25.0",
        description:
            "A combinação perfeita entre estilo e estrutura!...",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt-css.png",
        rating: { rate: 4.9, count: 250 }
    },
    {
        id: 4,
        title: "10 tipos de pessoas",
        price: "19.9",
        description:
            "Para os amantes de códigos e piadas geek...",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt-10.png",
        rating: { rate: 4.7, count: 322 }
    },
    {
        id: 5,
        title: "comer, programar, dormir, repetir!",
        price: "16.5",
        description:
            "A rotina perfeita para quem vive no loop infinito do código!",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt-eat-sleep-code.png",
        rating: { rate: 4.3, count: 234 }
    },
    {
        id: 6,
        title: "não perturbar, estou a programar!",
        price: "7.5",
        description:
            "A solução perfeita para quem não consegue desligar, nem quando está de meias!",
        category: "Meias",
        image: "/media/produto_imagens/do-not-disturb.png",
        rating: { rate: 3.2, count: 67 }
    },
    {
        id: 7,
        title: "Hello World",
        price: "7.5",
        description:
            "Para quem vive entre o código e o estilo!",
        category: "Meias",
        image: "/media/produto_imagens/socks-00.png",
        rating: { rate: 4.2, count: 125 }
    },
    {
        id: 8,
        title: "Erro 404: não estou disponível!",
        price: "18.5",
        description:
            "Quando o mundo tenta chamar a tua atenção, mas tu estás demasiado ocupado...",
        category: "T-shirts",
        image: "/media/produto_imagens/tshirt_Error.png",
        rating: { rate: 4.7, count: 100 }
    },
    {
        id: 9,
        title: "odeio.. adoro programar!",
        price: "12.0",
        description:
            "Aquela montanha-russa emocional que só quem programa conhece bem!",
        category: "Canecas",
        image: "/media/produto_imagens/mug-programming.png",
        rating: { rate: 4.6, count: 99 }
    },
    {
        id: 10,
        title: "As 6 fases do debugging",
        price: "13.0",
        description:
            "A jornada épica de todo programador...",
        category: "Canecas",
        image: "/media/produto_imagens/mug-debugging.png",
        rating: { rate: 3.8, count: 230 }
    },
    {
        id: 11,
        title: "se café vazio...",
        price: "14.0",
        description:
            "O código perfeito para quem sabe que a vida de um programador depende de um único ciclo...",
        category: "Canecas",
        image: "/media/produto_imagens/muf-coffee.png",
        rating: { rate: 3.6, count: 140 }
    },
    {
        id: 12,
        title: "do or do not. no try",
        price: "19.85",
        description:
            "Sabias que até o mestre Yoda tem algo a ensinar aos programadores?",
        category: "T-shirts",
        image: "/media/produto_imagens/do-or-do-not.png",
        rating: { rate: 4.5, count: 132 }
    }
];
