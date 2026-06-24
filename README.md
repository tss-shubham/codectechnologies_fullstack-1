# Personal Portfolio Website - Full Stack Project

A professional, fully responsive personal portfolio website built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

✨ **Dynamic Content Management**
- Backend-driven projects, skills, and profile data
- RESTful APIs for all portfolio data
- Real-time content updates

📱 **Responsive Design**
- Mobile-first approach
- Works seamlessly on all devices
- Modern, clean UI

📧 **Contact Management**
- Contact form with backend validation
- Email notifications to owner and visitor
- Message status tracking (new/read/replied)

🔐 **Production Ready**
- Secure environment variable configuration
- Input validation on frontend and backend
- Error handling throughout

🏗️ **Clean Architecture**
- MVC pattern implementation
- Separated routes, controllers, and models
- Middleware for validation and error handling

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (with Flexbox & Grid)
- Vanilla JavaScript (Fetch API)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

**Additional Tools:**
- Nodemailer (Email)
- Express-validator (Validation)
- Dotenv (Environment variables)
- CORS (Cross-origin requests)
- Nodemon (Development)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/personal-portfolio-website.git
cd personal-portfolio-website
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

#### Required Environment Variables:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@portfolio.com
CLIENT_URL=http://localhost:3000
```

### Step 4: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a cluster and get connection string
3. Replace MONGODB_URI in .env

### Step 5: Run the Application

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### Step 6: Open Frontend
```bash
# Open index.html in public/ folder in your browser
# Or use Live Server extension in VS Code
```

## Project Structure

```
personal-portfolio-website/
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── profileController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Profile.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── profileRoutes.js
│   │   └── contactRoutes.js
│   └── index.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile

### Contact
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Submit contact form
- `PATCH /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

## Database Schema

### Project
```javascript
{
  title: String,
  description: String,
  image: String,
  technologies: [String],
  liveLink: String,
  githubLink: String,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Skill
```javascript
{
  name: String,
  category: String, // Frontend, Backend, Database, DevOps, Tools
  proficiency: Number, // 0-100
  yearsOfExperience: Number,
  icon: String,
  createdAt: Date
}
```

### Profile
```javascript
{
  name: String,
  email: String,
  phone: String,
  location: String,
  bio: String,
  profileImage: String,
  resumeLink: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Contact
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  phone: String,
  status: String, // new, read, replied
  createdAt: Date
}
```

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: [support.google.com](https://support.google.com/accounts/answer/185833)
3. Use App Password in .env

### SendGrid Alternative
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

## Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Add MongoDB Atlas
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Deploy to Vercel (Frontend Only)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## Development Tips

### Adding a New Project
```bash
# Use API endpoints or add via database
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "liveLink": "https://project.com",
    "githubLink": "https://github.com/user/project"
  }'
```

### Adding a New Skill
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "category": "Frontend",
    "proficiency": 90,
    "yearsOfExperience": 3
  }'
```

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI format
- Verify network access if using Atlas

### Email Not Sending
- Enable Less Secure App Access (Gmail)
- Check EMAIL_USER and EMAIL_PASS
- Verify email service configuration

### CORS Error
- Ensure CLIENT_URL matches your frontend URL
- Add your domain to CORS whitelist in index.js

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Author

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

## Support

For support, email your.email@example.com or open an issue on GitHub.

## Roadmap

- [ ] Admin dashboard
- [ ] Blog section
- [ ] Advanced analytics
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] PWA support

---

⭐ If you found this helpful, please star the repository!
