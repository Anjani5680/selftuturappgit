import React, { useState } from "react";
import { DIAGNOSTIC_QUESTIONS, WEAKNESS_PRACTICE_DATA } from "../data";
import { Brain, Sparkles, Volume2, Globe, CheckCircle2, ChevronRight, RotateCcw, TrendingUp, Trophy, ArrowRight, ShieldAlert } from "lucide-react";

interface DeepLearningFlowProps {
  onAddStrength: (strength: string) => void;
  onNavigate: (screen: string) => void;
  deepSubScreen: string;
  setDeepSubScreen: (subScreen: string) => void;
  weaknesses: string[];
  setWeaknesses: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DeepLearningFlow: React.FC<DeepLearningFlowProps> = ({
  onAddStrength,
  onNavigate,
  deepSubScreen,
  setDeepSubScreen,
  weaknesses,
  setWeaknesses,
}) => {
  // Main states
  const [diagIdx, setDiagIdx] = useState(0);
  const [diagAnswers, setDiagAnswers] = useState<Record<number, string>>({});
  const [selectedWeakTopic, setSelectedWeakTopic] = useState<string>("Word Problems");
  
  // Voice & translation selector state
  const [selectedVoice, setSelectedVoice] = useState("English Indian Voice");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Practice state
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceScore, setPracticeScore] = useState(0);
  const [isPracticeFinished, setIsPracticeFinished] = useState(false);

  // Flashcards state
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const voices = [
    "English Indian Voice", "Hindi Voice", "Tamil Voice", "Telugu Voice",
    "Marathi Voice", "Bengali Voice", "Gujarati Voice", "Kannada Voice",
    "Malayalam Voice", "Punjabi Voice"
  ];

  const languages = [
    "English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Gujarati", "Kannada", "Malayalam", "Punjabi"
  ];

