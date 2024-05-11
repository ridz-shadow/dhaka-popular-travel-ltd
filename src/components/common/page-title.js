export default function PageTitle({ title }) {
  return (
    <div className="bg-white border-b-2 border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
