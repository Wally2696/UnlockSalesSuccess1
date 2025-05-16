import { users, feedback, type User, type InsertUser, type Feedback, type InsertFeedback } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedback(id: number): Promise<Feedback | undefined>;
  getAllFeedback(): Promise<Feedback[]>;
  getFeedbackBySession(sessionNumber: number): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private feedbacks: Map<number, Feedback>;
  userCurrentId: number;
  feedbackCurrentId: number;

  constructor() {
    this.users = new Map();
    this.feedbacks = new Map();
    this.userCurrentId = 1;
    this.feedbackCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Feedback methods implementation
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackCurrentId++;
    const createdAt = new Date();
    const feedbackEntry: Feedback = { 
      ...insertFeedback, 
      id, 
      createdAt,
      comments: insertFeedback.comments || null,
      suggestions: insertFeedback.suggestions || null
    };
    this.feedbacks.set(id, feedbackEntry);
    return feedbackEntry;
  }

  async getFeedback(id: number): Promise<Feedback | undefined> {
    return this.feedbacks.get(id);
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values());
  }

  async getFeedbackBySession(sessionNumber: number): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values()).filter(
      (feedback) => feedback.sessionNumber === sessionNumber,
    );
  }
}

export const storage = new MemStorage();
