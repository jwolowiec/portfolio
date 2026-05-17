import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLocalizedProjects, getLocalizedProjectById } from './projects';
import prisma from '@/lib/prisma/prisma';

vi.mock('@/lib/prisma/prisma', () => ({
    default: {
        project: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
        },
    },
}));

describe('Projects Data Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockProjectFromDb = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: { id: 'img-1', url: 'image.jpg' },
        labels: [
            { id: 'lbl-1', language: 'en', name: 'Test EN', description: 'Desc EN', slug: 'test-en', projectId: '1' }
        ]
    };

    describe('getLocalizedProjects', () => {
        it('should return an array of projects with a single extracted label object', async () => {
            vi.mocked(prisma.project.findMany).mockResolvedValue([mockProjectFromDb] as never);

            const result = await getLocalizedProjects('en');

            expect(prisma.project.findMany).toHaveBeenCalledWith({
                where: { labels: { some: { language: 'en' } } },
                include: { image: true, labels: { where: { language: 'en' } } }
            });

            expect(result).toHaveLength(1);
            expect(result[0].label).toBeDefined();
            expect(result[0].label.name).toBe('Test EN');
            expect(result[0]).not.toHaveProperty('labels');
        });

        it('should return an empty array if no projects match the given locale', async () => {
            vi.mocked(prisma.project.findMany).mockResolvedValue([]);

            const result = await getLocalizedProjects('pl');

            expect(prisma.project.findMany).toHaveBeenCalledWith({
                where: { labels: { some: { language: 'pl' } } },
                include: { image: true, labels: { where: { language: 'pl' } } }
            });
            expect(result).toEqual([]);
        });
    });

    describe('getLocalizedProjectById', () => {
        it('should return a single project with an extracted label object', async () => {
            vi.mocked(prisma.project.findUnique).mockResolvedValue(mockProjectFromDb as never);

            const result = await getLocalizedProjectById('en', '1');

            expect(prisma.project.findUnique).toHaveBeenCalledWith({
                where: { id: '1' },
                include: { image: true, labels: { where: { language: 'en' } } }
            });

            expect(result).not.toBeNull();
            expect(result?.label.name).toBe('Test EN');
            expect(result).not.toHaveProperty('labels');
        });

        it('should return null if the project does not exist', async () => {
            vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

            const result = await getLocalizedProjectById('en', '999');

            expect(prisma.project.findUnique).toHaveBeenCalledWith({
                where: { id: '999' },
                include: { image: true, labels: { where: { language: 'en' } } }
            });
            expect(result).toBeNull();
        });

        it('should return null if the project exists but lacks a label for the given locale', async () => {
            const projectWithoutLabels = { ...mockProjectFromDb, labels: [] };
            vi.mocked(prisma.project.findUnique).mockResolvedValue(projectWithoutLabels as never);

            const result = await getLocalizedProjectById('pl', '1');

            expect(prisma.project.findUnique).toHaveBeenCalledWith({
                where: { id: '1' },
                include: { image: true, labels: { where: { language: 'pl' } } }
            });
            expect(result).toBeNull();
        });
    });
});