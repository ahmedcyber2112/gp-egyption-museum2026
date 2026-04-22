import Script from "next/script";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="antialiased">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      {children}
    </section>
  );
}
