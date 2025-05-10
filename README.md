# DevConnect

DevConnect is an open-source platform designed to connect developers from around the world. Inspired by LinkedIn but tailored specifically for the developer community, DevConnect aims to facilitate networking, knowledge sharing, and career growth.

## Upcoming Features

- **User Authentication**: Secure registration and login using JWT.
- **Profiles**: Create and customize detailed developer profiles.
- **Blogging**: Write and share technical blog posts.
- **Networking**: Connect with other developers through friend requests and follows.
- **Job Board**: Browse job listings and stay informed about hiring opportunities.
- **Real-time Chat**: Communicate with other developers in real-time.
- **Notifications**: Get updates on job postings, friend requests, and blog interactions.
- **Search and Filters**: Easily find developers, blog posts, and job listings with advanced filters.
- **Admin Panel**: Manage users, posts, and job listings.

## Tech Stack

- **Client**: Vite ~ React, Tailwind CSS for styling, Redux or Context API for state management.
- **Server**: Node.js with Express.js.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JWT for token-based authentication.
- **Hosting**: Vercel or Netlify deployment.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

__Forking the Project__

1. Go to the [DevConnect](https://github.com/alvarotorrestx/DevConnect) repository on GitHub.
2. Click the "Fork" button in the top right corner of the page.
3. Clone your forked repository to your local machine:

```bash
git clone https://github.com/yourgithubprofile/DevConnect.git
cd DevConnect
```

__Installation for Client__

1. Navigate to the client directory:

```bash
cd client
```

2. Install the required dependencies:

```bash
npm install
```

__Installation for Server__

1. Navigate to the server directory:

```bash
cd ../server
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables:

```ENV
# .env.example
PORT=5000
MONGO_URI=your-mongodb-uri-here
JWT_SECRET=your-jwt-secret

ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
```

__Running the Application__

1. Open two terminal windows or tabs.

2. In the first terminal, navigate to the client directory and start the development server:

```bash
cd client
npm run dev
```

The client server will run on `http://localhost:5173`.

3. In the second terminal, navigate to the server directory and start the server:

```bash
cd server
npm start
```

The server will run on `http://localhost:3000`.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

> 🔀 **Note**: All changes must go through the `dev` branch. The `main` branch is protected and reserved for stable production-ready code.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alvarotorrestx/DevConnect?tab=MIT-1-ov-file#readme) file for details.