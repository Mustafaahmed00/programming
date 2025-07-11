# 🚀 Competitive Programming Hub

A comprehensive platform for mastering competitive programming and technical interview preparation. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Dashboard** - Personalized overview with progress tracking and analytics
- **Problem Library** - Curated collection of coding problems with filtering and sorting
- **Practice Mode** - Timed problem-solving sessions with integrated code editor
- **Enhanced Practice** - Advanced practice with real-time code execution and test cases
- **Study Plans** - Structured learning paths for different skill levels
- **Courses** - Free DSA and interview preparation courses
- **Companies** - Interview resources and information for top tech companies
- **Leaderboard** - Competitive rankings and achievements system
- **Community Forum** - Discussion threads and knowledge sharing
- **User Profiles** - Personal progress tracking and achievements

### Advanced Features
- **Interactive Code Execution** - Real-time code execution with multiple test cases
- **Custom Test Case Creation** - Create and run your own test cases
- **Performance Benchmarking** - Track execution time and memory usage
- **Real-time Contests** - Live coding competitions with leaderboards
- **Video Explanations** - Step-by-step video tutorials with multiple approaches
- **Enhanced Analytics** - Detailed performance insights and learning analytics
- **Progress Analytics** - Detailed insights into learning patterns and performance
- **Achievement System** - Gamified learning with badges and milestones
- **Study Paths** - Curated learning sequences for systematic improvement
- **Mobile Responsive** - Optimized for all device sizes
- **Interactive Code Editor** - Syntax highlighting and code execution
- **Performance Tracking** - Monitor accuracy, speed, and consistency
- **Social Features** - Connect with other learners and share experiences

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter
- **State Management**: React Hooks
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/competitive-programming-hub.git
   cd competitive-programming-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Sources

The platform uses real data from:
- **LeetCode**: Problem links and company information
- **NeetCode**: Alternative problem solutions and explanations
- **YouTube**: Free DSA and interview preparation courses
- **Levels.fyi**: Company salary and interview information

## 🎯 Learning Paths

### Beginner Track
- Arrays and Strings
- Basic Data Structures
- Simple Algorithms
- Problem-Solving Fundamentals

### Intermediate Track
- Advanced Data Structures
- Dynamic Programming
- Graph Algorithms
- System Design Basics

### Advanced Track
- Complex Algorithms
- Optimization Techniques
- Competitive Programming
- Interview Mastery

## 🏆 Achievement System

### Badges
- **First Steps**: Solve your first problem
- **Streak Master**: Maintain a 7-day solving streak
- **Speed Demon**: Solve problems quickly
- **Accuracy Master**: High success rate
- **Algorithm Expert**: Solve many problems
- **Contest Champion**: Participate in contests

### Levels
- **Bronze**: 0-100 points
- **Silver**: 101-500 points
- **Gold**: 501-1000 points
- **Platinum**: 1001-2000 points
- **Diamond**: 2000+ points

## 🆕 New Enhanced Features

### Interactive Code Execution
- **Real-time Testing**: Execute code with multiple test cases
- **Custom Test Cases**: Create and run your own test scenarios
- **Performance Metrics**: Track execution time and memory usage
- **Multiple Languages**: Support for JavaScript, Python, Java, C++, C#
- **Error Handling**: Detailed error messages and debugging info

### Real-time Contests
- **Live Competitions**: Join real-time coding contests
- **Live Leaderboards**: See rankings update in real-time
- **Timer Integration**: Track contest time remaining
- **Problem Sets**: Multiple problems per contest
- **Prize System**: Rewards for top performers

### Video Explanations
- **Expert Instructors**: Learn from top competitive programmers
- **Multiple Approaches**: See different solution strategies
- **Step-by-step Walkthroughs**: Detailed problem explanations
- **Interactive Transcripts**: Click to jump to specific parts
- **Code Examples**: Multiple language implementations

### Enhanced Analytics
- **Performance Insights**: Detailed analysis of your progress
- **Skill Gap Analysis**: Identify areas for improvement
- **Learning Patterns**: Track your study habits
- **Progress Visualization**: Charts and graphs of your journey
- **Goal Setting**: Set and track learning objectives

## 🔧 Customization

