import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  GraduationCap, 
  BrainCircuit, 
  Atom, 
  Calculator, 
  Award, 
  Check,
  Shield,
  Lightbulb,
  Zap,
  Star,
  Users,
  Target
} from "lucide-react";

interface LandingPageProps {
  onGetStarted?: () => void;
  onStart?: () => void;
  onSeeHowWorks?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onStart, onSeeHowWorks }) => {
  const triggerStart = onGetStarted || onStart || (() => {});
  const [activeSubjectTab, setActiveSubjectTab] = useState<"math" | "science">("math");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div id="landing-page" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16 relative">
      
      {/* 1. BRAND NAVIGATION HEADER */}
      <nav className="w-full flex items-center justify-between py-4 z-50 border-b border-slate-100/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <span className="text-xl font-display font-black">S</span>
          </div>
          <div>
            <span 
              className="text-xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 tracking-tight block"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              SelfTutor.APP
            </span>
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block -mt-1">Maths & Science</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={triggerStart}
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-xs sm:text-sm font-extrabold text-slate-700 transition-all cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={triggerStart}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-sm font-black hover:opacity-95 shadow-md shadow-purple-150 transition-all cursor-pointer"
          >
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* 2. AMAZING HERO & VALUE PROPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
        {/* Left Side: Dynamic, super punchy pitch */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="text-[10px] font-display font-black uppercase tracking-wider text-purple-700">STEM Confidence Accelerator</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[50px] leading-[1.1] font-display font-black text-slate-900 tracking-tight">
              Grow Your Child’s <br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                STEM Confidence.
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl font-display font-bold text-slate-600">
              Master Maths & Science Step-by-Step.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              No dry lectures. No school anxiety. <strong>SelfTutor.APP</strong> is an interactive companion that finds exactly where your kid is stuck, using simple analogies to turn frustrating formulas into proud "Aha!" breakthroughs.
            </p>
          </div>

          {/* Quick Subject Interactive switcher in Hero */}
          <div className="bg-slate-100/60 p-1 rounded-xl flex max-w-xs gap-1 border border-slate-200/40">
            <button
              onClick={() => setActiveSubjectTab("math")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-display font-black transition-all cursor-pointer ${
                activeSubjectTab === "math"
                  ? "bg-white text-purple-700 shadow-sm border border-purple-100/40"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Maths
            </button>
            <button
              onClick={() => setActiveSubjectTab("science")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-display font-black transition-all cursor-pointer ${
                activeSubjectTab === "science"
                  ? "bg-white text-blue-700 shadow-sm border border-blue-100/40"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              Science
            </button>
          </div>

          {/* Interactive Subject Description Block */}
          <div className="p-4 rounded-xl bg-white/70 border border-slate-100 shadow-sm text-xs leading-relaxed text-slate-600 max-w-xl">
            {activeSubjectTab === "math" ? (
              <p>
                <strong>🔢 Fractions to Algebra:</strong> Visual aids explain tricky ratios and linear math equations. We scaffold learning step-by-step so your child never feels overwhelmed.
              </p>
            ) : (
              <p>
                <strong>🧪 Solar Systems & Atoms:</strong> Easy real-world analogies make biology, chemistry, and physics simple, interactive, and highly engaging.
              </p>
            )}
          </div>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              id="btn-start-learning-free"
              onClick={triggerStart}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-black text-sm shadow-xl shadow-purple-200 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <span>Start Free Quest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("pricing-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-700 font-display font-black text-sm border border-slate-200 hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer text-center"
            >
              View Pricing Options
            </button>
          </div>

          {/* Core Pillars */}
          <div className="flex items-center gap-5 pt-4 border-t border-slate-150">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-display font-black text-slate-500 uppercase tracking-wider">Grades 1–12 Mapped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-display font-black text-slate-500 uppercase tracking-wider">AI Interactive Explainer</span>
            </div>
          </div>
        </div>

        {/* Right Side: Stunning Visual Artifact Container */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-6">
          <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            
            {/* Outer Glow Circles */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/15 blur-3xl animate-pulse"></div>
            <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full border border-white/80 backdrop-blur-[2px] shadow-2xl bg-white/10"></div>
            
            {/* Inner Main Planet/Orb representing subject */}
            <div className={`absolute w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] rounded-full bg-gradient-to-tr transition-all duration-700 ${
              activeSubjectTab === "math" 
                ? "from-purple-600 via-indigo-600 to-blue-500 shadow-[0_0_80px_rgba(147,51,234,0.3)]" 
                : "from-blue-600 via-cyan-600 to-teal-400 shadow-[0_0_80px_rgba(6,182,212,0.3)]"
            } flex items-center justify-center`}>
              
              <div className="text-white text-center space-y-1">
                {activeSubjectTab === "math" ? (
                  <>
                    <Calculator className="w-10 h-10 mx-auto text-purple-100" />
                    <p className="font-display font-black text-base">Maths Adventure</p>
                    <p className="text-[9px] font-mono text-purple-200">Solving with Logic</p>
                  </>
                ) : (
                  <>
                    <Atom className="w-10 h-10 mx-auto text-blue-100" />
                    <p className="font-display font-black text-base">Science Quest</p>
                    <p className="text-[9px] font-mono text-blue-200">Unveiling Nature</p>
                  </>
                )}
              </div>
            </div>

            {/* Floating Math Symbol */}
            <div className="absolute top-2 left-6 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-100 shadow-lg rotate-12 animate-float">
              <span className="text-base font-display font-black text-purple-600">x² + y = r</span>
            </div>

            {/* Floating Chemical Atom Symbol */}
            <div className="absolute bottom-12 right-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-100 shadow-lg -rotate-12 animate-float-slow">
              <span className="text-base font-display font-black text-cyan-600">H₂O</span>
            </div>

            {/* Floating Quick Card */}
            <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-100 shadow-2xl w-44 text-left select-none">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-[8px] uppercase font-mono font-black text-slate-400 tracking-wider">Weekly Goal</p>
                  <p className="text-[11px] font-display font-black text-slate-800">5 Streak Quizzes</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full w-[80%] rounded-full"></div>
              </div>
            </div>

            {/* Floating Achievement Star Badge */}
            <div className="absolute top-12 right-0 bg-white/95 backdrop-blur-xl p-2.5 rounded-xl border border-slate-100 shadow-xl select-none flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">🏆</div>
              <div className="text-left">
                <p className="text-[9px] font-display font-black text-slate-800">Kid Champion</p>
                <p className="text-[8px] text-slate-400 font-extrabold">Level 3 Unlocked</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DEDICATED HOW IT HELPS GROW A CHILD (LESS WORDS, MAX IMPACT) */}
      <div id="how-it-helps" className="bg-white/80 backdrop-blur-md border border-slate-150 rounded-3xl p-6 sm:p-10 text-left space-y-10 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/40">
            <span className="text-[9px] font-display font-black uppercase tracking-wider text-blue-700">Specific Success Formula</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            How SelfTutor.APP Grows Your Child
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            We replace boring passive memory with active recall techniques designed to build real academic confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Diagnosis */}
          <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-mono font-black text-slate-100/50">01</div>
            <div className="w-10 h-10 bg-purple-100/80 rounded-xl flex items-center justify-center text-purple-700">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-black text-slate-900">1. Instant Diagnosis</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              A quick 10-question AI scan identifies exactly which formulas or topics are giving your child trouble.
            </p>
          </div>

          {/* Card 2: Interactive Notes */}
          <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-mono font-black text-slate-100/50">02</div>
            <div className="w-10 h-10 bg-blue-100/80 rounded-xl flex items-center justify-center text-blue-700">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-black text-slate-900">2. Real Analogies</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We explain formulas through visual stories, such as gravity on a trampoline or fraction parts as pizza slices.
            </p>
          </div>

          {/* Card 3: Active Recall */}
          <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-mono font-black text-slate-100/50">03</div>
            <div className="w-10 h-10 bg-pink-100/80 rounded-xl flex items-center justify-center text-pink-700">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-black text-slate-900">3. Active Memory</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Interactive flashcards and quizzes test comprehension dynamically, adapting questions to reinforce weaker subjects.
            </p>
          </div>

          {/* Card 4: Clear Insights */}
          <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl font-mono font-black text-slate-100/50">04</div>
            <div className="w-10 h-10 bg-emerald-100/80 rounded-xl flex items-center justify-center text-emerald-700">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-black text-slate-900">4. Mastery Level</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Earn XP, unlock stunning environment themes, and get real, specific weekly progress report cards for parents.
            </p>
          </div>
        </div>
      </div>

      {/* 4. PREMIUM TRANSPARENT PRICING SECTION (CRITICAL REQUIREMENT) */}
      <div id="pricing-section" className="bg-white/80 backdrop-blur-md border border-slate-150 rounded-3xl p-6 sm:p-10 text-left space-y-8 shadow-sm relative">
        <div className="absolute top-0 right-12 w-28 h-28 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-0 left-6 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-50"></div>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100/40">
            <span className="text-[9px] font-display font-black uppercase tracking-wider text-purple-700">Guaranteed Growth Plans</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            Simple, No-Stress Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Start with our risk-free plan to boost your kid's grades in maths & sciences.
          </p>

          {/* Switcher Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-display font-black transition-all cursor-pointer ${
                billingCycle === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-lg text-xs font-display font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-purple-100 text-purple-700 text-[8px] font-mono font-black px-1.5 py-0.5 rounded-full uppercase">Save 58%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-4 relative z-10">
          
          {/* Plan 1: Flexible Monthly */}
          <div className="bg-white/95 border border-slate-200/60 p-6 rounded-3xl space-y-6 shadow-md hover:border-slate-300 transition-all text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-display font-black text-slate-900">Flexible Monthly</h3>
                  <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wide mt-0.5">Cancel Anytime</p>
                </div>
                <span className="p-2 bg-slate-100 rounded-xl text-slate-600">
                  <Zap className="w-5 h-5" />
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-black text-slate-900">₹199</span>
                <span className="text-xs text-slate-500 font-extrabold">/ month</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Our core experience for parents who want absolute study flexibility with month-to-month adaptive features.
              </p>

              <div className="w-full h-[1px] bg-slate-100"></div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Interactive Maths & Science Modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited 10-Question Diagnostic Tests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Adaptive Recall Cards with Audio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time Parent Report Dashboard</span>
                </li>
              </ul>
            </div>

            <button
              onClick={triggerStart}
              className="mt-6 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-black text-xs transition-all cursor-pointer text-center"
            >
              Get Monthly Plan
            </button>
          </div>

          {/* Plan 2: Best Value Annual */}
          <div className="bg-white/95 border-2 border-purple-600 p-6 rounded-3xl space-y-6 shadow-xl hover:shadow-2xl transition-all text-left flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              🌟 Best Value (Save 58%)
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-display font-black text-purple-900">Academic Excellence</h3>
                  <p className="text-[11px] text-purple-600 font-extrabold uppercase tracking-wide mt-0.5">Annual Study Pass</p>
                </div>
                <span className="p-2 bg-purple-100 rounded-xl text-purple-600">
                  <Award className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black text-slate-900">₹1000</span>
                  <span className="text-xs text-slate-500 font-extrabold">/ year</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-mono font-black uppercase">Equivalent to just ₹83 / month!</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                The absolute gold standard for building continuous STEM growth, providing massive savings for families.
              </p>

              <div className="w-full h-[1px] bg-slate-100"></div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-bold text-slate-900">Includes everything in Monthly</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Prioritized Learning Insights & Recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Unlock ALL Customizable Classroom Skin Themes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>VIP Parent Progress Email Notifications</span>
                </li>
              </ul>
            </div>

            <button
              onClick={triggerStart}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-black text-xs shadow-md hover:opacity-95 transition-all cursor-pointer text-center"
            >
              Get Annual Pass (₹1000)
            </button>
          </div>

        </div>
      </div>

      {/* 5. HERO TRUST FOOTNOTE */}
      <div className="text-center text-[11px] text-slate-400 font-mono tracking-wide">
        Trusted by families globally · Secure 256-bit SSL connection · Cancel anytime without questions.
      </div>

    </div>
  );
};
