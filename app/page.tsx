import PageShell from "@/components/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero">
        <h1>Daily Panchang</h1>

        <p>
          Vedic Panchang calculated for your location
        </p>
      </section>

      <section className="card">
        <h2>Kaaldarpan</h2>

        <p>
          Your Panchang is being rebuilt with the
          new Kaaldarpan system.
        </p>
      </section>
    </PageShell>
  );
}