### Adding New Problems
Edit `data/problems.ts` to add new problems with:
- Problem description and examples
- Starter code in multiple languages
- Difficulty and category tags
- Company associations
- Test cases and expected outputs

### Creating Study Plans
Add new learning paths in the study plans section with:
- Structured topic progression
- Problem assignments
- Time estimates
- Difficulty levels

### Customizing Styling
Modify `app/globals.css` to customize:
- Color scheme
- Component styles
- Utility classes
- Responsive breakpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LeetCode** for problem content and company data
- **NeetCode** for educational resources
- **Lucide** for beautiful icons
- **Tailwind CSS** for the styling framework
- **Next.js** for the amazing React framework

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Join our community forum

---

**Happy Coding! 🚀**

Built with ❤️ for the competitive programming community.

## 📁 Project Structure

```
competitive-programming-hub/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── contests/          # Real-time contests
│   ├── videos/            # Video explanations
│   ├── analytics/         # Enhanced analytics
│   └── practice/          # Practice pages
│       └── enhanced/      # Enhanced practice mode
├── components/            # Reusable components
│   ├── CodeEditor.tsx     # Enhanced code editor
│   ├── ContestSystem.tsx  # Real-time contest system
│   ├── VideoExplanations.tsx # Video tutorial system
│   ├── AnalyticsDashboard.tsx # Performance analytics
│   └── ProblemCard.tsx    # Problem display component
├── data/                  # Static data and mock databases
│   ├── problems.ts        # Coding problems database
│   ├── courses.ts         # Course content database
│   └── companies.ts       # Company information database
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Key Features Explained

### Interactive Code Execution
- **Real-time Testing**: Write code and see results immediately
- **Multiple Test Cases**: Run against predefined and custom test cases
- **Performance Metrics**: Track execution time and memory usage
- **Error Handling**: Get detailed error messages and debugging info
- **Language Support**: JavaScript, Python, Java, C++, C#

### Real-time Contests
- **Live Competitions**: Join contests with real-time leaderboards
- **Timer Integration**: Track time remaining with countdown
- **Problem Sets**: Multiple problems per contest with varying difficulty
- **Prize System**: Rewards and achievements for top performers
- **Performance Tracking**: Monitor your contest performance

### Video Explanations
- **Expert Instructors**: Learn from top competitive programmers
- **Multiple Approaches**: See different solution strategies for each problem
- **Interactive Features**: Clickable transcripts and code examples
- **Community Features**: Comments, likes, and discussions
- **Progress Tracking**: Track which videos you've watched

### Enhanced Analytics
- **Performance Insights**: Detailed analysis of your learning progress
- **Skill Gap Analysis**: Identify areas that need improvement
- **Learning Patterns**: Track study habits and time management
- **Goal Setting**: Set and track learning objectives
- **Progress Visualization**: Charts and graphs of your journey

### Learning Paths
- **Structured Progression**: Systematic learning from basics to advanced
- **Problem Assignments**: Curated problems for each topic
- **Time Estimates**: Realistic time commitments for each section
- **Difficulty Levels**: Progressive difficulty to build confidence
- **Progress Tracking**: Monitor completion of learning paths

## 🚀 Future Enhancements

### Planned Features
- **AI-Powered Hints**: Intelligent hints based on your approach
- **Code Review System**: Peer review of solutions
- **Study Groups**: Collaborative learning with other students
- **Mobile App**: Native mobile application
- **Offline Support**: Practice without internet connection
- **Advanced Contests**: Team competitions and tournaments
- **Mentorship Program**: Connect beginners with experts
- **Job Board**: Integration with tech companies
- **Certification System**: Earn certificates for completed paths
- **API Integration**: Connect with external platforms

### Technical Improvements
- **Real-time Collaboration**: Live coding with others
- **Advanced Code Editor**: IDE-like features
- **Performance Optimization**: Faster loading and execution
- **Accessibility**: Better support for screen readers
- **Internationalization**: Multi-language support
- **Progressive Web App**: Enhanced mobile experience
- **WebSocket Integration**: Real-time features
- **Database Integration**: Persistent user data
- **Cloud Deployment**: Scalable infrastructure
- **Security Enhancements**: Better authentication and authorization 