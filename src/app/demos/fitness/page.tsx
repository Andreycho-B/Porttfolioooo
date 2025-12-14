"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, Flame, Trophy, User, Heart, MessageCircle, Share2, MapPin } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FitnessDemo() {
    const [activeTab, setActiveTab] = useState<'activity' | 'social'>('activity');
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    const toggleLike = (id: number) => {
        if (likedPosts.includes(id)) {
            setLikedPosts(likedPosts.filter(postId => postId !== id));
        } else {
            setLikedPosts([...likedPosts, id]);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans flex justify-center items-center p-4">
            {/* Phone Mockup Frame */}
            <div className="w-full max-w-sm bg-black rounded-[50px] border-8 border-neutral-900 overflow-hidden shadow-2xl relative h-[850px] flex flex-col ring-1 ring-white/10">

                {/* Header */}
                <div className="p-6 pt-12 flex justify-between items-center bg-transparent z-10">
                    <Link href="/proyectos">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <h1 className="font-bold text-lg tracking-tight">FitLife Pro</h1>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 border-2 border-black flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-lime-500/20">
                        DN
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    <AnimatePresence mode="wait">
                        {activeTab === 'activity' ? (
                            <motion.div
                                key="activity"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 space-y-8"
                            >
                                {/* Activity Rings */}
                                <div className="flex justify-center py-6 relative">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-lime-500/10 blur-3xl rounded-full transform scale-75" />

                                    <div className="relative w-56 h-56 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            {/* Ring 1: Move */}
                                            <circle cx="112" cy="112" r="100" strokeWidth="20" stroke="#262626" fill="transparent" />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 628 }}
                                                animate={{ strokeDashoffset: 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                cx="112" cy="112" r="100" strokeWidth="20" stroke="#ef4444" fill="transparent" strokeDasharray="628" strokeLinecap="round"
                                            />

                                            {/* Ring 2: Exercise */}
                                            <circle cx="112" cy="112" r="76" strokeWidth="20" stroke="#262626" fill="transparent" />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 477 }}
                                                animate={{ strokeDashoffset: 120 }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                cx="112" cy="112" r="76" strokeWidth="20" stroke="#84cc16" fill="transparent" strokeDasharray="477" strokeLinecap="round"
                                            />

                                            {/* Ring 3: Stand */}
                                            <circle cx="112" cy="112" r="52" strokeWidth="20" stroke="#262626" fill="transparent" />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 326 }}
                                                animate={{ strokeDashoffset: 60 }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                                cx="112" cy="112" r="52" strokeWidth="20" stroke="#06b6d4" fill="transparent" strokeDasharray="326" strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <Flame className="text-red-500 mb-2 drop-shadow-md" size={32} />
                                            <span className="text-5xl font-black italic tracking-tighter">840</span>
                                            <span className="text-sm font-medium text-red-500/80 tracking-widest mt-1">KCALS</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="bg-neutral-900/80 p-5 rounded-3xl relative overflow-hidden backdrop-blur-sm border border-white/5"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-20 text-lime-400">
                                            <Activity size={70} />
                                        </div>
                                        <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Tiempo</span>
                                        <p className="text-3xl font-bold text-lime-400 mt-2">45<span className="text-lg text-lime-400/60 ml-1">min</span></p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="bg-neutral-900/80 p-5 rounded-3xl backdrop-blur-sm border border-white/5"
                                    >
                                        <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Pasos</span>
                                        <p className="text-3xl font-bold text-cyan-400 mt-2">8,243</p>
                                    </motion.div>
                                </div>

                                {/* Recent Activity */}
                                <div>
                                    <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                                        Hoy
                                        <span className="text-xs text-lime-400 bg-lime-400/10 px-2 py-1 rounded-full">3 Objetivos</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 + (i * 0.1) }}
                                                className="flex items-center gap-4 bg-neutral-900/50 hover:bg-neutral-800 transition-colors p-4 rounded-2xl border border-white/5 cursor-pointer"
                                            >
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${i === 1 ? 'bg-red-500/20 text-red-500' : i === 2 ? 'bg-lime-500/20 text-lime-500' : 'bg-cyan-500/20 text-cyan-500'}`}>
                                                    {i === 1 ? '🏃' : i === 2 ? '🏋️' : '🧘'}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm tracking-wide">{i === 1 ? 'Running Matutino' : i === 2 ? 'Pesas' : 'Yoga Flow'}</h4>
                                                    <p className="text-xs text-neutral-400 mt-1">08:00 AM • 450 kcal</p>
                                                </div>
                                                <Trophy size={18} className="text-yellow-500/80" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="social"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-6 space-y-6 pt-2"
                            >
                                <h2 className="text-2xl font-bold mb-4">Feed Social</h2>
                                {[1, 2].map((post) => (
                                    <div key={post} className="bg-neutral-900 rounded-3xl p-5 border border-white/5">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post}`} alt="User" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">Sarah Connor</h4>
                                                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                                                        <MapPin size={10} /> Central Park, NY
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-neutral-500">2h</span>
                                        </div>

                                        <div className="mb-4 relative rounded-2xl overflow-hidden h-40 bg-neutral-800 flex items-center justify-center">
                                            {/* Using a placeholder or CSS art for post image */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-20" />
                                            <div className="text-center z-10">
                                                <span className="text-4xl block mb-2">🏃‍♀️</span>
                                                <span className="font-black text-2xl italic">10.5 KM</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-neutral-300 mb-4">
                                            Gran carrera matutina! Rompiendo mi récord personal hoy. 🔥 #running #morning
                                        </p>

                                        <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                                            <button
                                                onClick={() => toggleLike(post)}
                                                className={`flex items-center gap-2 text-sm transition-colors ${likedPosts.includes(post) ? 'text-red-500' : 'text-neutral-400 hover:text-white'}`}
                                            >
                                                <Heart size={20} fill={likedPosts.includes(post) ? "currentColor" : "none"} />
                                                {likedPosts.includes(post) ? 125 : 124}
                                            </button>
                                            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                                                <MessageCircle size={20} /> 12
                                            </button>
                                            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors ml-auto">
                                                <Share2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Nav */}
                <div className="h-24 bg-neutral-900/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-start pt-6 px-6 z-20">
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'activity' ? 'text-lime-400' : 'text-neutral-600 hover:text-neutral-400'}`}
                    >
                        <Activity size={24} />
                        <span className="text-[10px] font-bold">Actividad</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('social')}
                        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'social' ? 'text-lime-400' : 'text-neutral-600 hover:text-neutral-400'}`}
                    >
                        <div className="relative">
                            <User size={24} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-neutral-900" />
                        </div>
                        <span className="text-[10px] font-bold">Social</span>
                    </button>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-30" />
            </div>
        </div>
    );
}
