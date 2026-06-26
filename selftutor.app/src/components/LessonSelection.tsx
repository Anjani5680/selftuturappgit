import React from "react";
import { LESSONS, Lesson } from "../data";
import { Zap, Brain, Play, CheckCircle, Award } from "lucide-react";

interface LessonSelectionProps {
  subject: "Maths" | "Science";
  grade: number;
  completedLessons: string[];
  lessonScores: Record<string, number>;
  onSelectLesson: (lesson: Lesson, mode: "quick" | "deep") => void;
  onNavigate: (screen: string) => void;
}

export const LessonSelection: React.FC<LessonSelectionProps> = ({
  subject,
  grade,
  completedLessons,
  lessonScores,
  onSelectLesson,
  onNavigate,
}) => {
  // Filter lessons based on grade compatibility and subject
  const filteredLessons = LESSONS.filter(
    (l) => l.subject === subject && grade >= l.gradeMin && grade <= l.gradeMax
  );

  return (
    <div id="lesson-selection-page" className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
            Choose Your {subject} Adventure
          </h2>
          <p className="text-xs text-slate-500 font-extrabold">
            Tap a lesson below to explore simple notes, flashcards, and earn star achievements!
          </p>
        </div>

        <button
          onClick={() => onNavigate("learning-mode")}
          className="self-start text-xs font-display font-black text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-100 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          ← Go Back to Mode Selection
        </button>
      </div>

      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const score = lessonScores[lesson.id];

            return (
              <div
                key={lesson.id}
                className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 hover:scale-[1.01] hover:shadow-2xl hover:border-purple-200 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2.5 bg-purple-50 border border-purple-100/50 rounded-2xl animate-float">{lesson.icon}</span>
                    <div className="flex gap-2">
                      <span
                        className={`text-[9px] font-display font-black px-2.5 py-0.5 rounded-full border ${
                          lesson.difficulty === "Easy"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : lesson.difficulty === "Medium"
                            ? "bg-purple-50 text-purple-700 border-purple-100"
                            : "bg-rose-50 text-rose-700 border-rose-100"
                        }`}
                      >
                        {lesson.difficulty}
                      </span>
                      <span className="text-[9px] font-display font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {lesson.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-black text-slate-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                    {lesson.notes.simpleExplanation.substring(0, 100)}...
                  </p>

                  {/* Badges/States */}
                  {isCompleted && (
                    <div className="flex items-center gap-1.5 mt-3 text-emerald-600 font-display font-extrabold text-xs bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/30">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Completed! {score !== undefined && `Score: ${score}/5`}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <button
                    id={`btn-start-quick-${lesson.id}`}
                    onClick={() => onSelectLesson(lesson, "quick")}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-black py-2.5 px-3.5 rounded-xl text-xs hover:-translate-y-0.5 transition-all shadow-md shadow-purple-100 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white text-white" /> Quick Quest
                  </button>
                  <button
                    id={`btn-start-deep-${lesson.id}`}
                    onClick={() => onSelectLesson(lesson, "deep")}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-display font-black py-2.5 px-3.5 rounded-xl text-xs hover:-translate-y-0.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                  >
                    <Brain className="w-3.5 h-3.5" /> Deep Study
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-12 text-center max-w-md mx-auto shadow-2xl">
          <span className="text-4xl animate-bounce block">📚</span>
          <h3 className="text-lg font-display font-black text-slate-900 mt-4">No lessons for Grade {grade}</h3>
          <p className="text-xs text-slate-500 mt-2 font-semibold">
            Try choosing a Grade from 3 to 6 to unlock Fractions and Shapes, or Grade 3 to 7 for Solar System and Water Cycle topics!
          </p>
          <button
            onClick={() => onNavigate("grade-subject")}
            className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-bold py-2.5 px-5 rounded-xl text-xs shadow-md cursor-pointer"
          >
            Adjust Grade Selection
          </button>
        </div>
      )}
    </div>
  );
};
