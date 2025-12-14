"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Projects() {
    return (
        <section className="py-24 px-6 md:px-12 bg-background relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Proyectos Destacados</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Selección de trabajos con profundidad técnica. Haz clic para ver el estudio de caso detallado.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {PROJECTS.map((project, index) => (
                        <Link href={`/proyectos/${project.slug}`} key={index} className="group block h-full">
                            <motion.div
                                variants={itemVariants}
                                className="h-full flex flex-col rounded-2xl border border-white/5 bg-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    <motion.img
                                        src={project.evidence.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <span className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
                                            Leer Case Study <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 space-y-4 flex flex-col">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.overview}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                                        {project.techStack.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:border-primary/20 group-hover:text-primary/80 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
