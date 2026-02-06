import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, name, description, tech_stack, github_url, live_url, thumbnail } = project;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:scale-[1.02] pt-0">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg border-b-3 border-gray-100">
        <Image
          src={thumbnail || '/images/thumbnailPlaceholder.png'}
          alt={`${name} thumbnail`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl ">{name}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {tech_stack && tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link href={`/projects/${slug}`} className="flex-1">
            <Button variant="default" className="w-full">
              자세히 보기
            </Button>
          </Link>
          {github_url && (
            <Link href={github_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {live_url && (
            <Link href={live_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
