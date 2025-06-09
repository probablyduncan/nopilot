import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const models = defineCollection({
    loader: file("src/content/models.yaml"),
    schema: z.array(z.string()),
});

const markdownResponses = defineCollection({
    loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/responses" }),
    schema: z.object({
        suggested: z.object({
            prompt: z.string(),
            input: z.string(),
        }).optional(),
        random: z.object({
            filter: z.string().optional(),
            vars: z.array(z.string()).optional(),
        }).or(z.boolean()).default(false),
    }),
})

export const collections = { models, responses: markdownResponses };