"use client";

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const Footer = dynamic(() => import('../Footer/Footer'), {
  ssr: false,
  loading: () => null,
});

const FloatingButtons = dynamic(() => import('../FloatingButtons/FloatingButtons'), {
  ssr: false,
  loading: () => null,
});

export default function PublicChrome() {
  const pathname = usePathname();
  const hideFooter = pathname === "/AIAssistant" || pathname === "/profile";

  return (
    <>
      {!hideFooter ? <Footer /> : null}
      <FloatingButtons />
    </>
  );
}