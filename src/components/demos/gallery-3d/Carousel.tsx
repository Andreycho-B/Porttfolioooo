"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// 1. Defined list of the 10 custom images
const GALLERY_IMAGES = [
    "img_01.jpg",
    "img_02.jpg",
    "img_03.jpg",
    "img_04.jpg",
    "img_05.jpg",
    "img_06.jpg",
    "img_07.jpg",
    "img_08.jpg",
    "img_09.jpg",
    "img_10.jpg"
].map(name => ({
    url: `/images/gallery/${name}`,
    title: "Project " + name.replace(/\D/g, '') // Simple title "Project 01", "Project 02" etc.
}));

interface CardProps {
    url: string;
    title: string;
    position: [number, number, number];
    rotation: [number, number, number];
    index: number;
    onImageClick: (url: string) => void;
}

function Card({ url, title, position, rotation, index, onImageClick }: CardProps) {
    const ref = useRef<THREE.Group>(null);
    const [hovered, hover] = useState(false);

    useFrame((state, delta) => {
        if (ref.current) {
            // Smoothly animate scale on hover
            easing.damp3(ref.current.scale, hovered ? 1.2 : 1, 0.1, delta);

            // Add subtle floating motion (independent per card)
            const t = state.clock.elapsedTime + index * 1000;
            ref.current.position.y = position[1] + Math.sin(t / 2) * 0.1;
            ref.current.rotation.z = Math.sin(t / 3) * 0.05;
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation}
            onPointerOver={(e) => { e.stopPropagation(); hover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); hover(false); document.body.style.cursor = 'auto'; }}
            onClick={(e) => { e.stopPropagation(); onImageClick(url); }}
        >
            {/* Glass Frame Effect */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[1.7, 1.1]} />
                <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[1.75, 1.15]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={hovered ? 0.3 : 0} />
            </mesh>

            <Image url={url} transparent side={THREE.DoubleSide} radius={0.02} toneMapped={false}>
                <planeGeometry args={[1.6, 1]} />
            </Image>

            {hovered && (
                <Text
                    position={[0, -0.65, 0.05]}
                    fontSize={0.08}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.5}
                >
                    {title.toUpperCase()}
                </Text>
            )}
        </group>
    );
}

interface CarouselProps {
    radius?: number;
    onImageClick: (url: string) => void;
}

export function Carousel({ radius = 2.5, onImageClick }: CarouselProps) {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        // Continuous slow rotation logic
        if (group.current) {
            group.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={group}>
            {GALLERY_IMAGES.map((img, i) => {
                const count = GALLERY_IMAGES.length;
                // Helix / Spiral Logic
                // We spread them out vertically
                const ySpacing = 0.6;
                const y = (i - count / 2) * ySpacing;

                // Spiral angle
                const angle = (i / count) * Math.PI * 2 * 1.5; // 1.5 turns total
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                // Look at center-ish but slightly outwards
                const rot: [number, number, number] = [0, angle, 0];

                return (
                    <Card
                        key={i}
                        url={img.url}
                        title={img.title}
                        position={[x, y, z]}
                        rotation={rot}
                        index={i}
                        onImageClick={onImageClick}
                    />
                );
            })}
        </group>
    );
}