  // TTS Voice simulation
  const handleVoicePlay = () => {
    setIsSpeaking(true);
    const content = WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.simpleNotes || "Study hard!";
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
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

  // 10 MCQ Diagnostics interaction
  const handleSelectDiag = (ans: string) => {
    setDiagAnswers((prev) => ({ ...prev, [diagIdx]: ans }));
    setTimeout(() => {
      if (diagIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
        setDiagIdx((prev) => prev + 1);
      } else {
        // Evaluate strengths & weaknesses dynamically based on wrong/right answers
        const wrongTopics: string[] = [];
        DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
          if (diagAnswers[idx] !== q.correctAnswer) {
            wrongTopics.push(q.topic);
          }
        });
        
        // Remove duplicates and save
        const finalWeaknesses = Array.from(new Set(wrongTopics)).slice(0, 3);
        if (finalWeaknesses.length === 0) {
          finalWeaknesses.push("Word Problems");
          finalWeaknesses.push("Fraction Comparison");
        }
        setWeaknesses(finalWeaknesses);
        setSelectedWeakTopic(finalWeaknesses[0]);
        setDeepSubScreen("diagnosis-result");
      }
    }, 200);
  };

  // Practice Quiz
  const handlePracticeAnswer = (ans: string) => {
    const topicData = WEAKNESS_PRACTICE_DATA[selectedWeakTopic];
    if (!topicData) return;
    
    const currentQ = topicData.quiz[practiceIdx];
    const isCorrect = ans === currentQ.correctAnswer;
    setPracticeAnswers((prev) => ({ ...prev, [practiceIdx]: ans }));

    if (isCorrect) {
      setPracticeScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (practiceIdx < topicData.quiz.length - 1) {
        setPracticeIdx((prev) => prev + 1);
      } else {
        setIsPracticeFinished(true);
        setDeepSubScreen("success");
      }
    }, 500);
  };

  const handleFinishPath = () => {
    // Convert weakness to strength!
    onAddStrength(selectedWeakTopic);
    setWeaknesses((prev) => prev.filter((w) => w !== selectedWeakTopic));
    setDeepSubScreen("report");
  };

  const handleRestartDiagnosis = () => {
    setDiagIdx(0);
    setDiagAnswers({});
    setDeepSubScreen("diagnosis");
  };

  return (
    <div id="deep-learning-container" className="max-w-3xl w-full mx-auto px-4 py-4 space-y-6 text-left">
      {/* Top Escape Row */}
      <div className="flex items-center justify-between shrink-0">
        <button
          onClick={() => onNavigate("lesson-list")}
          className="inline-flex items-center gap-1.5 text-xs font-display font-black text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-100/40 px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          ← Exit Deep Study & Back to Catalog
        </button>
      </div>

      {/* Step progress timeline tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-display font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full mb-1">
            <Brain className="w-2.5 h-2.5" /> Deep study
          </span>
          <h2 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">
            Deep AI Learning Loop
          </h2>
        </div>

        {/* Diagnostic Timeline Indicator */}
        <div className="flex gap-1.5 bg-purple-50/50 border border-purple-100/50 p-1 rounded-2xl text-[10px] font-display font-bold text-slate-400">
          <span className={`px-2 py-1 rounded-xl transition-all ${deepSubScreen === "overview" || deepSubScreen === "diagnosis" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold shadow-sm" : ""}`}>1. Diagnosis</span>
          <span className={`px-2 py-1 rounded-xl transition-all ${deepSubScreen === "diagnosis-result" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold shadow-sm" : ""}`}>2. Results</span>
          <span className={`px-2 py-1 rounded-xl transition-all ${deepSubScreen === "notes" || deepSubScreen === "flashcards" || deepSubScreen === "quiz" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold shadow-sm" : ""}`}>3. Learn</span>
          <span className={`px-2 py-1 rounded-xl transition-all ${deepSubScreen === "success" || deepSubScreen === "report" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold shadow-sm" : ""}`}>4. Mastery</span>
        </div>
      </div>

      {/* Screen 14: Diagnosis Start Screen */}
      {deepSubScreen === "overview" && (
        <div id="sub-deep-overview" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-6">
          <div className="flex gap-4 items-start bg-purple-50/70 border border-purple-100 p-4 rounded-2xl">
            <span className="text-4xl animate-pulse">🧠</span>
            <div>
              <h4 className="text-xs font-mono tracking-wider text-purple-600 uppercase font-bold">AI Diagnostic Engine</h4>
              <p className="text-sm font-display font-medium text-slate-700 mt-0.5">
                "Hello, student! I'm scanning your skills. I'll give you a quick 10-question test to find your mathematical strengths and weak areas. Then we will practice together!"
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-sm font-display font-extrabold text-slate-700 uppercase tracking-wider">How Deep Learning Works:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">1</span>
                Take 10 MCQs diagnostic questions
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">2</span>
                AI detects your strengths and weak areas automatically
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">3</span>
                Study localized weak notes with voice synthesis
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl text-xs font-display font-bold text-slate-600">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-mono font-bold">4</span>
                Convert weaknesses into absolute strengths!
              </div>
            </div>
          </div>

          <button
            id="btn-start-diagnosis"
            onClick={() => setDeepSubScreen("diagnosis")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Start Diagnostic Scan
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 15: 10 MCQ Diagnosis Screen */}
      {deepSubScreen === "diagnosis" && (
        <div id="sub-deep-diagnosis" className="space-y-6 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-display font-bold text-slate-500">
            <span>Diagnostic Question {diagIdx + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
            <span className="text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider text-[9px]">
              {DIAGNOSTIC_QUESTIONS[diagIdx].topic}
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${((diagIdx + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-5">
            <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
              {DIAGNOSTIC_QUESTIONS[diagIdx].question}
            </h3>

            {/* Answer buttons */}
            <div className="space-y-2.5">
              {DIAGNOSTIC_QUESTIONS[diagIdx].options.map((option, idx) => {
                const isSelected = diagAnswers[diagIdx] === option;
                return (
                  <button
                    id={`btn-diag-opt-${idx}`}
                    key={idx}
                    onClick={() => handleSelectDiag(option)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border font-display font-extrabold text-xs sm:text-sm text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-purple-600 bg-purple-50/50 text-purple-900"
                        : "border-slate-200 hover:bg-slate-50 bg-white text-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Pattern learning indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
            <span>AI is identifying your mathematical thinking patterns...</span>
          </div>
        </div>
      )}

      {/* Screen 16: Strength & Weakness Result */}
      {deepSubScreen === "diagnosis-result" && (
        <div id="sub-deep-result" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-4xl animate-bounce block">✨</span>
            <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">AI Diagnostic Complete</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold">
              Our neural model has successfully segmented your topic proficiencies. Here's what we found:
            </p>
          </div>

          {/* Strengths & Weaknesses comparison lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-left">
              <span className="text-[10px] font-display font-extrabold tracking-wider text-emerald-700 uppercase flex items-center gap-1.5 mb-3 border-b border-emerald-100/50 pb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Perfect Strengths
              </span>
              <ul className="space-y-2 text-xs font-display font-extrabold text-slate-800">
                <li>🌟 Addition Mastery</li>
                <li>🌟 Basic Geometric Shapes</li>
                <li>🌟 Basic Fraction Visualizer</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 text-left">
              <span className="text-[10px] font-display font-extrabold tracking-wider text-purple-700 uppercase flex items-center gap-1.5 mb-3 border-b border-purple-100/50 pb-1.5">
                <ShieldAlert className="w-4 h-4 text-purple-500" /> Needs Improvement
              </span>
              <ul className="space-y-2 text-xs font-display font-bold text-slate-700">
                {weaknesses.map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800">⚡ {item}</span>
                    <button
                      onClick={() => {
                        setSelectedWeakTopic(item);
                        setDeepSubScreen("notes");
                      }}
                      className="text-[9px] font-display font-black bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      Improve →
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            id="btn-start-plan"
            onClick={() => setDeepSubScreen("notes")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Start Personal Improvement Plan
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 17: Personalized Notes with translation and voices */}
      {deepSubScreen === "notes" && (
        <div id="sub-deep-notes" className="space-y-6">
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 relative overflow-hidden text-left space-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/30 rounded-full blur-2xl"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-3">
              <div>
                <p className="text-[10px] font-display font-extrabold text-purple-600 uppercase tracking-widest">Selected Topic Plan</p>
                <h3 className="text-lg font-display font-black text-slate-900">{selectedWeakTopic} Personalized Lessons</h3>
              </div>
              <button
                id="btn-voice-speak-deep"
                onClick={isSpeaking ? handleStopSpeaking : handleVoicePlay}
                className={`flex items-center gap-1.5 text-xs font-display font-extrabold px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                  isSpeaking
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100/50"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                {isSpeaking ? "Speaking..." : "Listen in Voice"}
              </button>
            </div>

            {/* Custom selectors layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
              {/* Voice select */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-display font-extrabold uppercase tracking-wide text-slate-400 block">AI Accent Voice:</span>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="bg-white border border-slate-200 text-xs font-display font-extrabold px-3 py-1.5 rounded-xl outline-none w-full"
                >
                  {voices.map((v, i) => (
                    <option key={i} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Translation selects */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-display font-extrabold uppercase tracking-wide text-slate-400 block">Translate Notes:</span>
                <div className="flex flex-wrap gap-1">
                  {languages.slice(0, 4).map((lang, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`text-[9px] font-display font-extrabold px-2 py-1 rounded-lg border transition-colors ${
                        selectedLanguage === lang
                          ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Speaking voice ripple wave */}
            {isSpeaking && (
              <div className="flex items-center gap-1.5 bg-purple-50/50 p-3 rounded-xl border border-purple-100/30">
                <div className="flex items-end gap-1 h-5 pl-1 shrink-0">
                  <span className="w-1 bg-purple-600 rounded-full animate-bounce h-2"></span>
                  <span className="w-1 bg-purple-600 rounded-full animate-bounce h-4 [animation-delay:0.1s]"></span>
                  <span className="w-1 bg-purple-600 rounded-full animate-bounce h-3 [animation-delay:0.3s]"></span>
                  <span className="w-1 bg-purple-600 rounded-full animate-bounce h-5 [animation-delay:0.2s]"></span>
                </div>
                <span className="text-[10px] font-display font-bold text-purple-600">
                  AI speaking in {selectedVoice}... ({selectedLanguage} translator active)
                </span>
              </div>
            )}

            {/* Custom Notes Content */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-slate-400 block">Explanation:</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-1">
                  {selectedLanguage === "Hindi" 
                    ? "यह पाठ आपको सिखाता है कि समस्याओं को आसानी से कैसे हल करें! हमेशा प्रश्न को दो बार पढ़ें और महत्वपूर्ण संख्याओं को चिह्नित करें।"
                    : WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.simpleNotes}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-slate-400 block">Common Misunderstanding:</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-1 bg-amber-50/40 p-3 rounded-xl border border-amber-100/30">
                  {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.mistakeExplanation}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-slate-400 block">AI Study Shortcut:</span>
                <p className="text-xs sm:text-sm text-purple-700 leading-relaxed font-extrabold mt-1">
                  💡 {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.aiTip}
                </p>
              </div>
            </div>
          </div>

          <button
            id="btn-deep-goto-cards"
            onClick={() => {
              handleStopSpeaking();
              setDeepSubScreen("flashcards");
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Practice Weakness Flashcards
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 18: Weak Topic Flashcards */}
      {deepSubScreen === "flashcards" && (
        <div id="sub-deep-flashcards" className="space-y-6 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 font-display font-bold px-1">
            <span>Focused Card {flashcardIdx + 1} of {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.flashcards.length}</span>
            <span className="text-purple-600 font-extrabold">Tap to Reveal 🔄</span>
          </div>

          {/* Simple Card Flip Simulator */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-2xl relative cursor-pointer flex flex-col justify-between items-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-600"></div>

            {!isFlipped ? (
              <>
                <span className="text-xl">🧠</span>
                <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug px-4">
                  {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.flashcards[flashcardIdx]?.front}
                </h3>
                <span className="text-[10px] text-purple-600 font-display font-bold uppercase tracking-widest bg-purple-50 border border-purple-100/50 px-3 py-1 rounded-full">
                  Click to Flip
                </span>
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                <p className="text-sm sm:text-base font-display font-extrabold text-slate-800 px-4 leading-relaxed">
                  {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.flashcards[flashcardIdx]?.back}
                </p>
                <span className="text-[10px] text-emerald-600 font-display font-black uppercase tracking-widest bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full">
                  Understood!
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIdx((prev) => Math.max(prev - 1, 0));
              }}
              disabled={flashcardIdx === 0}
              className="px-4 py-2 text-xs font-display font-bold bg-slate-100 text-slate-500 rounded-xl disabled:opacity-40 cursor-pointer"
            >
              ← Previous
            </button>

            {flashcardIdx < (WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.flashcards.length || 0) - 1 ? (
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setFlashcardIdx((prev) => Math.min(prev + 1, (WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.flashcards.length || 0) - 1));
                }}
                className="px-4 py-2 text-xs font-display font-bold bg-slate-100 text-slate-600 rounded-xl cursor-pointer"
              >
                Next Card →
              </button>
            ) : (
              <button
                id="btn-goto-retest"
                onClick={() => setDeepSubScreen("quiz")}
                className="px-5 py-2 text-xs font-display font-black bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white rounded-xl shadow-md shadow-purple-100 cursor-pointer"
              >
                Take Retest Quiz 🚀
              </button>
            )}
          </div>
        </div>
      )}

      {/* Screen 19: Practice Quiz Screen */}
      {deepSubScreen === "quiz" && (
        <div id="sub-deep-quiz" className="space-y-6 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-display font-bold text-slate-500">
            <span>Retest Question {practiceIdx + 1} of {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.quiz.length}</span>
            <span className="text-purple-600 font-mono font-black">Passing Score: 2/3</span>
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-5">
            <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
              {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.quiz[practiceIdx]?.question}
            </h3>

            {/* MCQ Options */}
            <div className="space-y-2.5">
              {WEAKNESS_PRACTICE_DATA[selectedWeakTopic]?.quiz[practiceIdx]?.options.map((option, idx) => (
                <button
                  id={`btn-retest-opt-${idx}`}
                  key={idx}
                  onClick={() => handlePracticeAnswer(option)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border font-display font-extrabold text-xs sm:text-sm text-left hover:bg-slate-50 transition-all cursor-pointer bg-white text-slate-700 border-slate-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Encouraging Mascot Message */}
          <div className="text-center text-xs text-slate-400 font-medium">
            <span>AI Buddy is cheering you on: "You got this! Clear your mind and calculate."</span>
          </div>
        </div>
      )}

      {/* Screen 20: Weakness Converted to Strength Screen */}
      {deepSubScreen === "success" && (
        <div id="sub-deep-success" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 text-center max-w-md mx-auto space-y-6 relative overflow-hidden">
          {/* Sparkles */}
          <div className="absolute top-10 left-10 text-2xl animate-float text-amber-400">🌟</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-float-slow text-purple-400">🏆</div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg animate-bounce">
            🥇
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">
              Weakness Converted!
            </h3>
            <p className="text-sm font-display font-black text-emerald-600">
              Amazing! {selectedWeakTopic} is now your STRENGTH!
            </p>
          </div>

          {/* Transformation Card */}
          <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-2xl space-y-3.5">
            <div className="flex items-center justify-between text-xs font-display font-bold border-b border-slate-200 pb-2">
              <span className="text-slate-400">Before Diagnosis</span>
              <span className="text-emerald-600">Current Proficiency</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100/50 px-3 py-1 rounded-xl font-display font-bold">
                Needs Practice (Weak)
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-xl font-display font-bold">
                Highly Proficient (Strong)
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-display font-extrabold text-slate-800">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Score Improvement: +{(practiceScore / 3) * 100}%</span>
            </div>
          </div>

          <button
            id="btn-complete-deep-path"
            onClick={handleFinishPath}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            View New Report Card
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* Screen 21: Deep Learning Report Card */}
      {deepSubScreen === "report" && (
        <div id="sub-deep-report" className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 space-y-6 text-left">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-display font-black text-slate-900">Deep Study Progress Card</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">Summary of all Deep learning and diagnostic achievements.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-center space-y-1">
              <span className="text-2xl font-mono font-extrabold text-purple-600">+{(practiceScore / 3) * 100}%</span>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase">Average Score Boost</p>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-center space-y-1">
              <span className="text-2xl font-mono font-extrabold text-emerald-600">1</span>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase">Weakness Fixed Area</p>
            </div>
          </div>

          {/* AI Generated message */}
          <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl flex gap-3 items-start">
            <span className="text-2xl animate-float">🤖</span>
            <div className="space-y-1">
              <h5 className="text-xs font-display font-extrabold text-purple-700">AI-Generated Study Advice:</h5>
              <p className="text-xs text-slate-700 leading-relaxed font-extrabold">
                "Tremendous job today! Your understanding of {selectedWeakTopic} improved by leaps and bounds. Your next suggested practice path is Word Problems. Let's conquer it next!"
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-4 rounded-2xl text-xs text-center cursor-pointer transition-all shadow-md shadow-purple-100"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleRestartDiagnosis}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-display font-bold py-3.5 px-4 rounded-2xl text-xs text-center cursor-pointer"
            >
              Take New Diagnosis Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
