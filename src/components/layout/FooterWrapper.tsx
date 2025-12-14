"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
    const pathname = usePathname();
    // Hide footer on any route starting with /demos
    const isDemo = pathname?.startsWith("/demos");

    if (isDemo) return null;

    return <Footer />;
}
