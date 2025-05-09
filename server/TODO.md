# 🛠️ DevConnect Backend - TODO Checklist

This file tracks the backend development of DevConnect, with user-focused features and milestones. Each item represents a real use case or persona scenario we aim to support.

---

## ✅ Core Setup

- [x] Initialize Express server  
- [x] Setup base `/` route with welcome message  
- [x] Setup environment variables using `.env`  
- [x] Connect to MongoDB using Mongoose  
- [x] Create basic folder structure (models, routes, controllers, etc.)

---

## 🔐 User Authentication

**Persona: New developer signing up to join the platform**

- [x] User should be able to register with email, username, first name, last name, and password  
- [x] User passwords should be securely hashed using `bcrypt`  
- [x] User should be able to log in and receive a JWT token  
- [x] Protected routes should verify JWT tokens using middleware  
- [x] User should be able to stay logged in with token stored in cookies or headers 
- [x] User should be able to logout and refresh token should be deleted without waiting for expiration timer.

---

## 👤 Profiles

**Persona: Developer setting up their public profile**

- [x] User should be able to create a profile with name, bio, skills, location, etc.  
- [x] User should be able to update their profile  
- [x] Other users should be able to view public profiles  
- [x] Link profile to registered user  

---

## 📝 Blog Posts

**Persona: Developer sharing a technical blog post**

- [x] User should be able to create and publish a blog post  
- [x] User should be able to edit their own blog posts  
- [x] User should be able to delete their own blog posts  
- [x] Anyone should be able to read blog posts  
- [x] Posts should support basic metadata (tags, created date, author, etc.)

---

## 🧑‍🤝‍🧑 Networking

**Persona: Developer wanting to follow peers**

- [ ] User should be able to follow or send friend requests to other users  
- [ ] User should be able to accept or reject friend requests  
- [ ] User should be able to see a list of their connections  
- [ ] Followers/following counts should be visible on profiles  

---

## 💼 Job Board

**Persona: Developer searching for open positions**

- [ ] User should be able to browse job listings  
- [ ] Recruiters/admins should be able to post new job openings  
- [ ] Jobs should include title, description, company, location, and tags  
- [ ] User should be able to search/filter jobs by role, location, and tags  

---

## 💬 Real-time Chat (Later Phase)

**Persona: Developers chatting in real-time**

- [ ] Setup WebSocket or Socket.io server  
- [ ] User should be able to send and receive messages  
- [ ] Messages should be stored and associated with sender + recipient  
- [ ] Bonus: typing indicators, read receipts  

---

## 🔔 Notifications

**Persona: Developer receiving activity updates**

- [ ] User should get a notification when someone sends a friend request  
- [ ] User should get a notification when a post is liked or commented on  
- [ ] User should get a notification for relevant job postings  
- [ ] Notifications should be markable as read  

---

## 🛡️ Admin Panel

**Persona: Admin managing the platform**

- [x] Admin should be able to view all users and posts  
- [x] Admin should be able to delete users  
- [x] Admin should be able to delete inappropriate posts
- [x] Admin should be able to promote users to moderators  
- [ ] Admin dashboard endpoint with analytics overview  

---

## 🧪 Testing & Docs

- [ ] Create Postman collection for API testing  
- [ ] Write documentation for each API endpoint  
- [ ] Setup basic unit testing (Jest or Mocha)

---

## 🌟 Stretch Goals / Ideas

- [ ] Activity feed (see who posted, followed, or liked)  
- [ ] Profile badges for top contributors  
- [ ] OAuth login (GitHub, Google, etc.)  
- [ ] API rate limiting and request logging

---

Feel free to check off completed tasks as you go, and open GitHub Issues linked to each task for more detailed tracking.

