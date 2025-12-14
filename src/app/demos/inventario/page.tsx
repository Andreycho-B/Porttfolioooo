"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Users, BarChart, Search, Bell, Settings, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock Data
const dashboardData = [
    { name: 'Lun', sales: 4000, stock: 2400 },
    { name: 'Mar', sales: 3000, stock: 1398 },
    { name: 'Mie', sales: 2000, stock: 9800 },
    { name: 'Jue', sales: 2780, stock: 3908 },
    { name: 'Vie', sales: 1890, stock: 4800 },
    { name: 'Sab', sales: 2390, stock: 3800 },
    { name: 'Dom', sales: 3490, stock: 4300 },
];

const initialProducts = [
    { id: 1, name: "Laptop Pro X1", sku: "LP-2024-X", status: "En Stock", qty: 45, price: "$1,200" },
    { id: 2, name: "Monitor UltraWide", sku: "MN-300-W", status: "Bajo Stock", qty: 3, price: "$450" },
    { id: 3, name: "Teclado Mecánico", sku: "KB-RG-90", status: "En Stock", qty: 120, price: "$120" },
    { id: 4, name: "Mouse Ergonómico", sku: "MS-ER-55", status: "En Stock", qty: 85, price: "$60" },
    { id: 5, name: "Docking Station", sku: "DS-TH-01", status: "Agotado", qty: 0, price: "$200" },
];

export default function InventoryDemo() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof typeof initialProducts[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sorted = [...products].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setProducts(sorted);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex text-sm">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col justify-between z-20"
            >
                <div>
                    <div className="text-2xl font-bold mb-10 flex items-center gap-2 tracking-tight">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Package size={20} className="text-white" />
                        </div>
                        NexusInv
                    </div>
                    <div className="space-y-2">
                        {[
                            { id: 'dashboard', icon: BarChart, label: 'Dashboard' },
                            { id: 'inventory', icon: Package, label: 'Inventario' },
                            { id: 'suppliers', icon: Users, label: 'Proveedores' },
                        ].map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                            rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all duration-200
                            ${activeTab === item.id
                                        ? 'bg-blue-600 shadow-lg shadow-blue-900/50 translate-x-1'
                                        : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
                        `}
                            >
                                <item.icon size={18} /> {item.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
                        <Settings size={18} /> Configuración
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/proyectos">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {activeTab === 'dashboard' ? 'Resumen General' : activeTab === 'inventory' ? 'Gestión de Inventario' : 'Proveedores'}
                            </h1>
                            <p className="text-slate-500 text-xs">Última actualización: Hoy, 09:41 AM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full shadow-sm bg-white border-slate-200">
                            <Bell size={18} className="text-slate-600" />
                        </Button>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                            AR
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Total Productos", value: "1,248", change: "+12%", neutral: false, color: "text-slate-900" },
                            { title: "Valor Inventario", value: "$45.2M", change: "+5.4%", neutral: true, color: "text-blue-600" },
                            { title: "Stock Bajo", value: "23", change: "Requiere Acción", neutral: false, isWarning: true, color: "text-red-600" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group"
                            >
                                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.isWarning ? 'bg-red-500' : 'bg-blue-500'} rounded-bl-3xl`}>
                                    <Package size={60} />
                                </div>
                                <h3 className="text-slate-500 font-medium mb-2">{stat.title}</h3>
                                <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                                <span className={`inline-block mt-3 px-2 py-1 rounded-md text-xs font-semibold ${stat.isWarning ? 'bg-red-50 text-red-600' : stat.neutral ? 'bg-slate-100 text-slate-600' : 'bg-green-50 text-green-600'}`}>
                                    {stat.change}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-lg">Actividad de Inventario</h2>
                                <select className="bg-slate-50 border-none text-xs rounded-lg px-2 py-1 text-slate-500 focus:ring-0">
                                    <option>Esta Semana</option>
                                    <option>Este Mes</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dashboardData}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-600/20 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 bg-blue-500/30 w-40 h-40 rounded-full blur-3xl" />
                            <div className="absolute -left-10 -bottom-10 bg-indigo-500/30 w-40 h-40 rounded-full blur-3xl" />

                            <div>
                                <h3 className="font-bold text-lg mb-1">Nexus AI</h3>
                                <p className="text-blue-100 opacity-80 leading-relaxed mb-6">Su inventario está optimizado. Se predice un aumento del 15% en la demanda de "Laptops" para la próxima semana.</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="font-bold text-sm">Sistema Saludable</span>
                                </div>
                                <p className="text-xs text-blue-100">Todas las sincronizaciones completadas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="font-bold text-lg">Productos Recientes</h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Filtrar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48"
                                    />
                                </div>
                                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-2 rounded-lg">
                                    <Plus size={16} /> Añadir
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold tracking-wider">
                                    <tr>
                                        <th onClick={() => handleSort('name')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">Producto</th>
                                        <th onClick={() => handleSort('sku')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">SKU</th>
                                        <th onClick={() => handleSort('price')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">Precio</th>
                                        <th onClick={() => handleSort('status')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">Estado</th>
                                        <th onClick={() => handleSort('qty')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors text-right">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-700">{p.name}</td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{p.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`
                                            px-2.5 py-1 rounded-full text-xs font-bold border
                                            ${p.status === 'En Stock' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        p.status === 'Bajo Stock' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                            'bg-slate-50 text-slate-400 border-slate-100'}
                                        `}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono font-medium">{p.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                No se encontraron productos que coincidan con "{searchTerm}"
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
