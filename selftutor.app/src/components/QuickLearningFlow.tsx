import React, { useState } from "react";
import { Lesson } from "../data";
import { Zap, Volume2, Sparkles, BookOpen, ChevronRight, CheckCircle2, RotateCcw, Award, Check, X, ShieldAlert } from "lucide-react";

interface QuickLearningFlowProps {
  lesson: Lesson;
  onFinishQuickLesson: (score: number) => void;
  onNavigate: (screen: string) => void;
  quickSubScreen: string;
  setQuickSubScreen: (subScreen: string) => void;
}

export const QuickLearningFlow: React.FC<QuickLearningFlowProps> = ({
  lesson,
  onFinishQuickLesson,
  onNavigate,
  quickSubScreen,
  setQuickSubScreen,
}) => {
  // Sub-screens: "overview", "notes", "flashcards", "quiz", "score"
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsStatus, setCardsStatus] = useState<Record<number, "easy" | "practice">>({});

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});

  // TTS audio simulation
  const handleSpeakNotes = () => {
    setIsSpeaking(true);
    // Real voice or responsive timer simulation
    const msg = `${lesson.notes.simpleExplanation}. For example: ${lesson.notes.exampleBox.content}.`;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 5000);
    }
  };

  const handleStopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Flashcards navigation
  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => Math.min(prev + 1, lesson.flashcards.length - 1));
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => Math.max(prev - 1, 0));
    }, 150);
  };

  // Quiz interaction
  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === lesson.quiz[currentQuestionIdx].correctAnswer;
    setIsAnswerChecked(true);
    setQuizAnswers((prev) => ({ ...prev, [currentQuestionIdx]: isCorrect }));
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    if (currentQuestionIdx < lesson.quiz.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuickSubScreen("score");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizScore(0);
    setQuizAnswers({});
    setQuickSubScreen("overview");
  };

  const handleCompleteQuest = () => {
    onFinishQuickLesson(quizScore);
  };

  // Render Subscreen headers / stepper
  const steps = [
    { id: "notes", label: "1. Notes" },
    { id: "flashcards", label: "2. Flashcards" },
    { id: "quiz", label: "3. Quiz" },
    { id: "score", label: "4. Score" },
  ];

  return (
    <div id="quick-learning-container" className="max-w-3xl w-full mx-auto px-4 py-4 space-y-6 text-left">
      {/* Top Escape Row */}
      <div className="flex items-center justify-between shrink-0">
        <button
          onClick={() => onNavigate("lesson-list")}
          className="inline-flex items-center gap-1.5 text-xs font-display font-black text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-100/40 px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          ← Exit Quest & Back to Catalog
        </button>
      </div>

      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-display font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-100/50 px-2.5 py-0.5 rounded-full mb-1">
            <Zap className="w-2.5 h-2.5 fill-purple-600 text-purple-600" /> Quick Quest
          </span>
          <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">
            {lesson.title}
          </h2>
        </div>

        {/* Stepper tabs for quick navigation */}
        <div className="flex flex-wrap gap-1.5 bg-purple-50/50 border border-purple-100/50 p-1.5 rounded-2xl">
          {steps.map((st) => {
            const isPassed =
              (quickSubScreen === "notes" && st.id === "notes") ||
              (quickSubScreen === "flashcards" && (st.id === "notes" || st.id === "flashcards")) ||
              (quickSubScreen === "quiz" && st.id !== "score") ||
              quickSubScreen === "score";
            const isActive = quickSubScreen === st.id;
            return (
              <span
                key={st.id}
                className={`text-[10px] font-display font-bold px-2.5 py-1 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm font-extrabold"
                    : isPassed
                    ? "text-purple-600 bg-purple-50"
                    : "text-slate-400 font-medium"
                }`}
              >
                {st.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Screen 8: Lesson Overview / Start Screen */}
      {quickSubScreen === "overview" && (
        <div id="sub-quick-overview" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-6">
          <div className="flex gap-4 items-start bg-purple-50/70 border border-purple-100 p-4 rounded-2xl">
            <span className="text-4xl animate-float">🎓</span>
            <div>
              <h4 className="text-xs font-mono tracking-wider text-purple-600 uppercase font-bold">AI Tutor Intro</h4>
              <p className="text-sm font-display font-medium text-slate-700 mt-0.5">
                "Welcome to '{lesson.title}'! We are going to quickly read some notes, flip a few flashcards to memorize, and then ace a 5-question quiz. You'll do fantastic!"
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider">Your Quest Milestones:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">1</span>
                Simple Notes & Formulas: Study key definitions
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">2</span>
                Interactive Memorizers: Learn via active flashcards
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">3</span>
                Fun Challenge Quiz: Test your brain and win stars!
              </div>
            </div>
          </div>

          <button
            id="btn-start-notes"
            onClick={() => setQuickSubScreen("notes")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Start Notes
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 9: Lesson Notes Screen */}
      {quickSubScreen === "notes" && (
        <div id="sub-quick-notes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notes content */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/20 rounded-full blur-xl"></div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                  <h3 className="text-base font-display font-bold text-slate-800 font-black">1. Summary & Concepts</h3>
                  <button
                    id="btn-speak-notes"
                    onClick={isSpeaking ? handleStopSpeaking : handleSpeakNotes}
                    className={`flex items-center gap-1.5 text-xs font-display font-extrabold px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                      isSpeaking
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100/50"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    {isSpeaking ? "Speaking..." : "Read Aloud"}
                  </button>
                </div>

                {isSpeaking && (
                  <div className="flex items-center gap-1 mb-4 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/40 animate-pulse">
                    <span className="w-1.5 h-3 bg-purple-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-2.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[10px] font-display font-bold text-purple-500 pl-1.5">AI Speaking Audio Simulation</span>
                  </div>
                )}

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {lesson.notes.simpleExplanation}
                </p>

                {/* Example box */}
                <div className="bg-purple-50/40 border border-purple-100/50 rounded-2xl p-4 mt-6">
                  <h4 className="text-xs font-display font-extrabold text-purple-700 uppercase tracking-wider mb-1">
                    {lesson.notes.exampleBox.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {lesson.notes.exampleBox.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar with Formulas and Tips */}
            <div className="space-y-4">
              {lesson.notes.formulaBox && (
                <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 text-left">
                  <h3 className="text-xs font-display font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-50 pb-2 mb-3">
                    {lesson.notes.formulaBox.title}
                  </h3>
                  <pre className="text-xs font-mono font-bold text-purple-700 whitespace-pre-wrap leading-relaxed bg-purple-50/30 p-3 rounded-xl border border-purple-100/20">
                    {lesson.notes.formulaBox.content}
                  </pre>
                </div>
              )}

              {/* AI Tip Box */}
              <div className="bg-gradient-to-tr from-purple-500/10 via-cyan-500/10 to-transparent border border-purple-100 shadow-xl rounded-3xl p-5 text-left">
                <span className="text-2xl animate-float block mb-1">💡</span>
                <h4 className="text-xs font-display font-extrabold text-purple-700 uppercase tracking-wider">
                  AI Study Cheat Tip:
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                  {lesson.notes.aiTip}
                </p>
              </div>
            </div>
          </div>

          <button
            id="btn-goto-flashcards"
            onClick={() => {
              handleStopSpeaking();
              setQuickSubScreen("flashcards");
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Practice with Flashcards
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 10: Lesson Flashcards Screen */}
      {quickSubScreen === "flashcards" && (
        <div id="sub-quick-flashcards" className="space-y-6 text-center max-w-xl mx-auto">
          {/* Card counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-display font-bold px-1">
            <span>Card {currentCardIdx + 1} of {lesson.flashcards.length}</span>
            <span className="text-amber-600">Click card to Flip 🔄</span>
          </div>

          {/* Elegant 3D Flashcard */}
          <div
            id="interactive-flashcard"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 relative cursor-pointer group select-none"
            style={{ perspective: "1000px" }}
          >
            {/* The inner card container with 3D rotation */}
            <div
              className={`w-full h-full duration-500 ease-out`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                position: "absolute",
              }}
            >
              {/* CARD FRONT */}
              <div
                className="absolute w-full h-full bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 flex flex-col justify-between items-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xl">❓</span>
                <h3 className="text-base sm:text-lg font-display font-black text-slate-800 leading-snug px-4">
                  {lesson.flashcards[currentCardIdx].front}
                </h3>
                <span className="text-[10px] text-purple-600 font-display font-bold uppercase tracking-widest bg-purple-50 border border-purple-100/30 px-3 py-1 rounded-full">
                  Click to Flip
                </span>
              </div>

              {/* CARD BACK */}
              <div
                className="absolute w-full h-full bg-gradient-to-tr from-purple-50 via-cyan-50/20 to-white border border-white shadow-2xl rounded-3xl p-6 flex flex-col justify-between items-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-xl">✨</span>
                <p className="text-sm sm:text-base font-display font-extrabold text-slate-800 px-4 leading-relaxed">
                  {lesson.flashcards[currentCardIdx].back}
                </p>
                <div className="flex gap-2.5">
                  <button
                    id="btn-flash-easy"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardsStatus((prev) => ({ ...prev, [currentCardIdx]: "easy" }));
                      if (currentCardIdx < lesson.flashcards.length - 1) {
                        nextCard();
                      }
                    }}
                    className={`text-[10px] font-display font-extrabold px-3 py-1.5 rounded-xl transition-all ${
                      cardsStatus[currentCardIdx] === "easy"
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100"
                    }`}
                  >
                    Mark as Easy 👍
                  </button>
                  <button
                    id="btn-flash-practice"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardsStatus((prev) => ({ ...prev, [currentCardIdx]: "practice" }));
                      if (currentCardIdx < lesson.flashcards.length - 1) {
                        nextCard();
                      }
                    }}
                    className={`text-[10px] font-display font-extrabold px-3 py-1.5 rounded-xl transition-all ${
                      cardsStatus[currentCardIdx] === "practice"
                        ? "bg-purple-600 text-white"
                        : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100"
                    }`}
                  >
                    Need Practice ⚡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcards controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              id="btn-flash-prev"
              onClick={prevCard}
              disabled={currentCardIdx === 0}
              className="px-4 py-2 text-xs font-display font-bold bg-slate-100 text-slate-500 rounded-xl disabled:opacity-40 cursor-pointer"
            >
              ← Previous
            </button>

            {/* Pagination dots */}
            <div className="flex gap-1.5">
              {lesson.flashcards.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentCardIdx
                      ? "bg-purple-600 scale-125"
                      : cardsStatus[i] === "easy"
                      ? "bg-emerald-400"
                      : cardsStatus[i] === "practice"
                      ? "bg-purple-300"
                      : "bg-slate-200"
                  }`}
                ></span>
              ))}
            </div>

            {currentCardIdx < lesson.flashcards.length - 1 ? (
              <button
                id="btn-flash-next"
                onClick={nextCard}
                className="px-4 py-2 text-xs font-display font-bold bg-slate-100 text-slate-600 rounded-xl cursor-pointer"
              >
                Next Card →
              </button>
            ) : (
              <button
                id="btn-flash-to-quiz"
                onClick={() => setQuickSubScreen("quiz")}
                className="px-5 py-2 text-xs font-display font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-95 transition-all shadow-md shadow-purple-100 cursor-pointer"
              >
                Take the Quiz 🚀
              </button>
            )}
          </div>
        </div>
      )}

      {/* Screen 11: Lesson Quiz Screen */}
      {quickSubScreen === "quiz" && (
        <div id="sub-quick-quiz" className="space-y-6 max-w-xl mx-auto">
          {/* Question index */}
          <div className="flex items-center justify-between text-xs font-display font-bold text-slate-500">
            <span>Question {currentQuestionIdx + 1} of {lesson.quiz.length}</span>
            <span className="text-purple-600 font-mono font-black">Score: {quizScore} / {lesson.quiz.length}</span>
          </div>

          {/* Live Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIdx) / lesson.quiz.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-5">
            <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
              {lesson.quiz[currentQuestionIdx].question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {lesson.quiz[currentQuestionIdx].options.map((option, i) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === lesson.quiz[currentQuestionIdx].correctAnswer;
                
                let optionStyle = "border-slate-200 hover:bg-slate-50 bg-white text-slate-700";
                if (isSelected) {
                  optionStyle = "border-purple-600 bg-purple-50/50 text-purple-900";
                }
                if (isAnswerChecked) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                  } else if (isSelected) {
                    optionStyle = "border-rose-300 bg-rose-50 text-rose-900";
                  } else {
                    optionStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    id={`btn-quiz-opt-${i}`}
                    key={i}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswerChecked}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border font-display font-extrabold text-xs sm:text-sm text-left transition-all ${optionStyle} ${
                      !isAnswerChecked ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span>{option}</span>
                    {isAnswerChecked && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                    {isAnswerChecked && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Immediate feedback box */}
            {isAnswerChecked && (
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  selectedOption === lesson.quiz[currentQuestionIdx].correctAnswer
                    ? "bg-emerald-50/40 border-emerald-100/50 text-emerald-800"
                    : "bg-rose-50/40 border-rose-100/50 text-rose-800"
                }`}
              >
                <div className="flex gap-2 items-start">
                  <span className="text-xl">
                    {selectedOption === lesson.quiz[currentQuestionIdx].correctAnswer ? "🎉" : "💡"}
                  </span>
                  <div>
                    <p className="text-xs font-display font-extrabold uppercase tracking-wide">
                      {selectedOption === lesson.quiz[currentQuestionIdx].correctAnswer
                        ? "Correct! Amazing Work!"
                        : "Almost got it! Keep learning!"}
                    </p>
                    <p className="text-xs font-medium mt-1 leading-relaxed text-slate-600">
                      {lesson.quiz[currentQuestionIdx].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quiz controls */}
          <div className="pt-2">
            {!isAnswerChecked ? (
              <button
                id="btn-quiz-check"
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 disabled:opacity-40 transition-all cursor-pointer"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="btn-quiz-next"
                onClick={handleNextQuestion}
                className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 cursor-pointer"
              >
                {currentQuestionIdx < lesson.quiz.length - 1 ? "Next Question" : "Get My Score!"}
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Screen 12: Lesson Score Screen */}
      {quickSubScreen === "score" && (
        <div id="sub-quick-score" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 text-center max-w-md mx-auto space-y-6 relative overflow-hidden">
          {/* Confetti simulator sparkles */}
          <div className="absolute top-1/4 left-1/4 text-2xl animate-float text-amber-400">⭐</div>
          <div className="absolute top-1/3 right-1/4 text-2xl animate-float-slow [animation-delay:2s]">🎉</div>
          <div className="absolute bottom-1/4 left-1/3 text-3xl animate-float">🧁</div>

          <span className="text-5xl">🏆</span>

          <div>
            <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">
              Great Quest Completed!
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              You've studied the notes, practice cards, and answered the quiz.
            </p>
          </div>

          {/* Concentric Circle Score Display */}
          <div className="relative flex items-center justify-center w-36 h-36 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="#8b5cf6"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="376.8"
                strokeDashoffset={376.8 - (376.8 * (quizScore / lesson.quiz.length))}
                className="transition-all duration-1000 animate-pulse-glow"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-mono font-extrabold text-slate-800">
                {quizScore}/{lesson.quiz.length}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Correct</span>
            </div>
          </div>

          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4">
            <div className="text-center space-y-0.5 border-r border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Accuracy</span>
              <span className="text-base font-mono font-extrabold text-slate-700">
                {(quizScore / lesson.quiz.length) * 100}%
              </span>
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">XP Stars</span>
              <span className="text-base font-mono font-extrabold text-emerald-600">
                +{quizScore * 50} ⭐
              </span>
            </div>
          </div>

          {/* Completion buttons */}
          <div className="space-y-3 pt-2">
            <button
              id="btn-quiz-done"
              onClick={handleCompleteQuest}
              className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Mark Lesson Complete 🎉
            </button>
            <button
              id="btn-quiz-retry"
              onClick={handleRestartQuiz}
              className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-display font-bold py-3 px-6 rounded-2xl border border-slate-200 cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Lesson Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
