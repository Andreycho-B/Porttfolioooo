"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Users, CreditCard, Activity, TrendingUp, Download, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const salesData = [
    { name: 'Lun', uv: 4000, pv: 2400 },
    { name: 'Mar', uv: 3000, pv: 1398 },
    { name: 'Mie', uv: 2000, pv: 9800 },
    { name: 'Jue', uv: 2780, pv: 3908 },
    { name: 'Vie', uv: 1890, pv: 4800 },
    { name: 'Sab', uv: 2390, pv: 3800 },
    { name: 'Dom', uv: 3490, pv: 4300 },
];

const revenueData = [
    { name: 'Ene', total: 12000 },
    { name: 'Feb', total: 19000 },
    { name: 'Mar', total: 15000 },
    { name: 'Abr', total: 24000 },
    { name: 'May', total: 28000 },
    { name: 'Jun', total: 32000 },
];

export default function DashboardDemo() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans p-6 md:p-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/proyectos">
                        <Button variant="ghost" size="icon" className="text-white bg-white/5 hover:bg-white/10">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Empresarial</h1>
                        <p className="text-neutral-400 text-sm">Visión general del rendimiento financiero</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/5 bg-transparent">
                        <Calendar size={16} /> Últimos 30 días
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Download size={16} /> Exportar Reporte
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Ingresos Totales", value: "$124,500", change: "+12.5%", icon: CreditCard, color: "text-blue-500" },
                    { title: "Usuarios Activos", value: "45,231", change: "+8.2%", icon: Users, color: "text-emerald-500" },
                    { title: "Ventas", value: "+12,234", change: "+23.1%", icon: TrendingUp, color: "text-purple-500" },
                    { title: "Tasa de Rebote", value: "42.3%", change: "-2.5%", icon: Activity, color: "text-pink-500" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-neutral-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl"
                >
                    <h3 className="text-xl font-bold mb-6">Resumen de Ventas</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} />
                                <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#171717', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#3b82f6' }} />
                                <Line type="monotone" dataKey="pv" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, fill: '#171717', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl"
                >
                    <h3 className="text-xl font-bold mb-6">Ingresos Mensuales</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px' }}
                                />
                                <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
