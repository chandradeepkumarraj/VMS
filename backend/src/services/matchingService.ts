import { IJob } from '../models/Job';
import User, { IUser } from '../models/User';

export const calculateAgencyScore = (job: IJob, agency: IUser): number => {
    let score = 0;

    // 1. Semantic Skill Match (40%) - Weighted by specialization depth
    if (job.skills.length > 0 && agency.profile.specialization && agency.profile.specialization.length > 0) {
        const agencySpecialties = new Set(agency.profile.specialization.map(s => s.toLowerCase()));
        const matchedSkills = job.skills.filter(skill => agencySpecialties.has(skill.toLowerCase()));

        const skillDensity = matchedSkills.length / job.skills.length;
        score += skillDensity * 40;
    }

    // 2. Performance Heuristics (40%)
    const metrics = agency.performanceMetrics || { successRate: 0, sourcingAccuracy: 0 };

    // Success Rate component (20%)
    score += (metrics.successRate / 100) * 20;

    // Sourcing Accuracy component (20%) - Quality over quantity
    score += (metrics.sourcingAccuracy / 100) * 20;

    // 3. Operational Fit (20%)
    // Location proximity boost (10%)
    if (agency.profile.location && job.location && agency.profile.location === job.location) {
        score += 10;
    }

    // Capacity & Recency boost (10%)
    // Simplified: Give preference to those with specialized focus in the job area
    const isSubjectMatterExpert = job.skills.some(s =>
        agency.profile.specialization?.some(spec => spec.toLowerCase().includes(s.toLowerCase()))
    );
    if (isSubjectMatterExpert) score += 10;

    return Math.min(Math.round(score), 100);
};

export const findMatchedAgencies = async (job: IJob) => {
    const agencies = await User.find({ role: 'RECRUITER', kycStatus: 'APPROVED' });
    const matches = agencies
        .map(agency => ({
            agencyId: agency._id,
            score: calculateAgencyScore(job, agency)
        }))
        .filter(match => match.score > 50) // Threshold
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Top 10

    return matches.map(m => m.agencyId);
};
