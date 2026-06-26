import React from "react";
import { Calculator, Orbit, Check } from "lucide-react";

interface GradeSubjectSelectionProps {
  selectedGrade: number;
  selectedSubject: "Maths" | "Science";
  onChangeGrade: (grade: number) => void;
  onChangeSubject: (subject: "Maths" | "Science") => void;
  onContinue: () => void;
  studentName: string;
}

export const GradeSubjectSelection: React.FC<GradeSubjectSelectionProps> = ({
  selectedGrade,
  selectedSubject,
  onChangeGrade,
  onChangeSubject,
  onContinue,
  studentName,
}) => {
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div id="grade-subject-selection-page" className="max-w-2xl w-full mx-auto px-4 py-8">
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"></div>

        {/* AI Buddy Info Bubble */}
        <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex gap-3.5 items-center mb-8">
          <div className="text-3xl animate-bounce">🎒</div>
          <div className="text-left">
            <h4 className="text-xs font-mono tracking-wider text-purple-600 uppercase font-bold">AI Buddy says:</h4>
            <p className="text-sm font-display font-medium text-slate-700 leading-snug">
              "Awesome, {studentName}! Now choose your class grade and the subject you want to learn today."
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight text-center">
          Grade & Subject Selection
        </h2>

        <div className="mt-8 space-y-8 text-left">
          {/* Grade Grid */}
          <div>
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider mb-3">
              1. Select your Grade Level:
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {grades.map((grade) => {
                const isSelected = selectedGrade === grade;
                return (
                  <button
                    id={`btn-grade-${grade}`}
                    key={grade}
                    onClick={() => onChangeGrade(grade)}
                    className={`font-display font-extrabold py-2.5 px-3 rounded-xl border transition-all text-sm cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white shadow-md shadow-purple-100 scale-105"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Grade {grade}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Options */}
          <div>
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider mb-3">
              2. Select your Subject:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Maths */}
              <button
                id="btn-subject-maths"
                onClick={() => onChangeSubject("Maths")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedSubject === "Maths"
                    ? "border-purple-500 bg-purple-50/50"
                    : "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <Calculator className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-display font-extrabold text-slate-800">Maths</p>
                  <p className="text-xs text-slate-500 font-medium">Numbers, Fractions, Shapes & more</p>
                </div>
                {selectedSubject === "Maths" && (
                  <div className="p-1 rounded-full bg-purple-600 text-white">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>

              {/* Science */}
              <button
                id="btn-subject-science"
                onClick={() => onChangeSubject("Science")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedSubject === "Science"
                    ? "border-cyan-500 bg-cyan-50/50"
                    : "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600">
                  <Orbit className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-display font-extrabold text-slate-800">Science</p>
                  <p className="text-xs text-slate-500 font-medium">Planets, Cycles, Chemistry & more</p>
                </div>
                {selectedSubject === "Science" && (
                  <div className="p-1 rounded-full bg-cyan-600 text-white">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            id="btn-save-grade-subject"
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-200 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};
