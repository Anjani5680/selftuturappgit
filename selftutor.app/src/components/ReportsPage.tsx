import React, { useState } from "react";
import { Award, CheckCircle2, TrendingUp, AlertCircle, Share2, Star, Trophy, Calendar, Check } from "lucide-react";
import { BADGES } from "../data";

interface ReportsPageProps {
  studentName: string;
  grade: number;
  subject: "Maths" | "Science";
  completedLessons: string[];
  lessonScores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  studentName,
  grade,
  subject,
  completedLessons,
  lessonScores,
  strengths,
  weaknesses,
}) => {
  const [activeTab, setActiveTab] = useState<"student" | "parent">("student");
  const [isShared, setIsShared] = useState(false);

  // Simulated static completed list for richer report displays
  const completedHistory = completedLessons.map((lId) => ({
    title: lId === "fractions" 
      ? "Introduction to Fractions" 
      : lId === "geometry-shapes"
      ? "Understanding Shapes & Symmetry"
      : lId === "solar-system"
      ? "Our Solar System & Planets"
      : "The Magical Water Cycle",
    score: lessonScores[lId] || 4,
    date: "June 25, 2026",
  }));

  const handleShareReport = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };

  return (
    <div id="reports-page-container" className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6 text-left">
      {/* Top Header Selector tabs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
            Learning Progress Analytics
          </h2>
          <p className="text-xs text-slate-500 font-extrabold mt-0.5">
            Review detailed weekly accomplishments and view parental study advice.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-purple-50/50 border border-purple-100/40 p-1 rounded-2xl self-start shrink-0 shadow-sm">
          <button
            id="tab-student-report"
            onClick={() => setActiveTab("student")}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black transition-all cursor-pointer ${
              activeTab === "student"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md font-extrabold"
                : "text-slate-500 hover:text-slate-700 font-bold"
            }`}
          >
            Learner Report Card
          </button>
          <button
            id="tab-parent-report"
            onClick={() => setActiveTab("parent")}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black transition-all cursor-pointer ${
              activeTab === "parent"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md font-extrabold"
                : "text-slate-500 hover:text-slate-700 font-bold"
            }`}
          >
            Parent Dashboard
          </button>
        </div>
      </div>

      {/* STUDENT REPORT SPACE */}
      {activeTab === "student" && (
        <div id="student-report-card" className="space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-5 rounded-2xl flex items-center gap-3.5 hover:scale-[1.01] transition-transform">
              <span className="text-3xl p-2.5 bg-purple-50 border border-purple-100/50 rounded-2xl">🏅</span>
              <div>
                <span className="text-2xl font-mono font-extrabold text-purple-600">
                  {completedLessons.length}
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Lessons Completed</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-5 rounded-2xl flex items-center gap-3.5 hover:scale-[1.01] transition-transform">
              <span className="text-3xl p-2.5 bg-purple-50 border border-purple-100/50 rounded-2xl">⭐</span>
              <div>
                <span className="text-2xl font-mono font-extrabold text-purple-600">
                  {completedHistory.length * 200 + 100}
                </span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Total XP Stars</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-5 rounded-2xl flex items-center gap-3.5 hover:scale-[1.01] transition-transform">
              <span className="text-3xl p-2.5 bg-purple-50 border border-purple-100/50 rounded-2xl">🔥</span>
              <div>
                <span className="text-2xl font-mono font-extrabold text-purple-600">5 Days</span>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Active Study Streak</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* History of Completed Quizzes */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 text-left">
                <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                  Lesson Quest History
                </h3>

                {completedHistory.length > 0 ? (
                  <div className="space-y-3">
                    {completedHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-xl border border-slate-100/50 hover:bg-slate-100/50 transition-colors"
                      >
                        <div>
                          <p className="text-xs font-display font-extrabold text-slate-800">{item.title}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-300" /> Grade {grade} {subject} · {item.date}
                          </p>
                        </div>
                        <span className="text-xs font-mono font-extrabold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full shrink-0 border border-purple-100/20">
                          Score: {item.score}/5
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <span className="text-3xl animate-bounce block">🗂️</span>
                    <p className="text-xs font-display font-bold text-slate-400">No completed lessons yet</p>
                    <p className="text-[10px] text-slate-400">Complete a quick or deep learning quiz to generate history logs!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Strengths & Weaknesses checklists */}
            <div className="space-y-4">
              <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 space-y-4">
                <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Topic Mastery Report
                </h3>

                {/* Strengths */}
                <div className="space-y-2">
                  <span className="text-[10px] font-display font-extrabold tracking-wider text-emerald-600 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Strengths
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {strengths.map((item, i) => (
                      <span key={i} className="text-[10px] font-display font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-xl">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-display font-extrabold tracking-wider text-purple-600 uppercase flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-purple-500" /> Focus Topics
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {weaknesses.length > 0 ? (
                      weaknesses.map((item, i) => (
                        <span key={i} className="text-[10px] font-display font-extrabold bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-xl">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-400 italic font-medium">None! Brilliant job.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PARENT DASHBOARD SPACE */}
      {activeTab === "parent" && (
        <div id="parent-summary-card" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Official Parental Record</p>
              <h3 className="text-lg font-display font-black text-slate-900">
                Study Summary: {studentName}
              </h3>
            </div>

            {/* Share button */}
            <button
              id="btn-parent-share"
              onClick={handleShareReport}
              className={`flex items-center gap-1.5 text-xs font-display font-extrabold px-4.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                isShared
                  ? "bg-emerald-500 border-emerald-600 text-white"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white border-none shadow-md shadow-purple-100 hover:-translate-y-0.5"
              }`}
            >
              {isShared ? (
                <>
                  <Check className="w-4 h-4" /> Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" /> Share Report with Family
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-display font-black text-slate-900 uppercase tracking-wider mb-2">
                  Academic Performance:
                </h4>
                <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                  <div className="flex justify-between items-center text-xs text-slate-600 font-extrabold">
                    <span>Grade Level:</span>
                    <span className="font-display font-black text-slate-850">Grade {grade}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 font-extrabold">
                    <span>Active Topic Focus:</span>
                    <span className="font-display font-black text-slate-850">{subject}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 font-extrabold">
                    <span>Completed Modules:</span>
                    <span className="font-display font-black text-slate-850">{completedLessons.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-display font-black text-slate-900 uppercase tracking-wider mb-2">
                  Concept Mastery Summary:
                </h4>
                <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                  <div className="text-xs text-slate-600 font-extrabold">
                    <span className="text-emerald-600 font-black">Strong Area:</span> {strengths.join(", ") || "Addition, Basic Fractions"}
                  </div>
                  <div className="text-xs text-slate-600 font-extrabold pt-1.5 border-t border-slate-100">
                    <span className="text-purple-600 font-black">Developing Area:</span> {weaknesses.join(", ") || "None pending! Complete a deep study diagnostic scan."}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50/50 border border-purple-100/50 p-5 rounded-2xl space-y-2.5">
                <span className="text-2xl animate-float block">💡</span>
                <h4 className="text-xs font-display font-black text-purple-700 uppercase tracking-wider">
                  Suggested Home Practice Action:
                </h4>
                <p className="text-xs text-slate-650 leading-relaxed font-extrabold">
                  {studentName} is making excellent steady progress in {subject}. To support their growth, spend 5 minutes reviewing "Word Problems" or "Fractions" together in daily scenarios. For example, have {studentName} calculate sharing simple snacks or count elapsed times during car rides.
                </p>
                <div className="pt-2 text-[10px] text-purple-600 font-display font-black">
                  Next milestone recommendation: Complete 1 more Quick Learning quiz to unlock the "Quiz Star" badge!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
