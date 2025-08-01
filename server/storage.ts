import { type Intern, type InsertIntern, type Activity, type InsertActivity, type Achievement, type InsertAchievement } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Intern methods
  getIntern(id: string): Promise<Intern | undefined>;
  getInternByEmail(email: string): Promise<Intern | undefined>;
  createIntern(intern: InsertIntern): Promise<Intern>;
  getAllInterns(): Promise<Intern[]>;
  updateIntern(id: string, updates: Partial<Intern>): Promise<Intern | undefined>;
  
  // Activity methods
  getActivitiesByInternId(internId: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Achievement methods
  getAchievementsByInternId(internId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
}

export class MemStorage implements IStorage {
  private interns: Map<string, Intern>;
  private activities: Map<string, Activity>;
  private achievements: Map<string, Achievement>;

  constructor() {
    this.interns = new Map();
    this.activities = new Map();
    this.achievements = new Map();
    this.seedData();
  }

  private seedData() {
    // Create sample interns for leaderboard
    const sampleInterns: Intern[] = [
      {
        id: "1",
        firstName: "Jessica",
        lastName: "Chen",
        email: "jessica.chen@shecanfoundation.org",
        referralCode: "JESSICACHEN2025",
        totalRaised: 5847,
        referrals: 73,
        donationsCount: 156,
        rank: 1,
        goalPercentage: 146,
        badge: "Champion",
        joinedAt: new Date("2025-01-10"),
      },
      {
        id: "2",
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@shecanfoundation.org",
        referralCode: "MARIAGARCIA2025",
        totalRaised: 4285,
        referrals: 52,
        donationsCount: 94,
        rank: 2,
        goalPercentage: 107,
        badge: "Rising Star",
        joinedAt: new Date("2025-01-08"),
      },
      {
        id: "3",
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex.johnson@shecanfoundation.org",
        referralCode: "ALEXJOHNSON2025",
        totalRaised: 3921,
        referrals: 41,
        donationsCount: 78,
        rank: 3,
        goalPercentage: 98,
        badge: "Team Player",
        joinedAt: new Date("2025-01-12"),
      },
      {
        id: "4",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@shecanfoundation.org",
        referralCode: "SARAH2025",
        totalRaised: 2847,
        referrals: 23,
        donationsCount: 47,
        rank: 7,
        goalPercentage: 71,
        badge: "Rising Star",
        joinedAt: new Date("2025-01-15"),
      },
      {
        id: "5",
        firstName: "David",
        lastName: "Kim",
        email: "david.kim@shecanfoundation.org",
        referralCode: "DAVIDKIM2025",
        totalRaised: 2654,
        referrals: 19,
        donationsCount: 43,
        rank: 8,
        goalPercentage: 66,
        badge: "Team Player",
        joinedAt: new Date("2025-01-20"),
      },
    ];

    sampleInterns.forEach(intern => {
      this.interns.set(intern.id, intern);
    });

    // Sample activities for Sarah (current user)
    const sampleActivities: Activity[] = [
      {
        id: "act1",
        internId: "4",
        type: "donation",
        title: "New donation received",
        description: "$50 from your referral link",
        amount: 50,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "act2",
        internId: "4",
        type: "referral",
        title: "New referral signup",
        description: "Emma joined using your code",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
      {
        id: "act3",
        internId: "4",
        type: "achievement",
        title: "Achievement unlocked",
        description: "Rising Star badge earned",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    sampleActivities.forEach(activity => {
      this.activities.set(activity.id, activity);
    });

    // Sample achievements for Sarah
    const sampleAchievements: Achievement[] = [
      {
        id: "ach1",
        internId: "4",
        name: "First Donation",
        icon: "star",
        earned: new Date("2025-01-16"),
      },
      {
        id: "ach2",
        internId: "4",
        name: "Team Player",
        icon: "users",
        earned: new Date("2025-01-18"),
      },
      {
        id: "ach3",
        internId: "4",
        name: "Rising Star",
        icon: "chart-line",
        earned: new Date("2025-01-22"),
      },
    ];

    sampleAchievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  async getIntern(id: string): Promise<Intern | undefined> {
    return this.interns.get(id);
  }

  async getInternByEmail(email: string): Promise<Intern | undefined> {
    return Array.from(this.interns.values()).find(
      (intern) => intern.email === email,
    );
  }

  async createIntern(insertIntern: InsertIntern): Promise<Intern> {
    const id = randomUUID();
    const intern: Intern = { 
      ...insertIntern, 
      id,
      joinedAt: new Date(),
    };
    this.interns.set(id, intern);
    return intern;
  }

  async getAllInterns(): Promise<Intern[]> {
    return Array.from(this.interns.values()).sort((a, b) => a.rank - b.rank);
  }

  async updateIntern(id: string, updates: Partial<Intern>): Promise<Intern | undefined> {
    const intern = this.interns.get(id);
    if (!intern) return undefined;
    
    const updatedIntern = { ...intern, ...updates };
    this.interns.set(id, updatedIntern);
    return updatedIntern;
  }

  async getActivitiesByInternId(internId: string): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.internId === internId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { 
      ...insertActivity, 
      id,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getAchievementsByInternId(internId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => achievement.internId === internId)
      .sort((a, b) => b.earned.getTime() - a.earned.getTime());
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      earned: new Date(),
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();
