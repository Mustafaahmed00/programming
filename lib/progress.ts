export interface UserProgress {
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

export interface ActivityItem {
  id: string
  type: 'solve' | 'attempt' | 'achievement' | 'streak'
  problemId?: string
  problemName?: string
  difficulty?: string
  timeTaken?: number
  timestamp: string
  points?: number
}

export class ProgressTracker {
  private static STORAGE_KEY = 'cp_hub_progress'

  static getProgress(userId: string): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress(userId)
    }

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      const defaultProgress = this.getDefaultProgress(userId)
      this.saveProgress(defaultProgress)
      return defaultProgress
    }

    try {
      const progress = JSON.parse(stored) as UserProgress
      return progress
    } catch {
      const defaultProgress = this.getDefaultProgress(userId)
      this.saveProgress(defaultProgress)
      return defaultProgress
    }
  }

  static saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress))
  }

  static solveProblem(userId: string, problemId: string, problemName: string, difficulty: string, timeTaken: number): void {
    const progress = this.getProgress(userId)
    
    // Add to solved problems
    if (!progress.problemsSolved.includes(problemId)) {
      progress.problemsSolved.push(problemId)
    }

    // Remove from attempted if it was there
    progress.problemsAttempted = progress.problemsAttempted.filter(id => id !== problemId)

    // Update streak
    const today = new Date().toDateString()
    const lastActivity = new Date(progress.lastActivityDate).toDateString()
    
    if (today === lastActivity) {
      // Already solved today, don't increment streak
    } else if (this.isConsecutiveDay(progress.lastActivityDate)) {
      progress.currentStreak++
    } else {
      progress.currentStreak = 1
    }

    // Update longest streak
    if (progress.currentStreak > progress.longestStreak) {
      progress.longestStreak = progress.currentStreak
    }

    // Update total time
    progress.totalTime += timeTaken

    // Update accuracy
    const totalAttempted = progress.problemsSolved.length + progress.problemsAttempted.length
    progress.accuracy = totalAttempted > 0 ? (progress.problemsSolved.length / totalAttempted) * 100 : 0

    // Update points
    const points = this.calculatePoints(difficulty, timeTaken)
    progress.points += points

    // Update level
    progress.level = this.calculateLevel(progress.points)

    // Update weekly progress
    progress.weeklyProgress++

    // Update last activity
    progress.lastActivityDate = new Date().toISOString()

    // Add activity
    const activity: ActivityItem = {
      id: `activity_${Date.now()}`,
      type: 'solve',
      problemId,
      problemName,
      difficulty,
      timeTaken,
      timestamp: new Date().toISOString(),
      points
    }
    progress.recentActivity.unshift(activity)
    progress.recentActivity = progress.recentActivity.slice(0, 50) // Keep last 50 activities

    this.saveProgress(progress)
  }

  static attemptProblem(userId: string, problemId: string, problemName: string, difficulty: string, timeTaken: number): void {
    const progress = this.getProgress(userId)
    
    // Add to attempted problems if not already solved
    if (!progress.problemsSolved.includes(problemId) && !progress.problemsAttempted.includes(problemId)) {
      progress.problemsAttempted.push(problemId)
    }

    // Update accuracy
    const totalAttempted = progress.problemsSolved.length + progress.problemsAttempted.length
    progress.accuracy = totalAttempted > 0 ? (progress.problemsSolved.length / totalAttempted) * 100 : 0

    // Update total time
    progress.totalTime += timeTaken

    // Update last activity
    progress.lastActivityDate = new Date().toISOString()

    // Add activity
    const activity: ActivityItem = {
      id: `activity_${Date.now()}`,
      type: 'attempt',
      problemId,
      problemName,
      difficulty,
      timeTaken,
      timestamp: new Date().toISOString()
    }
    progress.recentActivity.unshift(activity)
    progress.recentActivity = progress.recentActivity.slice(0, 50)

    this.saveProgress(progress)
  }

  static updateLearningPath(userId: string, topic: string, progress: number): void {
    const userProgress = this.getProgress(userId)
    userProgress.learningPathProgress[topic] = progress
    this.saveProgress(userProgress)
  }

  static setWeeklyGoal(userId: string, goal: number): void {
    const progress = this.getProgress(userId)
    progress.weeklyGoal = goal
    this.saveProgress(progress)
  }

  static resetWeeklyProgress(userId: string): void {
    const progress = this.getProgress(userId)
    progress.weeklyProgress = 0
    this.saveProgress(progress)
  }

  private static getDefaultProgress(userId: string): UserProgress {
    return {
      userId,
      problemsSolved: [],
      problemsAttempted: [],
      currentStreak: 0,
      longestStreak: 0,
      totalTime: 0,
      accuracy: 0,
      points: 0,
      level: 'Bronze',
      achievements: [],
      weeklyGoal: 15,
      weeklyProgress: 0,
      lastActivityDate: new Date().toISOString(),
      learningPathProgress: {},
      recentActivity: []
    }
  }

  private static isConsecutiveDay(lastActivityDate: string): boolean {
    const last = new Date(lastActivityDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - last.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  private static calculatePoints(difficulty: string, timeTaken: number): number {
    const basePoints = {
      'Easy': 10,
      'Medium': 25,
      'Hard': 50
    }
    
    const base = basePoints[difficulty as keyof typeof basePoints] || 10
    const timeBonus = Math.max(0, 10 - Math.floor(timeTaken / 60)) // Bonus for faster solving
    return base + timeBonus
  }

  private static calculateLevel(points: number): string {
    if (points >= 2000) return 'Diamond'
    if (points >= 1000) return 'Platinum'
    if (points >= 500) return 'Gold'
    if (points >= 100) return 'Silver'
    return 'Bronze'
  }
} 