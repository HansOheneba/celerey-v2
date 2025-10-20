export default function Home() {
  return (
    <div className="min-h-screen p-8">
      {/* Headers automatically use PP Cirka via CSS */}
      <h1>This header uses PP Cirka automatically</h1>
      <h2>So does this subheader</h2>

      {/* Body text automatically uses Helvetica */}
      <p>This paragraph uses Helvetica automatically as body text.</p>
      <p>All regular text will use Helvetica by default.</p>

      {/* Explicit usage when needed */}
      <h3 className="font-pp-cirka">Explicit PP Cirka header</h3>
      <p className="font-helvetica">Explicit Helvetica text</p>

      {/* You can also use Tailwind's font-heading if you add it to config */}
      <h4 className="font-heading">Using font-heading class</h4>
    </div>
  );
}
