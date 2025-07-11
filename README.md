# Competitive Programming Hub

A comprehensive platform for competitive programming practice, featuring interactive code execution, progress tracking, and personalized learning paths.

## 🚀 Features

- **Interactive Code Editor**: Real-time code execution with syntax highlighting
- **Progress Tracking**: Monitor your problem-solving progress and streaks
- **Authentication**: Secure user accounts with NextAuth.js
- **Analytics Dashboard**: Detailed insights into your performance
- **Live Contests**: Participate in timed competitions
- **Video Explanations**: Learn from expert solutions
- **Company-Specific Problems**: Curated problems for top tech companies

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Code Execution**: Monaco Editor
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Mustafaahmed00/programming.git

# Navigate to the project directory
cd programming

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update environment variables
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Run the development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your Vercel deployment URL

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📚 Usage

1. **Sign Up/Login**: Create an account or use demo credentials
2. **Practice Problems**: Solve problems with the interactive code editor
3. **Track Progress**: Monitor your performance in the analytics dashboard
4. **Join Contests**: Participate in live coding competitions
5. **Watch Videos**: Learn from expert explanations

## 🔐 Authentication

- **Demo Account**: `demo@example.com` / `password`
- **File-based Storage**: User data persists between sessions (development)
- **Production Ready**: Ready for database integration

## 🎯 Current Status

✅ **Completed Features:**
- User authentication and registration
- Interactive code editor
- Progress tracking system
- Analytics dashboard
- Responsive design
- Error handling and loading states

🔄 **In Development:**
- Database integration for production
- Advanced contest system
- Video explanation platform
- Company-specific problem sets

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue on GitHub or contact the development team. 