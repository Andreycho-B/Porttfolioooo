import { PROJECTS } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ProjectDetailClient slug={slug} />;
}
