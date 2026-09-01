import Header from "./Header";
import Footer from "./Footer";

type PageShellProps = {
  children: React.ReactNode;
};

export default function PageShell({
  children,
}: PageShellProps) {
  return (
    <>
      <Header />

      <main className="page-main">
        {children}
      </main>

      <Footer />
    </>
  );
}