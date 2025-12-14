"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Experience } from "@/components/sections/Experience";

export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-20">
                {/* 
                   We reuse the component but might want to adjust its internal padding 
                   if it feels too squeezed or too loose. for now, reusing is fine 
                   as we want consistency. 
                */}
                <Experience />
            </main>
        </div>
    );
}
