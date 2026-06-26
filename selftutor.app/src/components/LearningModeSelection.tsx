import React from "react";
import { Zap, Brain, ArrowRight, CheckCircle2 } from "lucide-react";

interface LearningModeSelectionProps {
  onSelectMode: (mode: "quick" | "deep") => void;
  studentName: string;
}

export const LearningModeSelection: React.FC<LearningModeSelectionProps> = ({ onSelectMode, studentName }) => {
  return (
    <div id="learning-mode-page" className="max-w-4xl w-full mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">
          Choose Your Learning Quest
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
          Hey {studentName}! How do you want to learn today? Both modes are packed with fun rewards!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Card 1: Quick Learning */}
        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-100/30 transition-all">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
              <Zap className="w-7 h-7 fill-white text-white" />
            </div>

            <div className="text-left space-y-1">
              <h3 className="text-xl font-display font-bold text-slate-800">Quick Learning</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Fast lesson revision with simple summaries, smart interactive flashcards, a 5-question quiz, and instant scores.
              </p>
            </div>

            <ul className="text-left space-y-2 pt-2 border-t border-slate-50">
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" /> Notes & formulas explained simply
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" /> Interactive cards to flip & practice
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" /> 5-question fun challenge
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" /> Earn gold badges & XP stars
              </li>
            </ul>
          </div>

          <button
            id="btn-quick-learning"
            onClick={() => onSelectMode("quick")}
            className="group flex items-center justify-center gap-2 w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-bold py-3 px-5 rounded-2xl shadow-lg hover:shadow-amber-100 cursor-pointer"
          >
            Start Quick Learning
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Deep Learning */}
        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-100/30 transition-all">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"></div>

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-200 relative">
              <Brain className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></span>
            </div>

            <div className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-display font-bold text-slate-800">Deep Learning</h3>
                <span className="bg-purple-100 text-purple-700 font-display font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                AI evaluates your skills with a 10-question diagnostics test, highlights weak areas, and builds a custom plan.
              </p>
            </div>

            <ul className="text-left space-y-2 pt-2 border-t border-slate-50">
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-purple-500" /> 10 MCQ Diagnostic test
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-purple-500" /> Automatic weakness detection
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-purple-500" /> AI voice readings & translations
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-purple-500" /> Transform weakness to strength!
              </li>
            </ul>
          </div>

          <button
            id="btn-deep-learning"
            onClick={() => onSelectMode("deep")}
            className="group flex items-center justify-center gap-2 w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-display font-bold py-3 px-5 rounded-2xl shadow-lg hover:shadow-purple-100 cursor-pointer"
          >
            Start Deep Learning
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
