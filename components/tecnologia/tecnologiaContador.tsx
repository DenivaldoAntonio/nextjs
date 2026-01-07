
export default function TecnologiaCard({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="border rounded-xl p-5 shadow flex flex-col gap-3 bg-white">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>

      {/* Contador */}
     
    </div>
  )
}
