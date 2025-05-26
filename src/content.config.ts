import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const models = defineCollection({
    loader: file("src/content/models.yaml"),
    schema: z.array(z.string()),
});

const suggestedPromps = defineCollection({
    loader: file("src/content/suggested-promps.yaml"),
    schema: z.string(),
});

export const collections = { models, suggestedPromps };