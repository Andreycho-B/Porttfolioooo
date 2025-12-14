"use client";

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Users } from 'lucide-react';

const BENEFITS = [
    {
        icon: Zap,
        title: "Velocidad de Entrega",
        description: "Sprints ágiles y entregas semanales. Construimos rápido sin romper nada."
    },
    {
        icon: ShieldCheck,
        title: "Calidad de Ingeniería",
        description: "Código limpio, escalable y seguro. No solo 'maquetamos', construimos sistemas."
    },
    {
        icon: Users,
        title: "Sin Intermediarios",
        description: "Comunicación directa con los desarrolladores. Sin teléfonos descompuestos."
    }
];

export function Benefits() {
    return (
        <section className="py-24 px-8 bg-background relative overflow-hidden">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight"
                    >
                        ¿Por qué nosotros?
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BENEFITS.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-secondary/20 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:border-foreground/20 transition-colors"
                        >
                            <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center mb-4 shadow-sm text-foreground">
                                <benefit.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
