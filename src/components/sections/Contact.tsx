"use client";

import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Contact() {
    return (
        <section className="py-32 px-6 md:px-12 relative overflow-hidden">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* Left: Minimalist Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                >
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">
                            Creemos algo <br />
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                excepcional.
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
                            Tu visión merece una ejecución impecable. Conecta con nosotros para discutir cómo elevar tu proyecto al siguiente nivel.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link href="https://wa.me/573148039636" target="_blank">
                            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 transition-all font-medium text-base tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Iniciar Conversación
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>

                        <div className="flex gap-3 items-center">
                            <Link href="mailto:contact@andrey-david.dev">
                                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/5 bg-white/[0.03] hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-sm">
                                    <Mail size={20} strokeWidth={1.5} />
                                </Button>
                            </Link>
                            <Link href="https://linkedin.com/in/andrey-rondon" target="_blank">
                                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/5 bg-white/[0.03] hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-sm">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </Button>
                            </Link>
                            <Link href="https://github.com/AndreyRondon" target="_blank">
                                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/5 bg-white/[0.03] hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-sm">
                                    <Github size={20} strokeWidth={1.5} />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />

                    <div className="flex flex-col gap-1 text-sm text-slate-500 font-light tracking-wide">
                        <p>Disponible para nuevos proyectos</p>
                        <p>Respuesta estimada: &lt; 24 Horas</p>
                    </div>
                </motion.div>


                {/* Right: Ultra-Clean Glass Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    {/* Subtle Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 blur-[80px] rounded-full z-0" />

                    <div className="relative z-10 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] p-8 md:p-12 rounded-[2rem]">
                        <form className="space-y-8">
                            <div className="space-y-2 group">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-medium ml-1 group-focus-within:text-white transition-colors">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-white/40 transition-all font-light text-lg rounded-none"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-medium ml-1 group-focus-within:text-white transition-colors">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-white/40 transition-all font-light text-lg rounded-none"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-medium ml-1 group-focus-within:text-white transition-colors">Mensaje</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-white/40 transition-all font-light text-lg resize-none rounded-none"
                                />
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full h-14 rounded-xl text-base font-medium bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 transition-all hover:scale-[1.01]">
                                    Enviar Mensaje
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>

            </div >
        </section >
    );
}
