const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample profile data for Ramavhale Murendeni
let profileData = {
  summary: "Full-stack developer from South Africa passionate about creating efficient and scalable web applications. Experienced in JavaScript ecosystems and cloud technologies.",
  languages: ["JavaScript", "Python", "Java", "SQL", "HTML/CSS"],
  frameworks: ["Node.js", "Express", "React", "Vue.js", "Django", "Bootstrap"],
  certifications: [
    "AWS Certified Developer Associate",
    "Google Cloud Associate Engineer",
    "Microsoft Azure Fundamentals"
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      university: "University of South Africa",
      year: 2023
    },
    {
      degree: "National Diploma in IT",
      university: "Tshwane University of Technology", 
      year: 2019
    }
  ],
  experience: [
    {
      position: "Backend Developer",
      company: "Tech Solutions SA",
      duration: "2022-Present",
      responsibilities: [
        "Developed and maintained RESTful APIs",
        "Implemented microservices architecture",
        "Collaborated with frontend teams",
        "Database design and optimization"
      ]
    },
    {
      position: "Junior Developer",
      company: "Innovation Hub Pretoria",
      duration: "2020-2022",
      responsibilities: [
        "Assisted in full-stack development",
        "Participated in code reviews",
        "Worked on bug fixes and feature implementation"
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js for local businesses",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
    },
    {
      name: "Task Management App",
      description: "Productivity application for team task management with real-time updates",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"]
    },
    {
      name: "Community Service Finder",
      description: "Platform connecting volunteers with local community services in South Africa",
      technologies: ["React Native", "Node.js", "MongoDB", "Google Maps API"]
    }
  ],
  lastUpdated: new Date().toISOString()
};

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'About Me API is running successfully! 🚀',
    developer: 'Ramavhale Murendeni',
    location: 'South Africa',
    endpoints: {
      'GET /': 'API information',
      'GET /about': 'Get profile information', 
      'POST /about': 'Update profile information'
    },
    timestamp: new Date().toISOString()
  });
});

// GET /about - Retrieve profile information
app.get('/about', (req, res) => {
  try {
    res.json({
      success: true,
      data: profileData,
      message: "Profile retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// POST /about - Update profile information  
app.post('/about', (req, res) => {
  try {
    const updates = req.body;
    
    // Validate request body
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No data provided for update"
      });
    }

    // Update profile data
    profileData = {
      ...profileData,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: profileData,
      message: "Profile updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// 404 handler - Fixed for Express 4
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      'GET /': 'API information',
      'GET /about': 'Get profile data',
      'POST /about': 'Update profile data'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

module.exports = app;