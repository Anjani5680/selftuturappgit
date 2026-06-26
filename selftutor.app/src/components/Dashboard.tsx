import React from "react";
import { Sparkles, Play, Award, Zap, Brain, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { AVATARS } from "../data";

interface DashboardProps {
  studentName: string;
  studentAvatar: string;
  grade: number;
  subject: "Maths" | "Science";
  stats: {
    lessonsCompleted: number;
    averageScore: number;
    strengths: string[];
    weaknesses: string[];
  };
  onResumeQuick: () => void;
  onResumeDeep: () => void;
  onStartNewLesson: () => void;
  onNavigate: (screen: string) => void;
  onChangeSubject?: (sub: "Maths" | "Science") => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentName,
  studentAvatar,
  grade,
  subject,
  stats,
  onResumeQuick,
  onResumeDeep,
  onStartNewLesson,
  onNavigate,
  onChangeSubject,
}) => {
  const avatarObj = AVATARS.find((a) => a.id === studentAvatar) || AVATARS[3];

  return (
    <div id="student-dashboard" className="max-w-5xl w-full mx-auto px-4 py-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-200/30 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md border ${avatarObj.color}`}>
            {avatarObj.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
              Hi, {studentName}!
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-display font-extrabold px-2.5 py-0.5 rounded-full">
                Grade {grade}
              </span>
              <span className="bg-cyan-50 text-cyan-700 border border-cyan-100/50 text-[11px] font-display font-extrabold px-2.5 py-0.5 rounded-full">
                {subject} Selection
              </span>
            </div>
          </div>
        </div>

        {/* Change Subject/Grade Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto">
          <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200/20 shadow-inner w-full sm:w-auto">
            <button
              onClick={() => onChangeSubject?.("Maths")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-display font-black transition-all cursor-pointer text-center ${
                subject === "Maths"
                  ? "bg-white text-purple-700 shadow-sm border border-purple-100/40"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              🔢 Maths
            </button>
            <button
              onClick={() => onChangeSubject?.("Science")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-display font-black transition-all cursor-pointer text-center ${
                subject === "Science"
                  ? "bg-white text-blue-700 shadow-sm border border-blue-100/40"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              🧪 Science
            </button>
          </div>

          <button
            id="btn-edit-selection"
            onClick={() => onNavigate("grade-subject")}
            className="text-xs text-purple-600 hover:text-purple-700 bg-purple-50 border border-purple-100/50 px-4 py-2.5 rounded-xl font-display font-extrabold transition-all cursor-pointer w-full sm:w-auto text-center"
          >
            Switch Grade
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: AI Tutor Card and Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Large AI Tutor Card */}
          <div className="bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 relative overflow-hidden text-left shadow-2xl">
            {/* Background vector accents */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl"></div>
            <div className="absolute -top-10 left-1/3 w-32 h-32 rounded-full bg-purple-500/25 blur-2xl"></div>

            <div className="flex gap-4 items-start relative z-10">
              <span className="text-4xl p-2 bg-white/10 rounded-2xl animate-float">🤖</span>
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-black text-cyan-400 tracking-tight">AI Buddy Study Assistant</h3>
                  <p className="text-sm font-display font-medium text-slate-200">
                    "What do you want to learn today, {studentName}? I can give you a quick summary with flashcards or scan your weak areas to boost your grade!"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    id="btn-dash-quick"
                    onClick={onResumeQuick}
                    className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-display font-extrabold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    Quick Learning
                  </button>
                  <button
                    id="btn-dash-deep"
                    onClick={onResumeDeep}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-95 text-white font-display font-extrabold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-purple-500/10 transition-all cursor-pointer"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    Deep Diagnosis
                  </button>
                  <button
                    id="btn-dash-new"
                    onClick={onStartNewLesson}
                    className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-display font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Start New Lesson
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Cards / Active Progress Timeline */}
          <div className="space-y-3 text-left">
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider pl-1">
              Resume Your Active Learning Paths:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quick Resume Card */}
              <div className="bg-white/90 backdrop-blur-xl border border-white shadow-lg p-4 rounded-2xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-display font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100/50 px-2.5 py-0.5 rounded-full">
                      <Zap className="w-2.5 h-2.5 fill-amber-700 text-amber-700" /> Quick Quest
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">In Progress</span>
                  </div>
                  <h4 className="text-sm font-display font-black text-slate-800">
                    Fractions & Cake Slicing
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Pending: Quiz & Score Certificate</p>
                </div>
                <button
                  id="btn-resume-quick-card"
                  onClick={onResumeQuick}
                  className="mt-4 flex items-center justify-center gap-1 w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-display font-extrabold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-900 text-slate-900" /> Resume Lesson
                </button>
              </div>

              {/* Deep Resume Card */}
              <div className="bg-white/90 backdrop-blur-xl border border-white shadow-lg p-4 rounded-2xl hover:scale-[1.01] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-display font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100/50 px-2.5 py-0.5 rounded-full">
                      <Brain className="w-2.5 h-2.5 text-purple-700" /> Deep Study
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">In Progress</span>
                  </div>
                  <h4 className="text-sm font-display font-black text-slate-800">
                    Math Diagnostics Scan
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Pending: AI Strength conversion reports</p>
                </div>
                <button
                  id="btn-resume-deep-card"
                  onClick={onResumeDeep}
                  className="mt-4 flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-extrabold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white text-white" /> Continue Improvement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Progress Summary Rings and Strengths/Weaknesses */}
        <div className="space-y-6 text-left">
          {/* Quick Stats Grid */}
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-100/50 pb-2">
              Progress Summary
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-50/50 p-3 rounded-2xl text-center">
                <span className="text-2xl font-mono font-extrabold text-purple-600">{stats.lessonsCompleted}</span>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Completed Quizzes</p>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-2xl text-center">
                <span className="text-2xl font-mono font-extrabold text-blue-600">{stats.averageScore}%</span>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Avg Quiz Score</p>
              </div>
            </div>

            {/* Simulated Animated Progress Ring */}
            <div className="flex items-center gap-4 bg-slate-50/40 p-3 rounded-2xl">
              <div className="relative flex items-center justify-center w-14 h-14">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="#e2e8f0" strokeWidth="4.5" fill="transparent" />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#8b5cf6"
                    strokeWidth="4.5"
                    fill="transparent"
                    strokeDasharray="150"
                    strokeDashoffset={150 - (150 * Math.min(stats.lessonsCompleted * 20, 100)) / 100}
                    className="transition-all duration-1000 animate-pulse-glow"
                  />
                </svg>
                <span className="absolute text-xs font-display font-extrabold text-slate-700">
                  {Math.min(stats.lessonsCompleted * 20, 100)}%
                </span>
              </div>
              <div>
                <p className="text-xs font-display font-extrabold text-slate-800">Weekly Goal Progress</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Keep learning to hit 100%!</p>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Bubble List */}
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-100/50 pb-2">
              Your AI Study Profile
            </h3>

            {/* Strengths list */}
            <div className="space-y-2">
              <span className="text-[10px] font-display font-extrabold tracking-wider text-emerald-600 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Current Strengths
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stats.strengths.length > 0 ? (
                  stats.strengths.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-display font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-xl shadow-sm"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic font-medium">No diagnostic data yet</span>
                )}
              </div>
            </div>

            {/* Weaknesses list */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-display font-extrabold tracking-wider text-purple-600 uppercase flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-purple-500" /> Topics to Improve
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stats.weaknesses.length > 0 ? (
                  stats.weaknesses.map((item, i) => (
                    <span
                      key={i}
                      onClick={() => onNavigate("deep-learning-start")}
                      className="text-xs font-display font-extrabold bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-xl shadow-sm hover:bg-purple-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {item} ⚡
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic font-medium">No weaknesses detected! Perfect.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
