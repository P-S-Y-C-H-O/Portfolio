/* Screenshots with captions. Alt text is required by the schema; renders nothing for an empty list. */
import type { Project } from "@/data/schema";

export function ProjectGallery({ images }: { images: NonNullable<Project["gallery"]> }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {images.map((image) => (
        <li key={image.src}>
          <figure>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full border border-line bg-surface"
            />
            {image.caption && <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
