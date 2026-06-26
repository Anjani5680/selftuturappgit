import React, { useState } from "react";
import { Menu, ChevronUp, ChevronDown, Monitor, Check } from "lucide-react";

interface DemoNavigatorProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const DemoNavigator: React.FC<DemoNavigatorProps> = ({ currentScreen, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Group screens conceptually for a neat panel layout
  const categories = [
    {
      title: "Onboarding Flow",
      screens: [
        { id: "landing", label: "Landing Page" },
        { id: "login", label: "Login / Signup" },
        { id: "profile-setup", label: "Mascot Profile Setup" },
        { id: "grade-subject", label: "Grade + Subject selection" },
        { id: "learning-mode", label: "Quest Mode selection" },
      ],
    },
    {
      title: "Learning Spaces",
      screens: [
        { id: "dashboard", label: "Student Dashboard" },
        { id: "lesson-list", label: "Lesson Catalog" },
        { id: "quick-learning-overview", label: "Quick Learn Overview" },
        { id: "quick-learning-notes", label: "Quick Learn Notes" },
        { id: "quick-learning-flashcards", label: "Quick Learn Flashcards" },
        { id: "quick-learning-quiz", label: "Quick Learn Quiz" },
        { id: "quick-learning-score", label: "Quick Learn Score" },
      ],
    },
    {
      title: "Deep AI Diagnosis Loop",
      screens: [
        { id: "deep-learning-start", label: "Deep Diagnosis Intro" },
        { id: "deep-learning-diagnosis", label: "10 MCQ Diagnosis" },
        { id: "deep-learning-diagnosis-result", label: "AI Analysis Report" },
        { id: "deep-learning-notes", label: "Personalized Lessons" },
        { id: "deep-learning-flashcards", label: "Focused Flashcards" },
        { id: "deep-learning-quiz", label: "Targeted Retest" },
        { id: "deep-learning-success", label: "Weakness Fixed 🎉" },
      ],
    },
    {
      title: "Reports & Extra Utilities",
      screens: [
        { id: "reports-main", label: "Learning Analytics" },
        { id: "parent-summary", label: "Parent Summary Card" },
        { id: "ai-tutor-chat", label: "AI Tutor Chat (Gemini)" },
        { id: "badges", label: "Unlocked Badges" },
        { id: "profile-view", label: "Student Profile Cards" },
        { id: "settings-view", label: "Mascot Preferences" },
      ],
    },
  ];

  return (
    <div className="fixed bottom-3 right-3 z-50">
      {/* Floating Badge Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-display font-extrabold px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer border border-white/10"
      >
        <Monitor className="w-4 h-4 text-cyan-400" />
        Prototype Quick-Jump Drawer
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {/* Navigator Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-[300px] sm:w-[480px] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div>
              <h4 className="text-sm font-display font-bold text-white">Interactive Screen Navigator</h4>
              <p className="text-[10px] text-slate-400">Instantly preview any part of the 28-screen experience.</p>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded-full uppercase font-bold border border-cyan-800/40">
              {categories.reduce((acc, cat) => acc + cat.screens.length, 0)} Screens
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5 text-left">
                <span className="text-[9px] font-display font-extrabold text-slate-500 uppercase tracking-wider block">
                  {cat.title}
                </span>
                <div className="space-y-1">
                  {cat.screens.map((screen) => {
                    const isCurrent = currentScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => {
                          onNavigate(screen.id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-blue-600/20 text-cyan-400 font-bold border border-blue-500/30"
                            : "text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800/50"
                        }`}
                      >
                        <span className="truncate">{screen.label}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
