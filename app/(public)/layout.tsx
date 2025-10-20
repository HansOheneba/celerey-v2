import Footer from "@/layout/footer";
import Header from "@/layout/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header */}
      <Header />
      <div className="h-10"></div>
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      {/* Footer*/}
      <Footer />
    </>
  );
}
