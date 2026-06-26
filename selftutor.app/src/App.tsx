import React, { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { ProfileSetupPage } from "./components/ProfileSetupPage";
import { GradeSubjectSelection } from "./components/GradeSubjectSelection";
import { LearningModeSelection } from "./components/LearningModeSelection";
import { Dashboard } from "./components/Dashboard";
import { LessonSelection } from "./components/LessonSelection";
import { QuickLearningFlow } from "./components/QuickLearningFlow";
import { DeepLearningFlow } from "./components/DeepLearningFlow";
import { AITutorChat } from "./components/AITutorChat";
import { ReportsPage } from "./components/ReportsPage";
import { BadgesPage } from "./components/BadgesPage";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { DemoNavigator } from "./components/DemoNavigator";
import { Lesson, AVATARS } from "./data";
import { LayoutDashboard, Compass, BookOpen, MessageSquare, Award, User, Settings, LogOut, Menu, X } from "lucide-react";

export default function App() {
  // Navigation & session states
  const [currentScreen, setCurrentScreen] = useState<string>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Student details
  const [studentName, setStudentName] = useState("Aarav");
  const [studentAvatar, setStudentAvatar] = useState("buddy");
  const [grade, setGrade] = useState<number>(5);
  const [subject, setSubject] = useState<"Maths" | "Science">("Maths");
  const [learningMode, setLearningMode] = useState<"quick" | "deep">("quick");

  // Selected Lesson
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Lesson sub-flows navigation trackers
  const [quickSubScreen, setQuickSubScreen] = useState<string>("overview");
  const [deepSubScreen, setDeepSubScreen] = useState<string>("overview");

  // Progress Database States
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lessonScores, setLessonScores] = useState<Record<string, number>>({});
  const [strengths, setStrengths] = useState<string[]>(["Addition Mastery", "Shapes"]);
  const [weaknesses, setWeaknesses] = useState<string[]>(["Word Problems", "Fraction Comparison"]);

  // Aesthetic Theme selection state
  const [selectedTheme, setSelectedTheme] = useState<string>("immersive");

  // Reset Progress Database action
  const handleResetProgress = () => {
    setCompletedLessons([]);
    setLessonScores({});
    setStrengths(["Addition Mastery", "Shapes"]);
    setWeaknesses(["Word Problems", "Fraction Comparison"]);
    setSelectedLesson(null);
    setCurrentScreen("dashboard");
  };

  // Quick learning complete score trigger
  const handleFinishQuickLesson = (score: number) => {
    if (selectedLesson) {
      if (!completedLessons.includes(selectedLesson.id)) {
        setCompletedLessons((prev) => [...prev, selectedLesson.id]);
      }
      setLessonScores((prev) => ({ ...prev, [selectedLesson.id]: score }));
      
      // Upgrade strength if score is near-perfect
      if (score >= 4 && !strengths.includes(selectedLesson.title)) {
        setStrengths((prev) => [...prev, selectedLesson.title]);
        setWeaknesses((prev) => prev.filter((w) => w !== selectedLesson.title));
      }
    }
    setCurrentScreen("reports-main");
  };

  const handleAddStrength = (topic: string) => {
    if (!strengths.includes(topic)) {
      setStrengths((prev) => [...prev, topic]);
    }
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetQuickSubScreen = (sub: string) => {
    setQuickSubScreen(sub);
    if (sub === "overview") {
      setCurrentScreen("quick-learning-overview");
    } else if (sub === "notes") {
      setCurrentScreen("quick-learning-notes");
    } else if (sub === "flashcards") {
      setCurrentScreen("quick-learning-flashcards");
    } else if (sub === "quiz") {
      setCurrentScreen("quick-learning-quiz");
    } else if (sub === "score") {
      setCurrentScreen("quick-learning-score");
    }
  };

  const handleSetDeepSubScreen = (sub: string) => {
    setDeepSubScreen(sub);
    if (sub === "overview") {
      setCurrentScreen("deep-learning-start");
    } else if (sub === "diagnosis") {
      setCurrentScreen("deep-learning-diagnosis");
    } else if (sub === "diagnosis-result") {
      setCurrentScreen("deep-learning-diagnosis-result");
    } else if (sub === "notes") {
      setCurrentScreen("deep-learning-notes");
    } else if (sub === "flashcards") {
      setCurrentScreen("deep-learning-flashcards");
    } else if (sub === "quiz") {
      setCurrentScreen("deep-learning-quiz");
    } else if (sub === "success") {
      setCurrentScreen("deep-learning-success");
    } else if (sub === "report") {
      setCurrentScreen("deep-learning-success-report");
    }
  };

  // Determine active global CSS background skins
  let themeBg = "bg-gradient-to-tr from-blue-50/70 via-indigo-50/50 to-purple-50/60 text-slate-800";
  if (selectedTheme === "space") {
    themeBg = "bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-slate-100 min-h-screen dark-theme";
  } else if (selectedTheme === "mint") {
    themeBg = "bg-gradient-to-tr from-teal-50 to-emerald-100/70 text-slate-800";
  } else if (selectedTheme === "cabin") {
    themeBg = "bg-gradient-to-tr from-amber-50 to-orange-100/70 text-slate-800";
  } else if (selectedTheme === "immersive") {
    themeBg = "bg-[#F7F9FF] text-[#1A1C1E] min-h-screen";
  }

  // Check if current screen is inside onboarding layout
  const isOnboarding = [
    "landing",
    "login",
    "profile-setup",
    "grade-subject",
    "learning-mode",
  ].includes(currentScreen);

  const isSided = isLoggedIn && !isOnboarding;

  // Common Header Nav Click Actions
  const renderSidebarNavButton = (id: string, label: string, icon: React.ReactNode) => {
    const isActive = currentScreen.startsWith(id);
    return (
      <button
        id={`nav-btn-${id}`}
        onClick={() => {
          if (id === "learning-mode") {
            setCurrentScreen("learning-mode");
          } else {
            setCurrentScreen(id);
          }
          setIsMobileMenuOpen(false);
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-display font-extrabold transition-all cursor-pointer w-full text-left ${
          isActive
            ? selectedTheme === "space"
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm"
              : selectedTheme === "immersive"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200"
              : "bg-blue-600 text-white shadow-md shadow-blue-100"
            : selectedTheme === "space"
            ? "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
            : selectedTheme === "immersive"
            ? "text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-transparent"
            : "text-slate-600 hover:bg-slate-100 border border-transparent"
        }`}
      >
        {icon}
        <span className="inline">{label}</span>
      </button>
    );
  };

  const avatarObj = AVATARS.find((a) => a.id === studentAvatar) || AVATARS[3];

  return (
    <div className={`min-h-screen ${isSided ? "md:h-screen md:overflow-hidden" : ""} flex flex-col ${isSided ? "md:flex-row" : ""} transition-colors duration-500 relative overflow-x-hidden ${themeBg}`}>
      {/* Immersive UI Background Orbs & Dots */}
      {selectedTheme === "immersive" && (
        <>
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-150px] right-[-50px] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Fluid Background Dots Decor */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-50 pointer-events-none animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-40 pointer-events-none animate-float"></div>
          <div className="absolute top-1/2 left-[10%] w-4 h-4 bg-cyan-200 rounded-full opacity-30 pointer-events-none animate-float-slow"></div>
          <div className="absolute top-[10%] right-[40%] w-2 h-2 bg-slate-200 rounded-full pointer-events-none"></div>
        </>
      )}

      {/* MOBILE HEADER (Visible on small screens only, when logged in) */}
      {isSided && (
        <header className="flex md:hidden items-center justify-between px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 w-full shadow-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentScreen("dashboard")}>
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-md font-display font-bold text-base">
              S
            </div>
            <span 
              className="font-display font-extrabold text-base bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent tracking-tight"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              SelfTutor.APP
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all border border-slate-200/50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>
      )}

      {/* MOBILE MENU DRAWER OVERLAY (Backdrop) */}
      {isSided && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR PANEL (Drawer on Mobile, Sticky Panel on Desktop) */}
      {isSided && (
        <aside
          className={`
            fixed inset-y-0 left-0 w-72 z-50 md:sticky md:top-0 md:h-screen md:flex md:flex-col p-6 shrink-0 border-r overflow-y-auto transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${
              selectedTheme === "space"
                ? "bg-slate-950/95 border-slate-800 text-slate-100"
                : selectedTheme === "mint"
                ? "bg-emerald-50/95 border-emerald-100 text-slate-800"
                : selectedTheme === "cabin"
                ? "bg-amber-50/95 border-amber-100 text-slate-800"
                : "bg-white/95 border-slate-100 text-[#1A1C1E]"
            }
          `}
        >
          {/* Sidebar Logo Header */}
          <div className="flex items-center justify-between border-b border-slate-100/10 pb-5 mb-5">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setCurrentScreen("dashboard"); setIsMobileMenuOpen(false); }}>
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 font-display font-bold text-xl">
                S
              </div>
              <div>
                <span 
                  className="font-display font-extrabold text-base bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent tracking-tight block"
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  SelfTutor.APP
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">AI Study Companion</span>
              </div>
            </div>
            
            {/* Close button on Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Student Avatar / Mini-Dashboard Companion in Sidebar */}
          <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100/10 rounded-2xl p-4 mb-6 flex items-center gap-3.5 shadow-sm text-left">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${avatarObj.color} shrink-0`}>
              {avatarObj.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-display font-black text-slate-900 dark:text-white truncate">
                {studentName}
              </p>
              <p className="text-[10px] text-slate-400 font-extrabold truncate">
                Grade {grade} · {subject}
              </p>
              {/* Level Progress Bar inside Sidebar */}
              <div className="mt-1.5 space-y-1">
                <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono font-bold">
                  <span>Level {Math.floor((completedLessons.length * 200 + 100) / 1000) + 3}</span>
                  <span>{(completedLessons.length * 200 + 100) % 1000} / 1000 XP</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${(((completedLessons.length * 200 + 100) % 1000) / 1000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Subject Switcher */}
          <div className="px-1 mb-6">
            <p className="text-[9px] font-display font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 pl-1">
              Active Subject
            </p>
            <div className="bg-slate-100/80 dark:bg-slate-900/40 p-1 rounded-xl flex items-center gap-1 border border-slate-200/10 shadow-inner">
              <button
                onClick={() => setSubject("Maths")}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-display font-black transition-all cursor-pointer text-center ${
                  subject === "Maths"
                    ? "bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                🔢 Maths
              </button>
              <button
                onClick={() => setSubject("Science")}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-display font-black transition-all cursor-pointer text-center ${
                  subject === "Science"
                    ? "bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                🧪 Science
              </button>
            </div>
          </div>

          {/* Sidebar Navigation buttons */}
          <nav className="flex-1 space-y-1.5 text-left">
            <span className="text-[9px] font-display font-extrabold uppercase tracking-wider text-slate-400 block px-3 mb-2">
              Main Menu
            </span>
            {renderSidebarNavButton("dashboard", "Student Dashboard", <LayoutDashboard className="w-4 h-4" />)}
            {renderSidebarNavButton("lesson-list", "Lesson Catalog", <BookOpen className="w-4 h-4" />)}
            {renderSidebarNavButton("ai-tutor-chat", "AI Chat Companion", <MessageSquare className="w-4 h-4" />)}
            {renderSidebarNavButton("reports-main", "My Report Cards", <Award className="w-4 h-4" />)}
            {renderSidebarNavButton("profile-view", "My Profile", <User className="w-4 h-4" />)}
            {renderSidebarNavButton("settings-view", "Account Settings", <Settings className="w-4 h-4" />)}
          </nav>

          {/* Footer of Sidebar */}
          <div className="mt-auto pt-6 border-t border-slate-100/10">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setIsMobileMenuOpen(false);
                setCurrentScreen("landing");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl text-xs font-display font-extrabold transition-all cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area Wrapper */}
      <div className={`flex-1 flex flex-col ${isSided ? "md:h-screen md:overflow-y-auto" : "min-h-screen"} relative overflow-x-hidden`}>
        {/* 2. Primary Screen Layout Stepper */}
        <main className={`flex-1 flex ${isSided || currentScreen === "landing" ? "flex-col items-stretch justify-start" : "items-center justify-center"} py-6 px-4 md:px-6 relative z-10 w-full`}>
          {/* Screen 1: Landing Page */}
          {currentScreen === "landing" && (
            <LandingPage onGetStarted={() => setCurrentScreen("login")} />
          )}

          {/* Screen 2: Login Screen */}
          {currentScreen === "login" && (
            <LoginPage
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setCurrentScreen("profile-setup");
              }}
              onBack={() => setCurrentScreen("landing")}
            />
          )}

        {/* Screen 3: Student Profile Setup */}
        {currentScreen === "profile-setup" && (
          <ProfileSetupPage
            onSetupComplete={(name, avatar) => {
              setStudentName(name);
              setStudentAvatar(avatar);
              setCurrentScreen("grade-subject");
            }}
          />
        )}

        {/* Screen 4: Grade + Subject Selection */}
        {currentScreen === "grade-subject" && (
          <GradeSubjectSelection
            selectedGrade={grade}
            selectedSubject={subject}
            onChangeGrade={setGrade}
            onChangeSubject={setSubject}
            onContinue={() => {
              if (isOnboarding) {
                setCurrentScreen("learning-mode");
              } else {
                setCurrentScreen("dashboard");
              }
            }}
            studentName={studentName}
          />
        )}

        {/* Screen 5: Quest Learning Mode selection */}
        {currentScreen === "learning-mode" && (
          <LearningModeSelection
            studentName={studentName}
            onSelectMode={(mode) => {
              setLearningMode(mode);
              setCurrentScreen("lesson-list");
            }}
          />
        )}

        {/* Screen 6: Student Dashboard */}
        {currentScreen === "dashboard" && (
          <Dashboard
            studentName={studentName}
            studentAvatar={studentAvatar}
            grade={grade}
            subject={subject}
            stats={{
              lessonsCompleted: completedLessons.length,
              averageScore:
                completedLessons.length > 0
                  ? Math.round(
                      ((Object.values(lessonScores) as number[]).reduce((a, b) => a + b, 0) /
                        completedLessons.length) *
                        20
                    )
                  : 80,
              strengths: strengths,
              weaknesses: weaknesses,
            }}
            onResumeQuick={() => {
              setLearningMode("quick");
              setCurrentScreen("lesson-list");
            }}
            onResumeDeep={() => {
              setLearningMode("deep");
              setCurrentScreen("lesson-list");
            }}
            onStartNewLesson={() => {
              setCurrentScreen("lesson-list");
            }}
            onNavigate={setCurrentScreen}
            onChangeSubject={setSubject}
          />
        )}

        {/* Screen 7: Lesson selection Catalogue */}
        {currentScreen === "lesson-list" && (
          <LessonSelection
            subject={subject}
            grade={grade}
            completedLessons={completedLessons}
            lessonScores={lessonScores}
            onNavigate={setCurrentScreen}
            onSelectLesson={(lesson, mode) => {
              setSelectedLesson(lesson);
              setLearningMode(mode);
              if (mode === "quick") {
                setQuickSubScreen("overview");
                setCurrentScreen("quick-learning-overview");
              } else {
                setDeepSubScreen("overview");
                setCurrentScreen("deep-learning-start");
              }
            }}
          />
        )}

        {/* Screen 8: Quick Learning Overview */}
        {currentScreen === "quick-learning-overview" && selectedLesson && (
          <QuickLearningFlow
            lesson={selectedLesson}
            quickSubScreen={quickSubScreen}
            setQuickSubScreen={handleSetQuickSubScreen}
            onFinishQuickLesson={handleFinishQuickLesson}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 9: Quick Learning Notes */}
        {currentScreen === "quick-learning-notes" && selectedLesson && (
          <QuickLearningFlow
            lesson={selectedLesson}
            quickSubScreen="notes"
            setQuickSubScreen={handleSetQuickSubScreen}
            onFinishQuickLesson={handleFinishQuickLesson}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 10: Quick Learning Flashcards */}
        {currentScreen === "quick-learning-flashcards" && selectedLesson && (
          <QuickLearningFlow
            lesson={selectedLesson}
            quickSubScreen="flashcards"
            setQuickSubScreen={handleSetQuickSubScreen}
            onFinishQuickLesson={handleFinishQuickLesson}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 11: Quick Learning Quiz */}
        {currentScreen === "quick-learning-quiz" && selectedLesson && (
          <QuickLearningFlow
            lesson={selectedLesson}
            quickSubScreen="quiz"
            setQuickSubScreen={handleSetQuickSubScreen}
            onFinishQuickLesson={handleFinishQuickLesson}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 12-13: Quick Learning Score & Certificate */}
        {currentScreen === "quick-learning-score" && selectedLesson && (
          <QuickLearningFlow
            lesson={selectedLesson}
            quickSubScreen="score"
            setQuickSubScreen={handleSetQuickSubScreen}
            onFinishQuickLesson={handleFinishQuickLesson}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 14: Deep Diagnosis Intro Overview */}
        {currentScreen === "deep-learning-start" && (
          <DeepLearningFlow
            deepSubScreen="overview"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 15: Deep Learning 10 MCQ Diagnosis */}
        {currentScreen === "deep-learning-diagnosis" && (
          <DeepLearningFlow
            deepSubScreen="diagnosis"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 16: Deep Learning Diagnosis Results list */}
        {currentScreen === "deep-learning-diagnosis-result" && (
          <DeepLearningFlow
            deepSubScreen="diagnosis-result"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 17: Deep Learning Personalized Voice Notes */}
        {currentScreen === "deep-learning-notes" && (
          <DeepLearningFlow
            deepSubScreen="notes"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 18: Deep Learning Flashcards */}
        {currentScreen === "deep-learning-flashcards" && (
          <DeepLearningFlow
            deepSubScreen="flashcards"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 19: Deep Learning Retest Quiz */}
        {currentScreen === "deep-learning-quiz" && (
          <DeepLearningFlow
            deepSubScreen="quiz"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 20: Weakness mastery celebration */}
        {currentScreen === "deep-learning-success" && (
          <DeepLearningFlow
            deepSubScreen="success"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 21: Deep Learning mastery report */}
        {currentScreen === "deep-learning-success-report" && (
          <DeepLearningFlow
            deepSubScreen="report"
            setDeepSubScreen={handleSetDeepSubScreen}
            onAddStrength={handleAddStrength}
            onNavigate={setCurrentScreen}
            weaknesses={weaknesses}
            setWeaknesses={setWeaknesses}
          />
        )}

        {/* Screen 22: AI Tutor Chat (Gemini connected) */}
        {currentScreen === "ai-tutor-chat" && (
          <AITutorChat grade={grade} subject={subject} studentName={studentName} />
        )}

        {/* Screen 23 & 28: Reports Page & Parents Summary */}
        {currentScreen === "reports-main" && (
          <ReportsPage
            studentName={studentName}
            grade={grade}
            subject={subject}
            completedLessons={completedLessons}
            lessonScores={lessonScores}
            strengths={strengths}
            weaknesses={weaknesses}
          />
        )}

        {/* Screen 28: Parents Summary Direct link */}
        {currentScreen === "parent-summary" && (
          <ReportsPage
            studentName={studentName}
            grade={grade}
            subject={subject}
            completedLessons={completedLessons}
            lessonScores={lessonScores}
            strengths={strengths}
            weaknesses={weaknesses}
          />
        )}

        {/* Screen 24: Trophy Badges Closet */}
        {currentScreen === "badges" && (
          <BadgesPage completedLessons={completedLessons} strengths={strengths} />
        )}

        {/* Screen 25: Student Profile */}
        {currentScreen === "profile-view" && (
          <ProfilePage
            studentName={studentName}
            studentAvatar={studentAvatar}
            grade={grade}
            subject={subject}
            completedLessons={completedLessons}
            strengths={strengths}
            onNavigate={setCurrentScreen}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}

        {/* Screen 26: Settings */}
        {currentScreen === "settings-view" && (
          <SettingsPage
            studentName={studentName}
            setStudentName={setStudentName}
            studentAvatar={studentAvatar}
            setStudentAvatar={setStudentAvatar}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* 3. Humble, Clean footer */}
      <footer className="py-4 text-center text-[10px] text-slate-400 font-mono shrink-0 relative z-10 select-none border-t border-slate-100/10">
        © 2026 SelfTutor.APP · Build ideas with AI Buddy
      </footer>
    </div>

    {/* Floating Jump back to top Button */}
    {showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-50 p-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer flex items-center gap-1.5 font-display text-xs font-black"
        title="Jump Back to Top"
      >
        <span>↑ Jump Up</span>
      </button>
    )}

    {/* Floating Demo Navigator Jump Bar */}
    <DemoNavigator currentScreen={currentScreen} onNavigate={setCurrentScreen} />
  </div>
  );
}
