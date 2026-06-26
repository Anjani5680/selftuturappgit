import React from "react";
import { BADGES } from "../data";
import { Award, Lock, Sparkles } from "lucide-react";

interface BadgesPageProps {
  completedLessons: string[];
  strengths: string[];
}

export const BadgesPage: React.FC<BadgesPageProps> = ({ completedLessons, strengths }) => {
  return (
    <div id="badges-page" className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6 text-left">
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight flex items-center gap-2">
          Your Trophies & Rewards
        </h2>
        <p className="text-xs text-slate-500 font-extrabold">
          Unlock badges as you complete quick notes, flashcards, quizzes, and diagnostic plans!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {BADGES.map((badge) => {
          // Determine locked state dynamically
          let isUnlocked = false;
          if (badge.id === "first-lesson" && completedLessons.length > 0) isUnlocked = true;
          if (badge.id === "quiz-star" && completedLessons.length >= 2) isUnlocked = true;
          if (badge.id === "flashcard-hero" && completedLessons.length > 0) isUnlocked = true;
          if (badge.id === "weakness-fixer" && strengths.length > 2) isUnlocked = true; // Started with 2 strengths
          if (badge.id === "maths-explorer") isUnlocked = true; // Pre-unlocked for demo
          if (badge.id === "five-day-streak") isUnlocked = true; // Pre-unlocked
          if (badge.id === "deep-learner" && strengths.length > 2) isUnlocked = true;

          return (
            <div
              key={badge.id}
              className={`backdrop-blur-xl border rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between transition-all ${
                isUnlocked
                  ? "bg-white/90 border-white shadow-2xl hover:scale-[1.01] hover:shadow-purple-100"
                  : "bg-white/40 border-white/20 opacity-50 shadow-sm"
              }`}
            >
              {isUnlocked && (
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full blur-xl opacity-40"></div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl filter drop-shadow-sm select-none animate-float">{badge.emoji}</span>
                  {!isUnlocked ? (
                    <span className="text-[9px] bg-slate-100 text-slate-400 font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-slate-200">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  ) : (
                    <span className="text-[9px] bg-purple-50 text-purple-700 font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-purple-100">
                      <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow" /> Unlocked
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-display font-black text-slate-900 leading-snug">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-extrabold">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-wider">
                <span>Value</span>
                <span className={isUnlocked ? "text-purple-600 font-black" : "text-slate-450"}>
                  {badge.xp} XP Stars
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
