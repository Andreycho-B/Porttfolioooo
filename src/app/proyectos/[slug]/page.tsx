"use client";

import { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const project = PROJECTS.find(p => p.slug === resolvedParams.slug);

    if (!project) notFound();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
                {/* Back Button */}
                <Link href="/proyectos" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Volver a Proyectos
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mb-16"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent uppercase tracking-wider">
                        {project.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                        {project.overview}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content (Left Col) */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Context Block */}
                        <section className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400" /> El Problema
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {project.problem}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400" /> La Solución
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Tech Decisions */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Decisiones Técnicas</h2>
                            <div className="grid gap-4">
                                {project.technicalDecisions.map((decision, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                                        <h4 className="font-semibold text-lg mb-2 text-foreground/90">{decision.title}</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{decision.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Image Evidence */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">Evidencia Visual</h2>
                            <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-white/10 relative group">
                                <img
                                    src={project.evidence.images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Right Col) */}
                    <aside className="space-y-8">

                        {/* Actions */}
                        <div className="bg-secondary/5 border border-white/5 p-6 rounded-2xl space-y-4">
                            <h3 className="font-semibold text-lg">Explorar Proyecto</h3>
                            <div className="grid gap-3">
                                {project.evidence.demoUrl && (
                                    <Link href={project.evidence.demoUrl} className="w-full">
                                        <Button className="w-full gap-2">
                                            <ExternalLink size={16} /> Ver Demo en Vivo
                                        </Button>
                                    </Link>
                                )}
                                {project.evidence.codeUrl && (
                                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button variant="outline" className="w-full gap-2">
                                            <Github size={16} /> Ver Repositorio
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Role */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Nuestro Rol</h3>
                            <ul className="space-y-2">
                                {project.role.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 size={16} className="mt-0.5 text-accent shrink-0" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Stack Tecnológico</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}
