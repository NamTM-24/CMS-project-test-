export default function TextBlockSection({ settings }) {
  const { heading, content, alignment } = settings;

  return (
    <div className="py-12 px-6" style={{ textAlign: alignment }}>
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
