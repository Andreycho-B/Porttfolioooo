"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { Carousel } from './Carousel';
import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export function Scene() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className="w-full h-screen bg-transparent relative">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Suspense fallback={null}>
                        <fog attach="fog" args={['#050505', 5, 20]} />

                        {/* Atmospheric Lighting - Optimized (No Shadows) */}
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

                        {/* Content */}
                        <Carousel radius={3.5} onImageClick={setSelectedImage} />

                        {/* Environment - Lightweight Stars */}
                        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                        <Environment preset="city" />

                        {/* Controls */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate={false}
                            rotateSpeed={0.5}
                            minPolarAngle={Math.PI / 2.5}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Suspense>
                </Canvas>

                {/* UI Overlay */}
                <div className="absolute bottom-12 left-8 z-10 pointer-events-none">
                    <div className="h-px w-20 bg-indigo-500 mb-4" />
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 tracking-tighter mix-blend-difference">
                        Galería FX
                    </h1>
                    <p className="text-gray-400 text-sm mt-4 max-w-xs uppercase tracking-widest font-mono">
                        Colección Visual 2025 <br />
                        WebGL • React Three Fiber
                    </p>
                </div>
            </div>

            {/* Modal / Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <img
                                src={selectedImage}
                                alt="Gallery View"
                                className="w-full h-full object-contain rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
