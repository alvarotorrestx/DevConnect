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

- **Frontend**: Vite ~ React, Tailwind CSS for styling, Redux or Context API for state management.
- **Backend**: Node.js with Express.js.
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
git clone https://github.com/alvarotorrestx/DevConnect.git
cd DevConnect
```

__Installation for Frontend__

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory and add any necessary environment variables.

__Installation for Backend__

1. Navigate to the backend directory:

```bash
cd ../backend
```

2. Install the required dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

```ENV
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

__Running the Application__

1. Open two terminal windows or tabs.

2. In the first terminal, navigate to the frontend directory and start the development server:

```bash
cd frontend
npm run dev
```

3. In the second terminal, navigate to the backend directory and start the server:

```bash
cd backend
npm start
```

4. Open your browser and go to `http://localhost:3000` to see the application running.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alvarotorrestx/DevConnect?tab=MIT-1-ov-file#readme) file for details.
