# Student Course Registration System

A Node.js web application for student course enrollment with MongoDB.

## Features
- User registration and login
- Course enrollment and dropping
- Responsive UI with Bootstrap

## Setup

### Prerequisites
- Docker and Docker Compose installed

### Running with Local MongoDB (Recommended)
1. Clone the repository
2. Run `docker-compose up --build`
3. Access at `http://localhost:3000`

### Running with MongoDB Atlas
1. Build the image: `docker build -t student-course-system .`
2. Run: `docker run -p 3000:3000 -e MONGO_URI="your_atlas_connection_string" student-course-system`
3. Access at `http://localhost:3000`

Replace `your_atlas_connection_string` with your MongoDB Atlas URI.

## Development
- `npm install`
- `npm start`
- Connect to local MongoDB or Atlas