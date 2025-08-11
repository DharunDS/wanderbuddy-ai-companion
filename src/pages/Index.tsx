import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Compass, Clock, Wallet } from "lucide-react";
import heroImg from "@/assets/hero-wanderbuddy.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [ideas, setIdeas] = useState<string[]>([]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--glow-x", `${x}%`);
    e.currentTarget.style.setProperty("--glow-y", `${y}%`);
  }

  function suggest() {
    const profiles: Record<string, string[]> = {
      Adventurous: [
        "Sunrise ridge hike + canyon zipline",
        "Urban night safari with street eats",
        "Kayak tour to hidden coves",
      ],
      Relaxed: [
        "Scenic train ride + seaside spa",
        "Slow café crawl and bookshop strolls",
        "Golden-hour beach picnic",
      ],
      Foodie: [
        "Local market tasting with chef",
        "Neighborhood dumpling trail",
        "Winery lunch & sunset terrace",
      ],
      Cultural: [
        "Old town walking tour + gallery hop",
        "Indie theater night & jazz bar",
        "Craft workshop with local artisan",
      ],
    };

    const key = mood || "Relaxed";
    const base = profiles[key as keyof typeof profiles] || profiles.Relaxed;
    const withBudget = budget ? base.map((i) => `${i} · ${budget}`) : base;
    setIdeas(withBudget.slice(0, 3));
  }

  return (
    <>
      <Helmet>
        <title>WanderBuddy – AI Travel Companion</title>
        <meta
          name="description"
          content="Your smart, fun travel buddy that plans, suggests, and adapts to your style, mood, and budget."
        />
        <link rel="canonical" href="https://b72dde9e-06e1-4a00-9a4d-06e31b98bc02.lovableproject.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "WanderBuddy",
            applicationCategory: "Travel",
            description:
              "Smart AI travel companion that plans, suggests and adapts to your style, mood and budget.",
            url: "https://b72dde9e-06e1-4a00-9a4d-06e31b98bc02.lovableproject.com/",
          })}
        </script>
      </Helmet>

      <header>
        <nav className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="text-primary" />
            <span className="font-semibold">WanderBuddy</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/quiz")}>Quiz</Button>
            <Button variant="hero" onClick={() => navigate("/quiz")}>
              Get started
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section
          className="hero-surface border-b"
          onMouseMove={onMouseMove}
        >
          <div className="container grid lg:grid-cols-2 gap-8 items-center py-16">
            <article className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                WanderBuddy: Your AI Travel Companion
              </h1>
              <p className="text-lg text-muted-foreground max-w-prose">
                Your smart, fun, and caring travel partner who plans, suggests,
                and adapts with you — based on your style, mood, and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" onClick={() => navigate("/quiz")}>
                  Take the 2‑min travel style quiz
                </Button>
                <Button variant="secondary" size="lg" onClick={() => document.getElementById("quick-suggest")?.scrollIntoView({ behavior: "smooth" })}>
                  Try a smart suggestion
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm"><Sparkles className="text-primary" /> Mood-based picks</div>
                <div className="flex items-center gap-2 text-sm"><Clock className="text-primary" /> Smart itineraries</div>
                <div className="flex items-center gap-2 text-sm"><Wallet className="text-primary" /> Budget aware</div>
                <div className="flex items-center gap-2 text-sm"><Compass className="text-primary" /> Local gems</div>
              </div>
            </article>

            <aside className="relative">
              <img
                src={heroImg}
                alt="Illustration of a cheerful traveler exploring global destinations with glowing routes"
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl shadow-md"
              />
            </aside>
          </div>
        </section>

        <section id="quick-suggest" className="container py-12">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <Card className="md:col-span-1">
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-xl font-semibold">Instant ideas</h2>
                <p className="text-sm text-muted-foreground">
                  Pick your mood and budget. We'll suggest a few activities.
                </p>
                <div className="space-y-2">
                  <label className="text-sm">Mood</label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger aria-label="Choose mood">
                      <SelectValue placeholder="Choose mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adventurous">Adventurous</SelectItem>
                      <SelectItem value="Relaxed">Relaxed</SelectItem>
                      <SelectItem value="Foodie">Foodie</SelectItem>
                      <SelectItem value="Cultural">Cultural Explorer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Budget</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger aria-label="Choose budget">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Comfort">Comfort</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="default" onClick={suggest}>Suggest ideas</Button>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              {ideas.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-muted-foreground">
                    No suggestions yet. Choose a mood and budget to get started.
                  </CardContent>
                </Card>
              ) : (
                ideas.map((idea, idx) => (
                  <Card key={idx} className="interactive hover:shadow-md">
                    <CardContent className="pt-6">{idea}</CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} WanderBuddy. Travel smarter, play harder.
        </div>
      </footer>
    </>
  );
};

export default Index;
