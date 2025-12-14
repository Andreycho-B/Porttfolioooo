
import { Code2, Globe, Terminal, Cloud, Database, Layers, Cpu } from "lucide-react";

export type Project = {
    slug: string;
    title: string;
    category: string;
    overview: string;
    problem: string;
    solution: string;
    role: string[];
    techStack: string[];
    technicalDecisions: {
        title: string;
        description: string;
    }[];
    evidence: {
        images: string[];
        demoUrl?: string;
        codeUrl?: string;
    };
};

export const PROJECTS: Project[] = [
    {
        slug: "dashboard-empresarial",
        title: "Dashboard Analítico Empresarial",
        category: "Full Stack / Data",
        overview: "Una plataforma centralizada para la visualización de KPIs en tiempo real, diseñada para reducir el tiempo de generación de reportes manuales en un 40%.",
        problem: "El cliente dependía de hojas de cálculo desconectadas y reportes estáticos que tardaban horas en generarse, impidiendo la toma de decisiones ágil.",
        solution: "Desarrollamos un panel web interactivo que agrega datos de múltiples fuentes en tiempo real, ofreciendo gráficos dinámicos y exportación automatizada.",
        role: ["Diseño de Arquitectura", "Desarrollo Frontend con D3.js", "Optimización de Consultas SQL"],
        techStack: ["Next.js", "TypeScript", "D3.js", "PostgreSQL", "Tailwind CSS"],
        technicalDecisions: [
            {
                title: "Renderizado Híbrido (SSG + CSR)",
                description: "Utilizamos Static Site Generation para la estructura base y Client Side Rendering para los gráficos en vivo, balanceando SEO y reactividad."
            },
            {
                title: "Librería de Gráficos Modular",
                description: "Encapsulamos D3.js en componentes de React reutilizables para mantener la consistencia visual y facilitar futuras expansiones."
            }
        ],
        evidence: {
            images: ["/images/project-dashboard-v2.png"],
            demoUrl: "/demos/dashboard",
            codeUrl: "#"
        }
    },
    {
        slug: "plataforma-ecommerce",
        title: "E-Commerce Headless Escalable",
        category: "E-Commerce / Backend",
        overview: "Infraestructura de comercio desacoplada (Headless) capaz de manejar picos de tráfico y gestionar inventario distribuido.",
        problem: "La solución anterior (monolito) colapsaba durante eventos de alta demanda y limitaba la personalización del frontend.",
        solution: "Implementamos una arquitectura Headless donde el frontend (Next.js) consume una API robusta, permitiendo escabilidad independiente y experiencias de usuario ricas.",
        role: ["Modelado de Base de Datos", "Desarrollo de API REST", "Integración de Pasarela de Pagos"],
        techStack: ["React", "Node.js", "Express", "Redis", "Stripe API"],
        technicalDecisions: [
            {
                title: "Caché con Redis",
                description: "Implementamos una capa de caché para las consultas de productos más frecuentes, reduciendo la carga en la base de datos principal en un 60%."
            },
            {
                title: "Optimistic UI Update",
                description: "Actualizamos el carrito visualmente antes de confirmar con el servidor para una sensación de velocidad instantánea."
            }
        ],
        evidence: {
            images: ["/images/project-ecommerce-v2.png"],
            demoUrl: "/demos/ecommerce",
            codeUrl: "#"
        }
    },
    {
        slug: "crispybot-ai",
        title: "CrispyBot: Asistente de Pedidos",
        category: "AI / NLP",
        overview: "Un chatbot inteligente para automatizar la toma de pedidos en restaurantes de comida rápida, reduciendo errores humanos.",
        problem: "La toma de pedidos telefónicos era lenta y propensa a errores, afectando la satisfacción del cliente.",
        solution: "Un bot entrenado con lógica de NLP simple que guía al usuario, sugiere adicionales (upselling) y confirma la orden estructurada.",
        role: ["Lógica de NLP", "Gestión de Estado (Carrito)", "Diseño de Interfaz Conversacional"],
        techStack: ["React", "Custom NLP Logic", "Tailwind CSS", "Zustand"],
        technicalDecisions: [
            {
                title: "Procesamiento en el Cliente",
                description: "Para este demo, la lógica de NLP se ejecuta en el navegador para garantizar privacidad y cero latencia, sin costos de servidor."
            },
            {
                title: "Matching Difuso (Fuzzy Logic)",
                description: "Implementamos algoritmos de distancia de Levenshtein para entender errores tipográficos de los usuarios."
            }
        ],
        evidence: {
            images: ["/images/project-orderbot.png"],
            demoUrl: "/demos/ai-generator",
            codeUrl: "#"
        }
    },
    {
        slug: "sistema-inventario",
        title: "Sistema de Gestión Logística",
        category: "SaaS / Internal Tool",
        overview: "Herramienta web para el control de inventarios multi-bodega con alertas de stock bajo y trazabilidad de movimientos.",
        problem: "La gestión manual provocaba pérdidas de stock y quiebres de inventario no detectados a tiempo.",
        solution: "Un sistema centralizado que rastrea entradas y salidas, genera alertas automáticas y provee reportes de rotación.",
        role: ["Arquitectura de Base de Datos", "Autenticación & Roles", "Desarrollo de Interfaz"],
        techStack: ["Next.js", "Supabase (Auth/DB)", "Recharts", "React Hook Form"],
        technicalDecisions: [
            {
                title: "Supabase como Backend-as-a-Service",
                description: "Elegimos Supabase para acelerar el desarrollo del backend, aprovechando sus políticas de seguridad (RLS) nativas."
            },
            {
                title: "Validación de Formularios Estricta",
                description: "Uso de Zod para asegurar la integridad de los datos de entrada antes de tocar la base de datos."
            }
        ],
        evidence: {
            images: ["/images/project-inventory-v2.png"],
            demoUrl: "/demos/inventario",
            codeUrl: "#"
        }
    },
    {
        slug: "fitness-tracker",
        title: "Social Fitness Tracker",
        category: "Mobile First / Social",
        overview: "Una PWA (Progressive Web App) que gamifica el entrenamiento personal permitiendo compartir logros con amigos.",
        problem: "Las apps existentes eran demasiado complejas o solitarias, desmotivando a los usuarios principiantes.",
        solution: "Una interfaz simplificada enfocada en la consistencia diaria y la interacción social positiva.",
        role: ["Diseño UX/UI Mobile First", "Integración de Base de Datos Realtime", "Gamificación"],
        techStack: ["React", "Firebase Realtime DB", "Framer Motion", "PWA"],
        technicalDecisions: [
            {
                title: "PWA Offline-First",
                description: "Arquitectura diseñada para permitir el registro de ejercicios incluso sin conexión a internet, sincronizando al volver."
            },
            {
                title: "Firebase Observers",
                description: "Suscripciones a datos en tiempo real para reflejar 'likes' y comentarios instantáneamente."
            }
        ],
        evidence: {
            images: ["/images/project-fitness-v2.png"],
            demoUrl: "/demos/fitness",
            codeUrl: "#"
        }
    },
    {
        slug: "portafolio-personal",
        title: "Portafolio Profesional 2024",
        category: "Web Design / Brand",
        overview: "La plataforma que estás visitando. Un escaparate de capacidades técnicas y sensibilidad de diseño.",
        problem: "Necesidad de diferenciar nuestro perfil técnico en un mercado saturado de plantillas genéricas.",
        solution: "Un sitio web hecho a medida, optimizado para conversión y performance (Lighthouse 100), con estética editorial.",
        role: ["Diseño UI/UX", "Desarrollo Frontend", "Optimización de Performance"],
        techStack: ["Next.js 15", "Tailwind CSS v4", "Framer Motion", "TypeScript"],
        technicalDecisions: [
            {
                title: "Componentes Modulares",
                description: "Arquitectura basada en componentes pequeños y reutilizables para facilitar el mantenimiento y testing."
            },
            {
                title: "Animaciones Performantes",
                description: "Uso exclusivo de propiedades 'transform' y 'opacity' en animaciones para evitar repaints costosos."
            }
        ],
        evidence: {
            images: ["/images/project-portfolio-v2.png"],
            demoUrl: "/",
            codeUrl: "#"
        }
    }
];
