# 🔐 Authentication & Progress Tracking System

## Overview

The Competitive Programming Hub now includes a comprehensive authentication and progress tracking system that allows users to:

- **Sign in/Sign up** with email and password
- **Track progress** across all problems and activities
- **Maintain streaks** and learning statistics
- **Sync data** across sessions using localStorage

## 🚀 Features

### Authentication
- **NextAuth.js** integration for secure authentication
- **Email/password** login system
- **Session management** with JWT tokens
- **Protected routes** and user-specific content

### Progress Tracking
- **Real-time progress** updates
- **Problem solving history** with timestamps
- **Streak tracking** with daily activity
- **Accuracy calculation** based on attempts vs solves
- **Points system** with difficulty-based scoring
- **Level progression** (Bronze → Silver → Gold → Platinum → Diamond)
- **Weekly goals** and progress tracking
- **Learning path progress** for different topics

### Data Persistence
- **localStorage** for immediate data storage
- **Cross-session persistence** of user progress
- **Activity history** with detailed timestamps
- **Achievement tracking** and milestones

## 🔧 Setup

### 1. Environment Variables
Create a `.env.local` file in your project root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
```

### 2. Demo Credentials
For testing purposes, use these demo credentials:
- **Email**: `demo@example.com`
- **Password**: `password`

## 📊 Progress Tracking Details

### What Gets Tracked
- **Problems Solved**: List of completed problem IDs
- **Problems Attempted**: List of attempted but unsolved problem IDs
- **Current Streak**: Consecutive days of problem solving
- **Longest Streak**: Best streak achieved
- **Total Time**: Cumulative time spent solving problems
- **Accuracy**: Percentage of attempts that resulted in solutions
- **Points**: Earned through problem solving (difficulty + time bonuses)
- **Level**: Based on total points earned
- **Weekly Progress**: Problems solved this week vs goal
- **Recent Activity**: Last 50 activities with timestamps

### Scoring System
- **Easy Problems**: 10 base points + time bonus
- **Medium Problems**: 25 base points + time bonus
- **Hard Problems**: 50 base points + time bonus
- **Time Bonus**: Up to 10 points for faster solving

### Level System
- **Bronze**: 0-100 points
- **Silver**: 101-500 points
- **Gold**: 501-1000 points
- **Platinum**: 1001-2000 points
- **Diamond**: 2000+ points

## 🎯 Usage Examples

### Sign In
```typescript
// Navigate to sign-in page
router.push('/auth/signin')

// Or use NextAuth signIn function
import { signIn } from 'next-auth/react'
await signIn('credentials', { email, password })
```

### Track Problem Progress
```typescript
import { ProgressTracker } from '@/lib/progress'

// When user solves a problem
ProgressTracker.solveProblem(
  userId,
  problemId,
  problemName,
  difficulty,
  timeTaken
)

// When user attempts but doesn't solve
ProgressTracker.attemptProblem(
  userId,
  problemId,
  problemName,
  difficulty,
  timeTaken
)
```

### Get User Progress
```typescript
const progress = ProgressTracker.getProgress(userId)
console.log(progress.problemsSolved.length) // Number of solved problems
console.log(progress.currentStreak) // Current streak
console.log(progress.accuracy) // Accuracy percentage
```

## 🔄 Data Flow

1. **User signs in** → NextAuth creates session
2. **User solves problem** → ProgressTracker updates localStorage
3. **Dashboard loads** → Real progress data displayed
4. **User returns** → Progress persists across sessions

## 🛡️ Security Considerations

### Current Implementation (Demo)
- **localStorage**: Data stored locally in browser
- **No server-side persistence**: Data lost if localStorage cleared
- **Demo credentials**: Hardcoded for testing

### Production Recommendations
- **Database integration**: Store progress in PostgreSQL/MongoDB
- **API endpoints**: RESTful APIs for progress updates
- **Data encryption**: Encrypt sensitive user data
- **Session validation**: Server-side session verification
- **Rate limiting**: Prevent abuse of progress tracking

## 🚀 Future Enhancements

### Planned Features
- **Database integration** with Prisma/TypeORM
- **Real-time sync** across devices
- **Social features** (friends, leaderboards)
- **Achievement system** with badges
- **Study group** collaboration
- **Export/import** progress data
- **Analytics dashboard** with detailed insights

### Technical Improvements
- **WebSocket integration** for real-time updates
- **Offline support** with service workers
- **Mobile app** with React Native
- **Cloud sync** with Firebase/CloudKit
- **Advanced analytics** with machine learning insights

## 🐛 Troubleshooting

### Common Issues

1. **Progress not saving**
   - Check if user is signed in
   - Verify localStorage is enabled
   - Check browser console for errors

2. **Session not persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL configuration
   - Clear browser cache and try again

3. **TypeScript errors**
   - Ensure proper type checking for session.user
   - Convert problem IDs to strings when needed
   - Add null checks for optional properties

### Debug Mode
Enable debug logging by adding to your environment:
```env
NEXTAUTH_DEBUG=true
```

## 📝 API Reference

### ProgressTracker Methods

```typescript
// Get user progress
static getProgress(userId: string): UserProgress

// Track problem solution
static solveProblem(userId: string, problemId: string, problemName: string, difficulty: string, timeTaken: number): void

// Track problem attempt
static attemptProblem(userId: string, problemId: string, problemName: string, difficulty: string, timeTaken: number): void

// Update learning path progress
static updateLearningPath(userId: string, topic: string, progress: number): void

// Set weekly goal
static setWeeklyGoal(userId: string, goal: number): void

// Reset weekly progress
static resetWeeklyProgress(userId: string): void
```

### UserProgress Interface

```typescript
interface UserProgress {
  userId: string
  problemsSolved: string[]
  problemsAttempted: string[]
  currentStreak: number
  longestStreak: number
  totalTime: number
  accuracy: number
  points: number
  level: string
  achievements: string[]
  weeklyGoal: number
  weeklyProgress: number
  lastActivityDate: string
  learningPathProgress: Record<string, number>
  recentActivity: ActivityItem[]
}
```

## 🎉 Getting Started

1. **Sign up** at `/auth/signup`
2. **Sign in** at `/auth/signin`
3. **Start practicing** problems
4. **Track your progress** on the dashboard
5. **Build streaks** and earn achievements

The system is now fully functional with real progress tracking! 🚀 