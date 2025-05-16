import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submission
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // In a production app, you would store this in a database
      // For now, we just log it and return success
      console.log('Contact form submission:', { name, email, message });
      
      res.status(200).json({ message: 'Message received successfully' });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // API routes for feedback
  // Submit feedback
  app.post('/api/feedback', async (req, res) => {
    try {
      // Validate feedback data with Zod schema
      const feedbackData = insertFeedbackSchema.parse(req.body);
      
      // Store feedback in memory storage
      const savedFeedback = await storage.createFeedback(feedbackData);
      
      res.status(201).json({ 
        message: 'Feedback submitted successfully',
        data: savedFeedback
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get all feedback
  app.get('/api/feedback', async (_req, res) => {
    try {
      const allFeedback = await storage.getAllFeedback();
      res.status(200).json(allFeedback);
    } catch (error) {
      console.error('Error retrieving feedback:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get feedback by session number
  app.get('/api/feedback/session/:sessionNumber', async (req, res) => {
    try {
      const sessionNumber = parseInt(req.params.sessionNumber, 10);
      
      if (isNaN(sessionNumber) || sessionNumber < 1 || sessionNumber > 7) {
        return res.status(400).json({ message: 'Invalid session number' });
      }
      
      const sessionFeedback = await storage.getFeedbackBySession(sessionNumber);
      res.status(200).json(sessionFeedback);
    } catch (error) {
      console.error('Error retrieving session feedback:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get feedback by ID
  app.get('/api/feedback/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid feedback ID' });
      }
      
      const feedback = await storage.getFeedback(id);
      
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      
      res.status(200).json(feedback);
    } catch (error) {
      console.error('Error retrieving feedback:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
