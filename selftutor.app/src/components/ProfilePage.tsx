import React from "react";
import { AVATARS } from "../data";
import { Award, Zap, Brain, Shield, ChevronRight, Sparkles, Star } from "lucide-react";

interface ProfilePageProps {
  studentName: string;
  studentAvatar: string;
  grade: number;
  subject: "Maths" | "Science";
  completedLessons: string[];
  strengths: string[];
  onNavigate: (screen: string) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  studentName,
  studentAvatar,
  grade,
  subject,
  completedLessons,
  strengths,
  onNavigate,
  selectedTheme,
  setSelectedTheme,
}) => {
  const avatarObj = AVATARS.find((a) => a.id === studentAvatar) || AVATARS[3];

  const themes = [
    { id: "immersive", name: "Immersive AI Star", bg: "from-purple-50 via-indigo-50 to-blue-50", text: "text-purple-700" },
    { id: "space", name: "Cosmic Space", bg: "from-indigo-900 via-slate-900 to-black", text: "text-cyan-400" },
    { id: "mint", name: "Neon Mint", bg: "from-teal-50 to-emerald-100", text: "text-emerald-700" },
    { id: "cabin", name: "Cozy Cabin Twilight", bg: "from-amber-50 to-orange-100", text: "text-orange-700" },
  ];

  return (
    <div id="student-profile-page" className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6 text-left">
      {/* Profile summary header */}
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full blur-2xl"></div>

        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-5xl shadow-md shrink-0 border ${avatarObj.color}`}>
          {avatarObj.emoji}
        </div>

        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
              {studentName}
            </h2>
            <span className="bg-purple-150 text-purple-800 text-[10px] font-display font-black px-3 py-1 rounded-full uppercase tracking-wider self-center border border-purple-200">
              Student Explorer
            </span>
          </div>

          <p className="text-xs text-slate-500 font-extrabold leading-relaxed">
            Grade {grade} · Primary Subject: {subject} · Studying on SelfTutor.APP
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-extrabold">
              <span className="font-black text-slate-900">{completedLessons.length}</span> Quizzes Completed
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-extrabold">
              <span className="font-black text-slate-900">{strengths.length}</span> Mastered Strengths
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("grade-subject")}
          className="bg-purple-50 border hover:bg-purple-100 border-purple-100 text-purple-600 font-display font-black py-2.5 px-4.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
        >
          Modify Grade
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Level & XP Bar */}
        <div className="md:col-span-2 space-y-6">
          {/* XP & Level progress */}
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 text-left space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Active Level</span>
                <h3 className="text-lg font-display font-black text-slate-900 mt-0.5">Level 3 Explorer</h3>
              </div>
              <span className="text-xs font-mono font-black text-purple-600 bg-purple-50 border border-purple-100/30 px-3 py-1 rounded-xl">
                {completedLessons.length * 200 + 100} / 1000 XP
              </span>
            </div>

            {/* Simulated progress bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-1000"
                style={{ width: `${((completedLessons.length * 200 + 100) / 1000) * 100}%` }}
              ></div>
            </div>

            <div className="flex gap-2.5 items-start bg-purple-50/50 p-3.5 rounded-xl border border-purple-100/30 text-xs text-purple-800">
              <span className="text-xl animate-float">🏆</span>
              <p className="font-extrabold mt-0.5 leading-relaxed">
                You're just <span className="font-black">{(1000 - (completedLessons.length * 200 + 100))} XP</span> away from reaching Level 4! Keep completing quizzes to secure the level promotion.
              </p>
            </div>
          </div>

          {/* Theme Skin Selection Drawer */}
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 text-left space-y-4">
            <div>
              <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider">
                Select Your Theme Skin:
              </h3>
              <p className="text-xs text-slate-400 font-extrabold">Customize the aesthetic theme of your SelfTutor.APP environment.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <button
                    id={`btn-theme-${theme.id}`}
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between h-20 cursor-pointer ${
                      isSelected
                        ? "border-purple-500 bg-purple-50/30 shadow-md shadow-purple-50/20"
                        : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-display font-black text-slate-900">{theme.name}</span>
                    <span className="text-[10px] text-slate-400 font-extrabold">Selected</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Recent Badges preview */}
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <h3 className="text-xs font-display font-black text-slate-900 uppercase tracking-wider">
                Recent Badges
              </h3>
              <button
                onClick={() => onNavigate("badges")}
                className="text-[10px] font-display font-black text-purple-600 hover:text-purple-700"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-50/85 p-2.5 rounded-xl border border-slate-100/30">
                <span className="text-2xl animate-float">🎒</span>
                <div>
                  <p className="text-xs font-display font-black text-slate-900">First Steps</p>
                  <p className="text-[10px] text-slate-400 font-medium">Join the classroom</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50/85 p-2.5 rounded-xl border border-slate-100/30">
                <span className="text-2xl animate-float">🔥</span>
                <div>
                  <p className="text-xs font-display font-black text-slate-900">Study Streak</p>
                  <p className="text-[10px] text-slate-400 font-medium">Learn 5 days in a row</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
