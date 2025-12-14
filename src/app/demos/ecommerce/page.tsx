"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Heart, Search, X, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
};

// --- Data ---
const PRODUCTS: Product[] = [
    { id: 1, name: "Chronos One", price: 299, category: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=688&auto=format&fit=crop", description: "Minimalist timepiece with Swiss movement." },
    { id: 2, name: "Beoplay H95", price: 899, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", description: "Adaptive ANC headphones with lambskin ear cushions." },
    { id: 3, name: "Nomad Backpack", price: 189, category: "Travel", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", description: "Water-resistant canvas with leather accents." },
    { id: 4, name: "Lumina Lamp", price: 149, category: "Home", image: "https://images.unsplash.com/photo-1513506003013-d53163215842?q=80&w=1000&auto=format&fit=crop", description: "Adjustable ambient lighting for modern spaces." },
    { id: 5, name: "Vogue Sunglasses", price: 159, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop", description: "UV protection with classic acetate frames." },
    { id: 6, name: "Studio Speaker", price: 399, category: "Audio", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000&auto=format&fit=crop", description: "High-fidelity sound in a compact form." },
];

const CATEGORIES = ["All", "Audio", "Watches", "Travel", "Home", "Accessories"];

export default function EcommerceDemo() {
    const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    const filteredProducts = activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQty = (productId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId) {
                return { ...item, qty: Math.max(0, item.qty + delta) };
            }
            return item;
        }).filter(item => item.qty > 0));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">

            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-neutral-100">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/proyectos">
                            <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-black tracking-tighter uppercase">Luxe.</h1>
                    </div>

                    <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-neutral-500">
                        {CATEGORIES.slice(0, 4).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`hover:text-black transition-colors ${activeCategory === cat ? 'text-black underline underline-offset-4' : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="hover:bg-neutral-100 rounded-full">
                            <Search size={20} />
                        </Button>
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-neutral-100 rounded-full"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <ShoppingBag size={20} />
                            </Button>
                            {cart.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                                >
                                    {cart.length}
                                </motion.span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 pt-32 pb-20 px-6 max-w-[1400px] mx-auto w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-neutral-200 pb-12"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                            ESSENTIALS <span className="text-neutral-300">2025</span>
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-md leading-relaxed">
                            Crafted for the modern minimalist. Eliminate the unnecessary and focus on what truly matters.
                        </p>
                    </div>

                    {/* Filter Pills (Mobile/Desktop) */}
                    <div className="flex flex-wrap gap-2 justify-end">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? 'bg-black text-white border-black'
                                    : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-black hover:text-black'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                className="group cursor-pointer flex flex-col gap-4"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-100 rounded-sm">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        >
                                            <Plus size={20} strokeWidth={3} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="w-12 h-12 bg-white/80 backdrop-blur text-black rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                        >
                                            <ArrowRight size={20} />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{product.category}</p>
                                        <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
                                    </div>
                                    <span className="text-lg font-medium">${product.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                                <h2 className="text-xl font-black uppercase tracking-tighter">Your Bag ({cart.length})</h2>
                                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                                    <X size={24} />
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-4">
                                        <ShoppingBag size={48} strokeWidth={1} />
                                        <p>Your bag is empty.</p>
                                        <Button variant="outline" onClick={() => setIsCartOpen(false)}>Start Shopping</Button>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <motion.div
                                            layout
                                            key={item.product.id}
                                            className="flex gap-4"
                                        >
                                            <div className="w-20 h-24 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                                                <img src={item.product.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-sm">{item.product.name}</h4>
                                                    <p className="text-xs text-neutral-500 mt-1">{item.product.category}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 bg-neutral-50 rounded-full px-2 py-1">
                                                        <button
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                            onClick={() => updateQty(item.product.id, -1)}
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                                                        <button
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                            onClick={() => updateQty(item.product.id, 1)}
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-sm">${item.product.price * item.qty}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                                <Button className="w-full bg-black text-white hover:bg-neutral-800 h-14 text-lg font-bold uppercase tracking-widest rounded-sm">
                                    Checkout
                                </Button>
                                <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest">
                                    Secure Checkout • Free Shipping
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
