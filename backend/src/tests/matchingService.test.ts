import { calculateAgencyScore } from '../services/matchingService';

describe('matchingService - calculateAgencyScore', () => {
    const mockJob = {
        title: 'React Developer',
        skills: ['React', 'TypeScript', 'Node.js'],
        location: 'Remote'
    };

    const mockAgency = {
        profile: {
            specialization: 'Software Development',
            location: 'Remote'
        },
        performanceMetrics: {
            successRate: 0.85,
            sourcingAccuracy: 0.9,
            avgTimeToFill: 15
        }
    };

    it('should calculate a high score for matching skills and high performance', () => {
        const score = calculateAgencyScore(mockJob as any, mockAgency as any);
        expect(score).toBeGreaterThan(70);
    });

    it('should calculate a lower score for poor performance metrics', () => {
        const poorAgency = {
            ...mockAgency,
            performanceMetrics: {
                successRate: 0.4,
                sourcingAccuracy: 0.5,
                avgTimeToFill: 40
            }
        };
        const score = calculateAgencyScore(mockJob as any, poorAgency as any);
        expect(score).toBeLessThan(60);
    });

    it('should factor in location matching', () => {
        const localJob = { ...mockJob, location: 'New York' };
        const localAgency = { ...mockAgency, profile: { ...mockAgency.profile, location: 'New York' } };
        const remoteAgency = { ...mockAgency, profile: { ...mockAgency.profile, location: 'London' } };

        const localScore = calculateAgencyScore(localJob as any, localAgency as any);
        const remoteScore = calculateAgencyScore(localJob as any, remoteAgency as any);

        expect(localScore).toBeGreaterThan(remoteScore);
    });
});
