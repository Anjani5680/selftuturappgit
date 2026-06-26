import React from "react";
import { LogIn, Sparkles, Mail, Shield, Smartphone } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  return (
    <div id="login-page" className="max-w-md w-full mx-auto px-4 py-12 relative">
      {/* Decorative Floating Math Elements */}
      <div className="absolute -top-6 -left-12 text-4xl text-blue-200 select-none animate-float">½</div>
      <div className="absolute -bottom-6 -right-12 text-4xl text-purple-200 select-none animate-float-slow">▵</div>
      <div className="absolute top-1/2 -right-16 text-5xl text-cyan-200 select-none animate-float">🎒</div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 relative overflow-hidden text-center">
        {/* Colorful top bar decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"></div>

        {/* Small mascot header */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-200 text-3xl mb-4 animate-bounce">
          🤖
        </div>

        <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
          Welcome back, learner!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-[280px] mx-auto font-medium">
          Let's unlock your custom math and science adventures today.
        </p>

        {/* Options */}
        <div className="space-y-3.5 mt-8">
          <button
            id="btn-login-google"
            onClick={onLoginSuccess}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-display font-semibold py-3 px-5 rounded-2xl transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.74 14.93 1 12 1 7.37 1 3.4 3.65 1.48 7.52l3.77 2.92C6.18 7.55 8.87 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.48z"
              />
              <path
                fill="#FBBC05"
                d="M5.25 14.6c-.24-.72-.37-1.49-.37-2.3s.13-1.58.37-2.3L1.48 7.08C.54 8.97 0 11.08 0 13.3s.54 4.33 1.48 6.22l3.77-2.92z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.96-1.07 7.95-2.92l-3.66-2.84c-1.01.68-2.3 1.08-3.79 1.08-3.13 0-5.82-2.51-6.75-5.4L1.48 16.3C3.4 20.17 7.37 23 12 23z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            id="btn-login-email"
            onClick={onLoginSuccess}
            className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-display font-semibold py-3 px-5 rounded-2xl transition-all cursor-pointer"
          >
            <Mail className="w-5 h-5 text-slate-500" />
            Continue with Email
          </button>

          <button
            id="btn-login-phone"
            onClick={onLoginSuccess}
            className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-display font-semibold py-3 px-5 rounded-2xl transition-all cursor-pointer"
          >
            <Smartphone className="w-5 h-5 text-slate-500" />
            Continue with Phone
          </button>
        </div>

        {/* Guest access */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center">
          <button
            id="btn-login-guest"
            onClick={onLoginSuccess}
            className="text-sm text-purple-600 hover:text-purple-700 font-display font-extrabold inline-flex items-center gap-1.5 group cursor-pointer"
          >
            Explore as Aarav (Sample Learner)
            <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          Your learning progress is saved safely.
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onBack}
          className="text-xs text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
        >
          ← Back to Welcome Page
        </button>
      </div>
    </div>
  );
};
