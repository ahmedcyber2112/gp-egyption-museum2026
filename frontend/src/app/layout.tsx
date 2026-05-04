import type { Metadata } from "next";
import "./globals.css";
import { ThemeSchedulerProvider } from "../components/Theme/ThemeSchedulerProvider";
import MaintenanceGate from "../components/MaintenanceGate";

export const metadata: Metadata = {
  title: "Grand Egyptian Museum | GEM",
  description: "الموقع الرسمي للمتحف المصري الكبير",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased m-0 p-0">
        <ThemeSchedulerProvider>
          <MaintenanceGate />
          {children}
        </ThemeSchedulerProvider>
      </body>
    </html>
  );
}