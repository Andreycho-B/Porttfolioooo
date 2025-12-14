"use client";

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Left: Branding & Names */}
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-lg font-bold tracking-tight">
                            Andrey Rondón <span className="text-muted-foreground mx-2">&</span> David Neita
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Ingenieros de Software & Consultores Técnicos.
                            <br />
                            Construyendo soluciones digitales de alto impacto.
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-4">
                            &copy; {new Date().getFullYear()} Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex gap-4">
                            <Link href="https://github.com" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors text-muted-foreground">
                                <Github size={20} />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors text-muted-foreground">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="mailto:contacto@example.com" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-green-400 transition-colors text-muted-foreground">
                                <Mail size={20} />
                            </Link>
                        </div>
                        <div className="text-xs text-muted-foreground flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Términos de Servicio</Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
