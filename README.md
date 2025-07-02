# 🚀 Competitive Programming Hub

A comprehensive platform for mastering competitive programming and technical interview preparation. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 **Dashboard**
- **Progress Tracking**: Monitor your problem-solving progress, streaks, and rankings
- **Statistics**: View solved problems, time spent, and current ranking
- **Recent Activity**: Track your latest problem attempts and solutions
- **Learning Paths**: Follow structured learning paths with progress indicators

### 💻 **Problem Browser**
- **LeetCode-style Problems**: 100+ curated coding problems with varying difficulty levels
- **Company-specific Questions**: Problems tagged by top companies (Google, Amazon, Microsoft, Meta, OpenAI, Apple)
- **Multiple Languages**: Support for JavaScript, Python, Java, and C++
- **Interactive Code Editor**: Built-in code editor with syntax highlighting
- **Solution Explanations**: Detailed solutions with time/space complexity analysis

### 📚 **Learning Resources**
- **DSA Courses**: Free comprehensive courses from top instructors
- **Video Tutorials**: Curated video content from YouTube
- **Practice Problems**: Organized by difficulty and topic
- **Learning Paths**: Structured roadmaps for different skill levels

### 🏢 **Company Preparation**
- **Interview Processes**: Detailed breakdown of each company's interview process
- **Company-specific Resources**: Curated problems and resources for each company
- **Salary Information**: Salary ranges and benefits for top tech companies
- **Interview Tips**: Specific tips and strategies for each company

### 🗺️ **Learning Roadmap**
- **Structured Paths**: Step-by-step learning paths from beginner to advanced
- **Topic Organization**: Problems and concepts organized by difficulty
- **Progress Tracking**: Visual progress indicators for each learning path
- **Milestone Tracking**: Track completion of different learning milestones

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter
- **Database**: Prisma (ready for implementation)
- **Authentication**: NextAuth.js (ready for implementation)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd competitive-programming-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
competitive-programming-hub/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ProblemCard.tsx    # Problem display component
│   └── CodeEditor.tsx     # Code editor component
├── data/                  # Static data and mock databases
│   ├── problems.ts        # Coding problems database
│   ├── courses.ts         # Course content database
│   └── companies.ts       # Company information database
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Key Features Explained

### Problem Solving Experience
- **Interactive Code Editor**: Write, test, and submit solutions directly in the browser
- **Multiple Language Support**: Choose your preferred programming language
- **Real-time Feedback**: Get immediate feedback on your solutions
- **Solution Explanations**: Learn from detailed solution explanations

### Learning Paths
1. **Beginner Path**: Arrays, Strings, Basic Algorithms
2. **Intermediate Path**: Data Structures, Advanced Algorithms
3. **Advanced Path**: Dynamic Programming, System Design
4. **Company-specific Paths**: Tailored for specific company interviews

### Company Preparation
- **Google**: Focus on algorithms, system design, and clean code
- **Amazon**: Emphasis on leadership principles and scalable solutions
- **Microsoft**: Software engineering and problem-solving skills
- **Meta**: Scalable systems and innovative thinking
- **OpenAI**: AI/ML focus with research-oriented questions
- **Apple**: User experience and clean code principles

## 🔧 Customization

### Adding New Problems
Edit `data/problems.ts` to add new coding problems:

```typescript
{
  id: 6,
  title: "New Problem",
  difficulty: "Medium",
  category: "Array",
  companies: ["Google", "Amazon"],
  tags: ["Array", "Two Pointers"],
  acceptanceRate: 75,
  description: "Problem description...",
  // ... other fields
}
```

### Adding New Courses
Edit `data/courses.ts` to add new learning resources:

```typescript
{
  id: 'new-course',
  title: 'New Course',
  instructor: 'Instructor Name',
  duration: '20 hours',
  level: 'Intermediate',
  // ... other fields
}
```

### Adding New Companies
Edit `data/companies.ts` to add new company information:

```typescript
{
  id: 'new-company',
  name: 'New Company',
  difficulty: 'Medium',
  // ... other fields
}
```

## 🎨 Styling

The project uses Tailwind CSS with custom components. Key styling classes:

- `.btn-primary`: Primary button styling
- `.card`: Card component styling
- `.difficulty-easy/medium/hard`: Difficulty level styling
- `.code-editor`: Code editor styling
- `.sidebar`: Sidebar navigation styling

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LeetCode**: For problem inspiration and structure
- **YouTube Creators**: For educational content links
- **Open Source Community**: For amazing tools and libraries

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Happy Coding! 🎉**

*Built with ❤️ for the competitive programming community* 