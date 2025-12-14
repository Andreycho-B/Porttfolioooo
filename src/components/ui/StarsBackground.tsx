"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    velocity: number;
    color: string;
}

interface NebulaCloud {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: { x: number, y: number };
}

interface CursorStar extends Star {
    vx: number;
    vy: number;
    followSpeed: number;
    offsetX: number;
    offsetY: number;
}

export function StarsBackground() {
    const pathname = usePathname();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });

    // Determine if we should render based on path
    // We render on ALL pages EXCEPT demos that aren't the gallery
    // Gallery is "/demos/gallery-3d", so we let that one pass
    const isDemo = pathname?.startsWith("/demos");
    const isGallery = pathname === "/demos/gallery-3d";
    const shouldRender = !isDemo || isGallery;

    useEffect(() => {
        if (!shouldRender) return;

        const handleResize = () => {
            if (typeof window !== "undefined") {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [shouldRender]);

    useEffect(() => {
        if (!shouldRender) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // --- 1. Background Stars ---
        const stars: Star[] = [];
        const numStars = Math.floor((dimensions.width * dimensions.height) / 7000); // Significantly reduced density for performance

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                radius: Math.random() * 1.1, // Slightly smaller max radius
                alpha: Math.random(),
                velocity: (Math.random() - 0.5) * 0.1,
                color: Math.random() > 0.85 ? '#a5f3fc' : '#ffffff' // 15% slight cyan stars
            });
        }

        // --- 2. Nebula Clouds (Optimized) ---
        const clouds: NebulaCloud[] = [
            // Top Right - Cyan/Teal (Very Subtle)
            {
                x: dimensions.width,
                y: 0,
                radius: 800,
                color: 'rgba(56, 189, 248, 0.04)', // Very low opacity
                velocity: { x: -0.05, y: 0.05 }
            },
            // Bottom Left - Violet/Purple (Very Subtle)
            {
                x: 0,
                y: dimensions.height,
                radius: 900,
                color: 'rgba(76, 29, 149, 0.05)', // Very low opacity
                velocity: { x: 0.05, y: -0.05 }
            },
        ];

        // --- 3. Cursor Following Stars (Swarm) ---
        const cursorStars: CursorStar[] = [];
        const numCursorStars = 35; // Increased count for better "cloud" density

        for (let i = 0; i < numCursorStars; i++) {
            cursorStars.push({
                x: Math.random() * dimensions.width, // Start random
                y: Math.random() * dimensions.height,
                radius: Math.random() * 1.5 + 0.5, // Slightly larger variation
                alpha: Math.random() * 0.3 + 0.1, // Much fainter (0.1 - 0.4)
                velocity: 0,
                color: '#e0f2fe', // Bright Sky Blue
                vx: 0,
                vy: 0,
                followSpeed: Math.random() * 0.01 + 0.005, // Very slow drift
                offsetX: (Math.random() - 0.5) * 300, // Very wide spread (300px range)
                offsetY: (Math.random() - 0.5) * 300
            });
        }

        let animationFrameId: number;
        let time = 0;

        const render = () => {
            time += 0.01;

            // Clear / Draw Background
            ctx.fillStyle = "#020617"; // Slate 950 (Deep Space Black)
            ctx.fillRect(0, 0, dimensions.width, dimensions.height);

            // A. Draw Nebula Clouds
            clouds.forEach(cloud => {
                const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
                gradient.addColorStop(0, cloud.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
                ctx.fill();

                // Move clouds very slowly
                cloud.x += cloud.velocity.x;
                cloud.y += cloud.velocity.y;

                // Simple bound check to keep them somewhat near corners is fine,
                // but let's just let them drift slowly as floating dust.
                // Reset if too far
                if (cloud.x < -cloud.radius * 1.5) cloud.x = dimensions.width + cloud.radius;
                if (cloud.x > dimensions.width + cloud.radius * 1.5) cloud.x = -cloud.radius;
            });

            // B. Draw Background Stars
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.alpha; // Use global alpha for twinkling
                ctx.fill();
                ctx.globalAlpha = 1.0; // Reset

                // Twinkle
                star.alpha += (Math.random() - 0.5) * 0.02;
                if (star.alpha < 0.1) star.alpha = 0.1;
                if (star.alpha > 0.8) star.alpha = 0.8;

                // Move
                star.x += star.velocity;
                star.y += star.velocity;

                // Wrap
                if (star.x < 0) star.x = dimensions.width;
                if (star.x > dimensions.width) star.x = 0;
                if (star.y < 0) star.y = dimensions.height;
                if (star.y > dimensions.height) star.y = 0;
            });

            // C. Draw Cursor Stars (Scattered Swarm)
            cursorStars.forEach((star, index) => {
                // Dynamic Offset: Gently orbit or drift relative to mouse
                // We use sine waves based on time and index to make them "breathe"
                const dynamicOffsetX = star.offsetX + Math.sin(time + index) * 20;
                const dynamicOffsetY = star.offsetY + Math.cos(time + index * 0.5) * 20;

                const targetX = mouseRef.current.x + dynamicOffsetX;
                const targetY = mouseRef.current.y + dynamicOffsetY;

                // Physics: Accelerate towards target offset
                const dx = targetX - star.x;
                const dy = targetY - star.y;

                star.vx += dx * star.followSpeed;
                star.vy += dy * star.followSpeed;

                // Friction
                star.vx *= 0.94;
                star.vy *= 0.94;

                // Update position
                star.x += star.vx;
                star.y += star.vy;

                // Render
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color; // Cyan-ish
                ctx.globalAlpha = star.alpha;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, shouldRender]);

    if (!shouldRender) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
}
