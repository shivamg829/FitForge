import { useState } from "react";
import { Link } from "react-router-dom";
import  IMG from "../IMG/Progress.avif";
import {
  Dumbbell,
  Flame,
  Salad,
  BarChart3,
  Target,
  Trophy,
  Shield,
  Activity,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const faqs = [
  {
    q: "Is FitForge suitable for beginners?",
    a: "Yes. FitForge is designed for everyone, from complete beginners to experienced athletes. Start with simple calorie tracking and gradually build healthier habits.",
  },
  {
    q: "Can I track calories and workouts together?",
    a: "Absolutely. FitForge combines calorie tracking, workout planning, diet generation, and progress monitoring in one platform.",
  },
  {
    q: "Do I need gym equipment?",
    a: "No. You can use FitForge for home workouts, gym routines, bodyweight training, and general fitness tracking.",
  },
  {
    q: "Can I access FitForge on mobile?",
    a: "Yes. The entire application is fully responsive and works smoothly across desktop, tablet, and mobile devices.",
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-black text-white">
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:
            `url(${IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-lime-500/30 bg-lime-500/10 backdrop-blur-xl rounded-full px-4 py-2 text-lime-400 font-medium">
              <Activity size={18} />
              Premium Fitness Tracking Platform
            </div>

            <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight">
              Forge Your
              <span className="block text-lime-400">Strongest Self</span>
            </h1>

            <p className="mt-8 text-xl text-zinc-300 max-w-2xl">
              Track calories, generate personalized diet plans, follow workout
              programs, and monitor your progress with one powerful fitness
              dashboard.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-8 py-4 rounded-2xl transition flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/login"
                className="border border-zinc-700 hover:border-lime-400 px-8 py-4 rounded-2xl backdrop-blur-xl bg-zinc-900/40 transition"
              >
                Login
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5">
                <h3 className="text-3xl font-bold text-lime-400">10K+</h3>
                <p className="text-zinc-400 mt-2">Meals Tracked</p>
              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5">
                <h3 className="text-3xl font-bold text-lime-400">5K+</h3>
                <p className="text-zinc-400 mt-2">Workout Sessions</p>
              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5">
                <h3 className="text-3xl font-bold text-lime-400">95%</h3>
                <p className="text-zinc-400 mt-2">User Satisfaction</p>
              </div>

              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5">
                <h3 className="text-3xl font-bold text-lime-400">24/7</h3>
                <p className="text-zinc-400 mt-2">Fitness Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Everything You Need</h2>

            <p className="mt-4 text-zinc-400 text-lg">
              Powerful tools to support your fitness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Link
              to="/calories"
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-lime-400 transition"
            >
              <Flame size={40} className="text-lime-400" />

              <h3 className="text-2xl font-bold mt-6">Calories Tracker</h3>

              <p className="text-zinc-400 mt-3">
                Monitor daily calorie intake and meal logs.
              </p>
            </Link>

            <Link
              to="/workout"
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-lime-400 transition"
            >
              <Dumbbell size={40} className="text-lime-400" />

              <h3 className="text-2xl font-bold mt-6">Workout Plans</h3>

              <p className="text-zinc-400 mt-3">
                Structured routines based on your goals.
              </p>
            </Link>

            <Link
              to="/diet"
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-lime-400 transition"
            >
              <Salad size={40} className="text-lime-400" />

              <h3 className="text-2xl font-bold mt-6">Diet Planner</h3>

              <p className="text-zinc-400 mt-3">
                Personalized nutrition plans for results.
              </p>
            </Link>

            <Link
              to="/progress"
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-lime-400 transition"
            >
              <BarChart3 size={40} className="text-lime-400" />

              <h3 className="text-2xl font-bold mt-6">Progress Analytics</h3>

              <p className="text-zinc-400 mt-3">
                Visualize and track your transformation.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Why Choose FitForge</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <Target className="text-lime-400" size={36} />
              <h3 className="text-xl font-bold mt-5">Personalized Goals</h3>
              <p className="text-zinc-400 mt-3">
                Build plans tailored to your objectives.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <Activity className="text-lime-400" size={36} />
              <h3 className="text-xl font-bold mt-5">Smart Tracking</h3>
              <p className="text-zinc-400 mt-3">
                Monitor meals and workouts efficiently.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <Shield className="text-lime-400" size={36} />
              <h3 className="text-xl font-bold mt-5">Secure Data</h3>
              <p className="text-zinc-400 mt-3">
                Your fitness information stays protected.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <Trophy className="text-lime-400" size={36} />
              <h3 className="text-xl font-bold mt-5">Better Results</h3>
              <p className="text-zinc-400 mt-3">
                Stay consistent and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl font-bold">Success Stories</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                name: "Sarah",
                role: "Weight Loss",
                text: "I lost 12kg in 5 months using FitForge.",
              },
              {
                name: "Michael",
                role: "Fitness Enthusiast",
                text: "Tracking calories became effortless.",
              },
              {
                name: "James",
                role: "Muscle Gain",
                text: "The dashboard keeps me motivated daily.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
              >
                <div className="flex gap-1 text-lime-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>

                <p className="mt-5 text-zinc-300">"{item.text}"</p>

                <div className="mt-6">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-zinc-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-5xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item.q}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span className="font-semibold">{item.q}</span>

                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-zinc-400">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[40px] bg-linear-to-r from-lime-500/20 to-transparent border border-lime-500/20 backdrop-blur-xl p-12 text-center">
            <h2 className="text-5xl font-bold">
              Ready To Transform
              <span className="block text-lime-400">Your Fitness Journey?</span>
            </h2>

            <p className="mt-6 text-zinc-300 text-lg max-w-3xl mx-auto">
              Join FitForge today and start building better habits, stronger
              workouts, smarter nutrition, and long-term results.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="bg-lime-400 text-black font-bold px-8 py-4 rounded-2xl hover:bg-lime-300 transition"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="border border-zinc-700 px-8 py-4 rounded-2xl hover:border-lime-400 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
