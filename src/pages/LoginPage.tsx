import { useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const handleLogin = () => {
  //   console.log(email);
  //   console.log(password);
  // };

  const navigate = useNavigate()

  const handleLogin = () => {
    if(!email || !password) return
    navigate('/upload')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <AnimatedBackground />
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          RAG AI
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Ask questions from your documents
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-1 block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}
export default LoginPage;