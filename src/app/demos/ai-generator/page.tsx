"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Bot, User, Utensils, ShoppingBag, Receipt, ChefHat, Plus, Minus, X, Coffee, IceCream, Flame } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---

type Category = 'combos' | 'sides' | 'drinks' | 'desserts';

type MenuItem = {
    id: string;
    name: string;
    price: number;
    category: Category;
    image?: string;
    keywords: string[];
    description: string;
};

type OrderItem = MenuItem & {
    qty: number;
};

type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
    type?: 'text' | 'menu_grid' | 'bill' | 'upsell' | 'product_list';
    data?: any; // For flexible payload (e.g. list of items to show)
};

// --- Data ---

const MENU_ITEMS: MenuItem[] = [
    { id: 'c1', name: 'Mega Box Clásico', price: 25900, category: 'combos', keywords: ['clasico', 'clásico', 'mega', 'box'], description: '4 Piezas de pollo, papas y ensalada.' },
    { id: 'c2', name: 'Combo Picante 🔥', price: 28500, category: 'combos', keywords: ['picante', 'hot', 'spicy'], description: '4 Alas picantes + hamburguesa spicy.' },
    { id: 'c3', name: 'Bucket Familiar', price: 45000, category: 'combos', keywords: ['bucket', 'familiar', 'balde', 'cubo'], description: '10 Piezas mixtas + 2 papas grandes.' },
    { id: 's1', name: 'Papas Fritas', price: 5500, category: 'sides', keywords: ['papas', 'fritas'], description: 'Crocantes y doraditas.' },
    { id: 's2', name: 'Aros de Cebolla', price: 6500, category: 'sides', keywords: ['aros', 'cebolla', 'onion'], description: 'Con salsa ranch.' },
    { id: 'd1', name: 'Refresco Grande', price: 4000, category: 'drinks', keywords: ['refresco', 'gaseosa', 'cola', 'bebida', 'coca'], description: '1.5 Litros.' },
    { id: 'd2', name: 'Limonada Cereza', price: 5000, category: 'drinks', keywords: ['limonada', 'jugo'], description: 'Natural y refrescante.' },
    { id: 'e1', name: 'McFlurry Oreo', price: 7500, category: 'desserts', keywords: ['helado', 'postre', 'oreo'], description: 'Helado cremoso con galleta.' },
];

const CATEGORIES: { id: Category; label: string; icon: any }[] = [
    { id: 'combos', label: 'Combos', icon: Flame },
    { id: 'sides', label: 'Acompañantes', icon: Utensils },
    { id: 'drinks', label: 'Bebidas', icon: Coffee },
    { id: 'desserts', label: 'Postres', icon: IceCream },
];

// --- Quick Actions ---
const QUICK_ACTIONS = [
    "Ver el Menú 🍔",
    "Recomiéndame algo",
    "Ver mi carrito",
    "Finalizar pedido 💳"
];

// --- Utils (Fuzzy Match / NLP) ---

const levenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b[i - 1] === a[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[b.length][a.length];
};

const isMatch = (input: string, keyword: string) => {
    if (input.includes(keyword)) return true;
    const threshold = keyword.length > 4 ? 2 : 1;
    // Check if any word in input matches the keyword closely
    return input.split(' ').some(word => levenshtein(word, keyword) <= threshold);
};

