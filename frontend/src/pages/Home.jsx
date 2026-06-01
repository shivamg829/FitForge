import { useState } from "react";
import { Link } from "react-router-dom";
import { FaDumbbell, FaHeartbeat, FaRegChartBar, FaUtensils } from "react-icons/fa";

const faqs = [
  {
    q: "Is FitForge only for gym users?",
    a: "No. FitForge is built for anyone who wants to track calories, workouts, and progress—whether you're just starting or already training regularly.",
  },
  {
    q: "Do I need to enter everything manually?",
    a: "You control what you log. Start simple: add calories, pick a workout plan, and track progress over time. You can improve details as you go.",
  },
  {
    q: "Can I use FitForge on mobile?",
    a: "Yes. The Home page and app layout are responsive and optimized for both desktop and mobile screens.",
  },
  {
    q: "Is my data private?",
    a: "FitForge stores your profile and tracking data on your account. Use your login to access your dashboard and history.",
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-black/5 px-3 py-1 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-gray-700">Track calories, workouts & progress in one place</span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                Build healthier habits with <span className="text-blue-600">FitForge</span>
              </h1>

              <p className="mt-4 text-lg text-gray-700 max-w-xl">
                A user-friendly fitness tracker designed to help you stay consistent: log meals, follow workout plans, and
                visualize progress.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition shadow-sm"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                <div className="bg-white/80 backdrop-blur border border-black/5 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                    <FaUtensils className="text-xl" />
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">Calories</div>
                  <div className="text-sm text-gray-600">Quick logging</div>
                </div>
                <div className="bg-white/80 backdrop-blur border border-black/5 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                    <FaDumbbell className="text-xl" />
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">Workouts</div>
                  <div className="text-sm text-gray-600">Simple plans</div>
                </div>
                <div className="bg-white/80 backdrop-blur border border-black/5 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <FaRegChartBar className="text-xl" />
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">Progress</div>
                  <div className="text-sm text-gray-600">Stay motivated</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-lg border border-black/5 p-4">
                <div className="rounded-2xl overflow-hidden border border-black/5">
                  <div className="bg-black text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div>
                        <div className="font-bold">Today’s snapshot</div>
                        <div className="text-sm text-white/80">Plan • Log • Improve</div>
                      </div>
                    </div>
                    <div className="text-sm text-white/80">Live</div>
                  </div>

                  <div className="p-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gray-50 border border-black/5 p-4">
                      <div className="text-sm text-gray-600">Calories logged</div>
                      <div className="mt-2 text-2xl font-bold">—</div>
                      <div className="text-xs text-gray-500 mt-1">After you sign in</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 border border-black/5 p-4">
                      <div className="text-sm text-gray-600">Workout plan</div>
                      <div className="mt-2 text-2xl font-bold">—</div>
                      <div className="text-xs text-gray-500 mt-1">Pick your goal</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 border border-black/5 p-4 col-span-2">
                      <div className="text-sm text-gray-600">Consistency streak</div>
                      <div className="mt-2 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-blue-600 rounded-full" />
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Small steps, big results.</div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between rounded-2xl bg-blue-50 border border-blue-100 p-4">
                      <div>
                        <div className="font-semibold text-gray-900">Ready to start?</div>
                        <div className="text-sm text-gray-600">Create an account in seconds.</div>
                      </div>
                      <Link
                        to="/register"
                        className="bg-black hover:bg-gray-900 transition text-white px-4 py-2 rounded-xl font-semibold"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Designed for clarity and speed—so you can focus on progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need</h2>
              <p className="mt-2 text-gray-700">A complete fitness tracking experience, without the clutter.</p>
            </div>
            <div className="hidden md:block text-sm text-gray-600">No setup required for browsing.</div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[{
              title: "Calories Tracker",
              desc: "Log meals and see your total quickly.",
              badge: "🍎",
              to: "/calories",
              color: "bg-red-50 border-red-200",
            },{
              title: "Workout Plans",
              desc: "Follow a structured plan for your goal.",
              badge: "🏋️",
              to: "/workout",
              color: "bg-green-50 border-green-200",
            },{
              title: "Progress Insights",
              desc: "Track changes and stay on target.",
              badge: "📈",
              to: "/progress",
              color: "bg-orange-50 border-orange-200",
            },{
              title: "Diet Planner",
              desc: "Plan your meals with a simple workflow.",
              badge: "🥗",
              to: "/diet",
              color: "bg-purple-50 border-purple-200",
            }].map((f) => (
              <Link
                key={f.title}
                to={f.to}
                className="group bg-white rounded-3xl border border-black/5 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${f.color}`}>
                  <span className="text-2xl">{f.badge}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {f.title}
                </h3>
                <p className="mt-2 text-gray-700">{f.desc}</p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span>Open</span>
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How it works</h2>
          <p className="mt-2 text-gray-700">A simple flow that makes staying consistent easier.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[{
              step: "1",
              title: "Create your account",
              desc: "Sign up and personalize your profile.",
            },{
              step: "2",
              title: "Log calories & workouts",
              desc: "Use quick forms to track your day.",
            },{
              step: "3",
              title: "Review progress",
              desc: "Use summaries to stay motivated and adjust.",
            }].map((s) => (
              <div key={s.step} className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-extrabold text-blue-600/20">{s.step}</div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">✨</div>
                </div>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-gray-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 sm:py-14 bg-white/60 border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by beginners & lifters</h2>
          <p className="mt-2 text-gray-700">Realistic expectations, better habits.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[{
              name: "Amina",
              role: "Getting started",
              quote:
                "The Home page makes me feel confident—logging is fast and I can see my totals right away.",
            },{
              name: "Jordan",
              role: "Weight loss",
              quote:
                "Workout plans are easy to follow and the progress tracking helps me stay consistent.",
            },{
              name: "Sam",
              role: "Muscle gain",
              quote:
                "Clean UI and quick navigation. I actually use it every day.",
            }].map((t) => (
              <div key={t.name} className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center">
                    <span className="text-xl">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">FAQ</h2>
          <p className="mt-2 text-gray-700">Quick answers to common questions.</p>

          <div className="mt-8 max-w-3xl">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.q} className="bg-white rounded-3xl border border-black/5 mb-4 overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-gray-900">{item.q}</span>
                    <span className="text-blue-600 font-extrabold text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="px-6 pb-5 text-gray-700">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-black text-white rounded-3xl shadow-lg overflow-hidden border border-white/10">
            <div className="grid md:grid-cols-12 gap-0">
              <div className="md:col-span-7 p-8 sm:p-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  Start tracking today—your future self will thank you.
                </h2>
                <p className="mt-3 text-white/80 text-lg">
                  Create your account and get access to Calories, Workouts, Diet planning, and Progress insights.
                </p>
              </div>
              <div className="md:col-span-5 p-8 sm:p-10 flex items-center justify-center">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/register"
                      className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white text-black px-6 py-3 font-bold hover:bg-gray-100 transition"
                    >
                      Create Account
                    </Link>
                    <Link
                      to="/login"
                      className="flex-1 inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-white px-6 py-3 font-bold hover:bg-white/10 transition"
                    >
                      Login
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-white/70 text-center">
                    Takes less than a minute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

