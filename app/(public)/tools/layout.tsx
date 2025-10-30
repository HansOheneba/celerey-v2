

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="h-20"></div>
      <main className="mx-auto  ">{children}</main>

     
    </>
  );
}
