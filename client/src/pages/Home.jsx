import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activePlan, setActivePlan] = useState("pro");

  const features = [
    { icon: "⚡", title: "Instant Generation", description: "AI-optimized prompts generate stunning thumbnails in under 60 seconds." },
    { icon: "🎨", title: "Style Control", description: "Choose from Bold, Cinematic, Gaming, Minimal and more visual styles." },
    { icon: "🔁", title: "Recreate Mode", description: "Upload a reference image and AI will produce a cleaner, clickable version." },
    { icon: "🌐", title: "Community Feed", description: "Browse public thumbnails created by other creators for daily inspiration." }
  ];

  const testimonials = [
    { name: "Arjun Sharma", role: "Tech YouTuber · 240K subs", content: "Thumblify cut my thumbnail creation time from 2 hours to 5 minutes. The quality is genuinely impressive.", avatar: "AS", rating: 5 },
    { name: "Priya Nair", role: "Podcast Creator · 80K followers", content: "The recreate mode is my secret weapon. I feed it my old thumbnails and get a fresh, optimized version every time.", avatar: "PN", rating: 5 },
    { name: "Marcus Lee", role: "Gaming Streamer · 500K subs", content: "Bold + Neon palette = perfect gaming thumbnails. My click-through rate went up 34% in the first week.", avatar: "ML", rating: 5 }
  ];

  const plans = [
    { id: "starter", name: "Starter", price: "Free", credits: "15 credits", features: ["15 AI generations", "All styles", "All palettes", "Community feed access"] },
    { id: "pro", name: "Pro", price: "$9/mo", credits: "150 credits", popular: true, features: ["150 AI generations", "All styles", "All palettes", "Priority generation", "Community feed access"] },
    { id: "creator", name: "Creator", price: "$24/mo", credits: "Unlimited", features: ["Unlimited generations", "All styles", "All palettes", "Priority generation", "API access", "Community feed access"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink/15 border border-brand-pink/30 px-4 py-1.5 text-sm text-brand-pink font-medium">
                ✨ AI-Powered Thumbnail Studio
              </span>
              <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">
                Thumbnails That{" "}
                <span className="gradient-text">Get Clicked</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Generate stunning YouTube thumbnails in seconds using Groq-optimized prompts and Pollinations AI. No design skills required.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/generate")}
                  className="rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-6 py-3 font-semibold text-white hover:opacity-90 transition shadow-glow"
                >
                  Generate Now →
                </button>
                <button
                  onClick={() => navigate("/community")}
                  className="rounded-full bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  View Creations
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-brand-purple/30 to-brand-pink/20 border border-white/10 flex items-center justify-center overflow-hidden shadow-glow">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-xl font-bold text-white mb-1">Your Next Viral Thumbnail</p>
                  <p className="text-slate-400 text-sm">Generated in under 60 seconds</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16 bg-black/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan mb-3">Features</p>
            <h2 className="text-3xl font-bold text-white">Everything You Need to Go Viral</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`glass-card rounded-3xl p-6 transition-all duration-300 cursor-default ${
                  hoveredCard === i ? "border-brand-purple/50 shadow-glow -translate-y-1" : ""
                }`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink mb-3">Testimonials</p>
            <h2 className="text-3xl font-bold text-white">Creators Love Thumblify</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/10">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16 bg-black/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-white">Simple, Transparent Plans</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`glass-card rounded-3xl p-6 cursor-pointer transition-all duration-300 relative ${
                  activePlan === plan.id ? "border-brand-purple/60 shadow-glow -translate-y-1" : "hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <p className="font-bold text-white text-xl mb-1">{plan.name}</p>
                <p className="text-3xl font-extrabold gradient-text mb-1">{plan.price}</p>
                <p className="text-sm text-slate-400 mb-5">{plan.credits}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/signup"); }}
                  className="w-full rounded-full bg-white/5 border border-white/10 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition mb-5"
                >
                  Get Started
                </button>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-12 text-center border-brand-purple/30 shadow-glow">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to 10x Your Click-Through Rate?
            </h2>
            <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto">
              Join thousands of creators generating viral thumbnails with AI. Start free — 15 credits on signup.
            </p>
            <button
              onClick={() => navigate("/generate")}
              className="rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-4 font-bold text-white text-lg hover:opacity-90 transition shadow-glow"
            >
              Generate Your First Thumbnail →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}