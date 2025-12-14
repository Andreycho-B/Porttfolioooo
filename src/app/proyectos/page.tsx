"use client";

import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center md:text-left"
                >
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">Portafolio de Ingeniería</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Un recorrido detallado por soluciones técnicas reales. En cada proyecto encontrarás el contexto, las decisiones de arquitectura y el resultado final.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <Link href={`/proyectos/${project.slug}`} key={project.slug} className="group h-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-muted/20 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-muted/30 transition-all h-full flex flex-col"
                            >
                                <div className="h-48 bg-neutral-900 relative overflow-hidden">
                                    <img
                                        src={project.evidence.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            Ver Case Study <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-mono text-accent uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                                    </div>

                                    <p className="text-muted-foreground mb-6 text-sm line-clamp-2 md:line-clamp-3 flex-1">
                                        {project.overview}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                        {project.techStack.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">
                                                {tag}
                                            </span>
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <span className="text-[10px] text-gray-500 px-1 py-1">+{project.techStack.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
// End of component
