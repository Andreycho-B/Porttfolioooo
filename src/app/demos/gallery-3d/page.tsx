"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Scene } from "@/components/demos/gallery-3d/Scene";

export default function GalleryPage() {
    return (
        <main className="h-screen w-full bg-black overflow-hidden relative selection:bg-indigo-500/30">
            <Navbar />
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>
        </main>
    );
}
