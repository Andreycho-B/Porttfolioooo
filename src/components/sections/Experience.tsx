"use client";

import { motion } from 'framer-motion';
import { Briefcase, Code2, Database, GitMerge } from 'lucide-react';

export function Experience() {
    return (
        <section className="py-24 px-6 md:px-12 bg-muted/20">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center md:text-left space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent uppercase tracking-wider">
                        <Briefcase size={14} />
                        Trayectoria Técnica
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Experiencia Práctica</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        Enfoque pragmático en la resolución de problemas reales. Hemos transformado conceptos teóricos en software funcional, aplicando estándares de la industria desde el día uno.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 space-y-12">

                    {/* Entry 1: Combined Technical Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-[0_0_0_4px_rgba(255,255,255,0.05)]" />

                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground">Desarrolladores de Software</h3>
                                    <p className="text-lg text-muted-foreground font-medium">Ciclo de Desarrollo Full Stack & Arquitectura</p>
                                </div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-400 whitespace-nowrap">
                                    2025 – Presente
                                </span>
                            </div>

                            <div className="bg-background/50 border border-white/5 p-6 rounded-2xl md:p-8 hover:border-white/10 transition-colors">
                                <div className="grid md:grid-cols-2 gap-8">

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-foreground font-semibold">
                                            <Code2 size={18} className="text-blue-400" />
                                            <span>Construcción de Sistemas</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Diseño e implementación de aplicaciones web complejas, migrando de arquitecturas monolíticas simples a sistemas modulares basados en componentes (React/Next.js).
                                        </p>
                                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 pl-1">
                                            <li>Implementación de lógica de negocio en TypeScript.</li>
                                            <li>Desarrollo de interfaces reactivas y accesibles.</li>
                                            <li>Consumo eficiente de APIs RESTful.</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-foreground font-semibold">
                                            <Database size={18} className="text-green-400" />
                                            <span>Gestión de Datos & Backend</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Modelado de bases de datos relacionales, asegurando la integridad referencial y la optimización de consultas para el manejo de inventarios y usuarios.
                                        </p>
                                        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1 pl-1">
                                            <li>Normalización de bases de datos SQL.</li>
                                            <li>Integración de servicios backend (Supabase/Firebase).</li>
                                            <li>Autenticación y manejo seguro de sesiones.</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Entry 2: Methodology */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-white/20" />

                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Colaboración Técnica & DevOps</h3>
                                    <p className="text-base text-muted-foreground">Estándares de Ingeniería</p>
                                </div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-400 whitespace-nowrap">
                                    Transversal
                                </span>
                            </div>

                            <p className="text-muted-foreground leading-relaxed max-w-3xl">
                                No trabajamos como islas. Desde el inicio, adoptamos flujos de trabajo profesionales para garantizar que nuestro código sea mantenible, escalable y auditable por terceros.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                                    <GitMerge size={16} className="text-orange-400" /> Control de Versiones (Git Flow)
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                                    <Code2 size={16} className="text-purple-400" /> Code Review & Pull Requests
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                                    <Database size={16} className="text-cyan-400" /> Documentación Técnica
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
