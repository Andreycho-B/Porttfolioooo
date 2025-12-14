"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, Globe, Layers, Cpu, Cloud, Terminal } from "lucide-react";
import Link from "next/link";

const TECH_STACK = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Globe },
    { name: "Node.js", icon: Terminal },
    { name: "AWS", icon: Cloud },
    { name: "SQL", icon: Database },
    { name: "TypeScript", icon: Layers },
    { name: "System Design", icon: Cpu },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background text-foreground pt-20">
            {/* --- Background Elements --- */}

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,rgba(120,119,198,0.05),transparent)] pointer-events-none" />

            {/* --- Content --- */}
            <div className="container relative z-10 px-6 mx-auto flex-1 flex flex-col justify-center">
                <div className="max-w-5xl mx-auto text-center space-y-12">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/30 border border-secondary/50 text-xs font-medium text-secondary-foreground backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Disponible para nuevos proyectos
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1] text-balance"
                        >
                            Transformamos Visiones en <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500">
                                Software de Clase Mundial
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        >
                            Ingeniería Frontend y Backend unificada. Sin agencias intermediarias.
                            <br className="hidden md:block" />
                            Solo código limpio, escalable y resultados de negocio.
                        </motion.p>
                    </div>

                    {/* CTAs - Added z-index to ensure clickable over any potential overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20 pb-12"
                    >
                        <Link href="#contacto">
                            <button className="h-14 px-8 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-foreground/10">
                                Hablemos de tu Proyecto
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/proyectos">
                            <button className="h-14 px-8 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors font-medium text-foreground">
                                Ver Portafolio
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* --- Tech Marquee (Fixed Loop) --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="w-full overflow-hidden border-y border-border/30 bg-background/30 backdrop-blur-[2px] py-8 relative z-10"
            >
                {/* 
                   We use a flex container with specific gap.
                   We duplicate the list enough times to ensure smooth scrolling.
                   We animate x from 0 to -50% (if we have 2 sets) or calculate based on content.
                   Simpler approach: Just use a very long div and translation.
                */}
                <div className="flex select-none">
                    <motion.div
                        className="flex flex-shrink-0 gap-16 px-8 items-center"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                            <div key={`set1-${i}`} className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground transition-colors cursor-default whitespace-nowrap">
                                <tech.icon strokeWidth={1.5} size={24} />
                                <span className="text-sm font-semibold tracking-wider uppercase">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Second duplicate set for the seamless loop effect */}
                    <motion.div
                        className="flex flex-shrink-0 gap-16 px-8 items-center"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                            <div key={`set2-${i}`} className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground transition-colors cursor-default whitespace-nowrap">
                                <tech.icon strokeWidth={1.5} size={24} />
                                <span className="text-sm font-semibold tracking-wider uppercase">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
