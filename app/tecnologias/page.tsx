import tecnologias from '@/app/data/tecnologias.json';


export default function Page() {
    const tecnologias = [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "JSON",
        "API RESTful",
        "Swagger",
        "GitHub",
        "Codespaces",
        "GitHub Pages",
        "React.js",
        "Next.js",
        "Vercel"
    ];

    return (
        <div>
            <h2>Tecnologias Exploradas</h2>
            <ul>
                {tecnologias.map((tecnologia, i) => (
                    <li key={i}>{tecnologia}</li>
                ))}
            </ul>
        </div>
    );
}