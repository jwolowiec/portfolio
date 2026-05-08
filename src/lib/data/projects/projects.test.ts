import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import { getLocalizedProjects } from './projects';
import prisma from '@/lib/prisma/prisma';
import { defaultLocale } from '@/constants/locales';

vi.mock('@/lib/prisma/prisma', () => ({
    default: {
        project: {
            findMany: vi.fn(),
        },
    },
}));

describe('getLocalizedProjects', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls Prisma with the correct query to filter out projects without labels', async () => {
        (prisma.project.findMany as Mock).mockResolvedValue([]);

        await getLocalizedProjects('en');

        expect(prisma.project.findMany).toHaveBeenCalledWith({
            where: {
                labels: {
                    some: {}
                }
            },
            include: {
                image: true,
                labels: true,
            }
        });
    });

    it('returns a project with the label in the requested target language', async () => {
        const mockProjects = [
            {
                id: 'proj-1',
                labels: [
                    { language: 'en', name: 'English Title' },
                    { language: 'pl', name: 'Polish Title' },
                ],
            },
        ];
        (prisma.project.findMany as Mock).mockResolvedValue(mockProjects);

        const result = await getLocalizedProjects('pl');

        expect(result).toHaveLength(1);
        expect(result[0].label.language).toBe('pl');
        expect(result[0].label.name).toBe('Polish Title');
    });

    it('falls back to the default language when the requested translation is missing', async () => {
        const mockProjects = [
            {
                id: 'proj-2',
                labels: [
                    { language: defaultLocale, name: 'Default Title' },
                    { language: 'de', name: 'German Title' }
                ],
            },
        ];
        (prisma.project.findMany as Mock).mockResolvedValue(mockProjects);

        const result = await getLocalizedProjects('fr');

        expect(result).toHaveLength(1);
        expect(result[0].label.language).toBe(defaultLocale);
        expect(result[0].label.name).toBe('Default Title');
    });

    it('falls back to the first available label if both requested and default languages are missing', async () => {
        const mockProjects = [
            {
                id: 'proj-3',
                labels: [
                    { language: 'es', name: 'Spanish Title' },
                ],
            },
        ];
        (prisma.project.findMany as Mock).mockResolvedValue(mockProjects);

        const result = await getLocalizedProjects('pl');

        expect(result).toHaveLength(1);
        expect(result[0].label.language).toBe('es');
        expect(result[0].label.name).toBe('Spanish Title');
    });
});