export default function OrderBotDemo() {
    const [prompt, setPrompt] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            role: 'ai',
            content: "¡Hola! Soy CrispyBot 🍗. Estoy aquí para tomar tu orden. ¿Qué te provoca hoy? ",
            timestamp: new Date()
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const addToCart = (item: MenuItem, qty: number = 1) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { ...item, qty }];
        });
    };

    const updateQty = (itemId: string, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.id === itemId) return { ...i, qty: Math.max(0, i.qty + delta) };
            return i;
        }).filter(i => i.qty > 0));
    };

    const getAIResponse = (input: string): Partial<Message> => {
        const lower = input.toLowerCase();

        // 1. Menu Grid Intent (Show Categories)
        // Exclude strict category names to avoid conflict with Category View
        const isCategoryRequest = ['combos', 'acompañantes', 'bebidas', 'postres'].some(c => isMatch(lower, c));
        if (['menu', 'menú', 'ver', 'carta', 'lista'].some(k => isMatch(lower, k)) && !isCategoryRequest) {
            return {
                content: "¡Nuestra carta está buenísima! Aquí tienes las categorías principales:",
                type: 'menu_grid'
            };
        }

        // 2. Category View Intent (Show specific items e.g. "Muéstrame Combos")
        const categoryMap: { [key: string]: Category } = {
            'combos': 'combos', 'cajas': 'combos', 'baldes': 'combos',
            'acompañantes': 'sides', 'papas': 'sides', 'lados': 'sides',
            'bebidas': 'drinks', 'jugos': 'drinks', 'refrescos': 'drinks', 'tomar': 'drinks',
            'postres': 'desserts', 'helados': 'desserts', 'dulce': 'desserts'
        };

        const foundCategoryKeyword = Object.keys(categoryMap).find(k => isMatch(lower, k));
        if (foundCategoryKeyword) {
            const catId = categoryMap[foundCategoryKeyword];
            const items = MENU_ITEMS.filter(i => i.category === catId);
            const catLabel = CATEGORIES.find(c => c.id === catId)?.label;

            return {
                content: `Aquí tienes nuestros ${catLabel} más deliciosos:`,
                type: 'product_list',
                data: items
            };
        }

        // 3. Add to Cart Intent (Product Logic)
        let detected: string[] = [];
        MENU_ITEMS.forEach(item => {
            if (item.keywords.some(k => isMatch(lower, k))) {
                addToCart(item);
                detected.push(item.name);
            }
        });

        if (detected.length > 0) {
            // Upselling: If ordered combo but no drink
            const hasDrink = cart.some(i => i.category === 'drinks') || detected.some(name => MENU_ITEMS.find(i => i.name === name)?.category === 'drinks');

            if (!hasDrink && Math.random() > 0.3) {
                const drinkSuggestion = MENU_ITEMS.find(i => i.id === 'd2');
                return {
                    content: `Agregué ${detected.join(', ')} a tu pedido. 🛒\n\n¿Te gustaría agregar una **${drinkSuggestion?.name}** para acompañar?`,
                    type: 'upsell',
                    data: drinkSuggestion
                };
            }
            return { content: `¡Listo! Agregué ${detected.join(', ')}. ¿Algo más?` };
        }

        // 4. Checkout / Bill
        if (['cuenta', 'pagar', 'total', 'fin', 'listo'].some(k => isMatch(lower, k))) {
            if (cart.length === 0) return { content: "Tu carrito está vacío. ¡Antójate de algo del menú primero!" };
            return { content: "¡Excelente! Aquí tienes el resumen de tu pedido:", type: 'bill' };
        }

        // 5. Cart Status
        if (['carrito', 'llevo', 'cesta'].some(k => isMatch(lower, k))) {
            if (cart.length === 0) return { content: "Aún no tienes nada en el carrito." };
            return { content: "Esto es lo que llevas hasta ahora:", type: 'bill' };
        }

        // 6. Recommend
        if (['recomienda', 'recomiéndame', 'recomiendame', 'sugerencia', 'top', 'favorito', 'algo'].some(k => isMatch(lower, k))) {
            const randomItem = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)];
            return {
                content: `¡El **${randomItem.name}** es el favorito del Chef hoy! 👨‍🍳\n¿Te lo pido?`,
                type: 'upsell',
                data: randomItem
            };
        }

        // Fallback
        return { content: "No estoy seguro de qué es eso. 🤔 Intenta pedir 'Ver menú' o nombra el producto (ej. 'Combo Picante')." };
    };

    const handleSend = (text: string = prompt) => {
        if (!text.trim()) return;
        setPrompt("");

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        }]);

        setIsTyping(true);

        setTimeout(() => {
            const response = getAIResponse(text);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: response.content || "...",
                type: response.type,
                data: response.data,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="min-h-screen bg-orange-50 font-sans flex flex-col text-slate-800">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md p-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <Link href="/proyectos">
                        <Button variant="ghost" size="icon" className="hover:bg-orange-100 text-orange-600 rounded-full">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                <ChefHat size={22} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h1 className="font-bold text-base leading-none">CrispyBot 2.0</h1>
                            <p className="text-[10px] text-slate-500 font-medium mt-1">Siempre caliente, siempre rápido</p>
                        </div>
                    </div>
                </div>
                <motion.div layout className="bg-orange-100/50 p-1 pr-3 rounded-full flex items-center gap-2 border border-orange-200">
                    <div className="bg-white p-1.5 rounded-full shadow-sm text-orange-600">
                        <ShoppingBag size={18} />
                    </div>
                    <span className="font-bold text-sm text-orange-900 mx-1">
                        ${total.toLocaleString()}
                    </span>
                </motion.div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 p-4 pb-32 overflow-y-auto w-full max-w-xl mx-auto">
                <div className="space-y-6">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0 mt-2 border border-orange-200">
                                    <Bot size={15} className="text-orange-600" />
                                </div>
                            )}

                            <div className={`max-w-[85%] space-y-2`}>
                                {/* Bubble */}
                                <div className={`p-4 shadow-sm text-sm relative ${msg.role === 'user'
                                    ? 'bg-gradient-to-tr from-orange-500 to-orange-600 text-white rounded-2xl rounded-tr-none'
                                    : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>

                                {/* --- Message Attributes --- */}

                                {/* 1. Menu Grid */}
                                {msg.type === 'menu_grid' && (
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleSend(`Muéstrame ${cat.label}`)}
                                                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all text-left flex flex-col gap-2 group"
                                            >
                                                <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                                    <cat.icon size={16} />
                                                </div>
                                                <span className="font-bold text-xs text-slate-700">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 2. Product List (Category View) - NEW */}
                                {msg.type === 'product_list' && msg.data && (
                                    <div className="flex flex-col gap-2 mt-2">
                                        {msg.data.map((item: MenuItem) => (
                                            <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                                                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                                    {item.category === 'combos' ? '🍗' : item.category === 'drinks' ? '🥤' : item.category === 'desserts' ? '🍦' : '🍟'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
                                                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.description}</p>
                                                    <p className="text-xs text-orange-600 font-bold mt-1">${item.price.toLocaleString()}</p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white p-0"
                                                    onClick={() => {
                                                        addToCart(item);
                                                        handleSend(`Quiero ${item.name}`);
                                                    }}
                                                >
                                                    <Plus size={16} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 3. Upsell Card */}
                                {msg.type === 'upsell' && msg.data && (
                                    <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-md mt-2 flex items-center gap-3 max-w-[280px]">
                                        <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                            🍔
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm truncate">{msg.data.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium">${msg.data.price.toLocaleString()}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 p-0 shadow-lg shadow-orange-500/30"
                                            onClick={() => {
                                                addToCart(msg.data);
                                                handleSend(`¡Sí, agrega ${msg.data.name}!`);
                                            }}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                )}

                                {/* 4. Bill / Cart */}
                                {(msg.type === 'bill' || (msg as any).isBill) && (
                                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-64 mt-2">
                                        <div className="bg-slate-50 p-4 border-b border-dashed border-slate-200 flex flex-col items-center">
                                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                                <Receipt size={20} />
                                            </div>
                                            <h3 className="font-bold text-slate-800">Tu Pedido</h3>
                                        </div>
                                        <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                                            {cart.length === 0 ? (
                                                <p className="text-center text-xs text-slate-400 italic">Nada por aquí...</p>
                                            ) : (
                                                cart.map(item => (
                                                    <div key={item.id} className="flex justify-between items-center text-sm group">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-orange-600 w-4">{item.qty}x</span>
                                                            <span className="text-slate-600 truncate max-w-[100px]">{item.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-xs">${(item.price * item.qty).toLocaleString()}</span>
                                                            <button
                                                                onClick={() => updateQty(item.id, -1)}
                                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                            <div className="h-px bg-slate-100 my-2"></div>
                                            <div className="flex justify-between font-bold text-lg text-slate-900">
                                                <span>Total</span>
                                                <span>${total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-slate-50">
                                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-green-600/20 shadow-lg">
                                                Pagar Ahora
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <Bot size={15} className="text-orange-600" />
                            </div>
                            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm w-fit">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 pb-safe">
                {/* Quick Actions */}
                <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-pl-4">
                    <div className="w-2 flex-shrink-0" /> {/* Spacer */}
                    {QUICK_ACTIONS.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(action)}
                            className="flex-shrink-0 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors whitespace-nowrap"
                        >
                            {action}
                        </button>
                    ))}
                    <div className="w-2 flex-shrink-0" /> {/* Spacer */}
                </div>

                {/* Input Field */}
                <div className="p-3 pb-4 max-w-xl mx-auto flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu orden aqui..."
                            className="w-full bg-slate-100 border-0 text-slate-900 placeholder:text-slate-400 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all pr-10"
                        />
                    </div>
                    <Button
                        onClick={() => handleSend()}
                        disabled={!prompt.trim() || isTyping}
                        size="icon"
                        className="rounded-2xl h-12 w-12 bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 flex-shrink-0"
                    >
                        <Send size={20} className={isTyping ? "opacity-50" : ""} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
