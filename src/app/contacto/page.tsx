"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-20">
                <Contact />
            </main>
        </div>
    );
}
