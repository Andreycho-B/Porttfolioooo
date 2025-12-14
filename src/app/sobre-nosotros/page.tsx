"use client";

import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Terminal, Database, GitBranch, Cpu } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-16"
                >
                    {/* Block 1: Identity */}
                    <section className="space-y-6 text-center md:text-left">
                        <div className="inline-block px-3 py-1 rounded-full bg-secondary/30 border border-secondary text-xs font-medium text-secondary-foreground">
                            Análisis y Desarrollo de Software
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Desarrollo profesional, <br />
                            fundamentos sólidos.
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            Somos Andrey Rondón y David Neita, consultores técnicos especializados en la construcción de software funcional.
                            Nuestra formación como Tecnólogos nos permite abordar proyectos con una base teórica firme y una ejecución práctica orientada a resultados de negocio.
                        </p>
                    </section>

                    {/* Block 2: Capabilities (Grid) */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="bg-secondary/5 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-colors">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                                <Cpu size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Lógica & Arquitectura</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                No solo escribimos código; diseñamos soluciones. Aplicamos principios de Programación Orientada a Objetos (POO) y patrones de diseño para asegurar que el software sea mantenible y escalable.
                            </p>
                        </div>

                        <div className="bg-secondary/5 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-colors">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                                <Database size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Datos & Backend</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Construcción de APIs REST eficientes y manejo de bases de datos SQL. Entendemos la importancia de la integridad de los datos y una comunicación fluida entre el cliente y el servidor.
                            </p>
                        </div>

                        <div className="bg-secondary/5 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-colors">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400">
                                <GitBranch size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Colaboración Técnica</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Uso profesional de Git y GitHub para control de versiones. Trabajamos con flujos de trabajo claros (Pull Requests, Code Review) para integrarnos en equipos existentes sin fricción.
                            </p>
                        </div>

                        <div className="bg-secondary/5 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-colors">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                                <Terminal size={20} />
                            </div>
                            <h3 className="text-xl font-semibold">Ejecución & Entrega</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Transformamos requerimientos en software desplegado. Hacemos énfasis en código limpio, documentación básica y respeto por los plazos de entrega.
                            </p>
                        </div>
                    </section>

                    {/* Block 3: Philosophy / How we work */}
                    <section className="bg-secondary/10 border border-border rounded-3xl p-8 md:p-12 text-center space-y-6">
                        <h2 className="text-3xl font-bold">Nuestra Promesa</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Al trabajar con nosotros, obtiene transparencia técnica y compromiso.
                            No prometemos lo que no podemos cumplir, y nos enfocamos en entender su problema antes de escribir la primera línea de código.
                            Somos un equipo en constante aprendizaje, listos para aportar valor desde el primer día.
                        </p>
                    </section>

                </motion.div>
            </main>
        </div>
    );
}
