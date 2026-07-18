Job Application Tracker
A full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users organize, track, and manage their job applications in one place. The platform also includes a job board for discovering opportunities, a dashboard with analytics, and a free resume builder available to non-logged-in users.

📌 Overview
Searching for jobs often means applying to many companies and keeping track of different stages such as Applied, Interview, Offer, or Rejected. This project simplifies the process by providing a centralized platform where users can:

Track all job applications
Monitor progress through different stages
Discover new job opportunities
Analyze job search statistics
Build a resume quickly using a built-in resume builder
The goal of this project is to help job seekers stay organized and improve their job search workflow.

✨ Features
1️⃣ Job Application Management
Add new job applications
Update application status
Track companies, roles, dates, and notes
Filter or search applications
Status categories such as:
Applied
Interview
Offer
Rejected
Saved
2️⃣ Job Board
Browse available job opportunities
View job descriptions and company details
Save interesting job listings
Easily convert a job listing into an application entry
3️⃣ Analytics Dashboard
Visual overview of job application progress
Statistics such as:
Total applications
Applications by status
Interview success rate
Graphs and charts for better insights
4️⃣ Resume Builder (Free Tool)
Available without logging in
Build a professional resume using form inputs
Export or download resume
Helpful for quick resume creation
🛠 Tech Stack
Frontend
React.js
React Router
Axios
Chart.js / Recharts (for analytics)
CSS / Tailwind / Bootstrap (optional depending on implementation)
Backend
Node.js
Express.js
Database
MongoDB
Mongoose ODM
Other Tools
JWT Authentication
REST API
Git & GitHub
📂 Project Structure
job-application-tracker │ ├── backend │ ├── config │ ├── controllers │ ├── models │ ├── routes │ ├── middleware │ └── server.js │ ├── frontend │ ├── public │ ├── src │ │ ├── components │ │ ├── pages │ │ ├── services │ │ ├── context │ │ └── App.js │ └── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker

Install Backend Dependencies
cd backend
npm install

Install Frontend Dependencies
cd ../frontend
npm install

Setup Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the Application
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm start

Open in Browser
http://localhost:3000

3000
🚀 Usage Guide
User Workflow

1️⃣ Sign Up / Log In

Create an account to manage job applications.

2️⃣ Add Job Applications

Enter company name, job title, and status.

Update status as the application progresses.

3️⃣ Browse the Job Board

Discover available job opportunities.

Save or apply directly.

4️⃣ View Analytics Dashboard

Monitor application statistics.

Track success rate and progress.

5️⃣ Use Resume Builder

Non-logged-in users can create a resume quickly.

Fill in personal details, experience, education, and skills.

🔮 Future Improvements

Planned enhancements for the project include:

📎 Attach resume to job applications

🔔 Application status notifications

📧 Email reminders for interview dates

📊 Advanced analytics and insights

🔎 Smart job search filters

☁️ Resume PDF export

📱 Mobile responsive improvements

🤖 AI-based resume suggestions
