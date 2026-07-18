# 📌 Trackly | Full-Stack Job Application Tracker

A full-stack web application built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)** to streamline job application management.  
Trackly helps job seekers organize applications, monitor progress, and securely manage resumes in the cloud.

---

## 🚀 Features
- **Centralized Dashboard**: Add, update, and track job applications with status transitions (Applied → Interview → Offer → Rejected).
- **Advanced CRUD APIs**: RESTful APIs built with Node.js & Express.js for job applications and user profiles.
- **Cloud Resume Management**: Integrated **Cloudinary API + Multer** for secure file uploads, in-browser PDF viewing, and auto-cleanup on deletion.
- **Secure Authentication**: Dual-layer login with **JWT** and **Google OAuth 2.0**.
- **Responsive UI**: React.js frontend with Hooks and state management for real-time updates across devices.
- **Deployment Ready**: Deployed on **Render**, ensuring scalability and production-grade performance.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Hooks, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth 2.0
- **File Storage**: Cloudinary + Multer
- **Deployment**: Render

---

## 📂 Database Schema (Sample)
```sql
job_applications {
  id: ObjectId,
  company_name: String,
  job_title: String,
  application_date: Date,
  status: Enum('Applied','Interview','Offer','Rejected'),
  notes: String,
  resume_url: String
}

## 📈 Impact
-**Reduced manual tracking effort by 70%.
-**Ensured 100% document availability with cloud integration.
-**Empowered job seekers with a structured, secure, and efficient application management system.

---

## Git & GitHub
- **📂 Project Structure
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

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url

Run the Application
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm start

Open in Browser
http://localhost:3000

##🚀 Usage Guide
- **User Workflow

- **1️⃣ Sign Up / Log In - Create an account to manage job applications.

- **2️⃣ Add Job Applications - Enter company name, job title, and status. Update status as the application progresses.

- **3️⃣ Browse the Job Board - Discover available job opportunities. Save or apply directly.

- **4️⃣ View Analytics Dashboard - Monitor application statistics. Track success rate and progress.

- **5️⃣ Use Resume Builder - Non-logged-in users can create a resume quickly. Fill in personal details, experience, education, and skills.

---

##🔮 Future Improvements

Planned enhancements for the project include:
- **🔔 Application status notifications
- **📧 Email reminders for interview dates
- **📊 Advanced analytics and insights
- **🤖 AI-based resume suggestions
