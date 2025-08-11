import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const QUESTIONS = [
  {
    id: "terrain",
    title: "Mountains or beaches?",
    options: ["Mountains", "Beaches"],
  },
  {
    id: "vibe",
    title: "Hidden local spots or famous landmarks?",
    options: ["Hidden local spots", "Famous landmarks"],
  },
  {
    id: "pace",
    title: "Fast-paced adventure or slow & relaxed?",
    options: ["Fast-paced", "Slow & relaxed"],
  },
  {
    id: "food",
    title: "Street food or fine dining?",
    options: ["Street food", "Fine dining"],
  },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]["id"], string>>;

type Persona = "Adventurer" | "Relaxer" | "Foodie" | "Cultural Explorer";

function inferPersona(answers: Answers): Persona {
  const score = { adventurer: 0, relaxer: 0, foodie: 0, cultural: 0 };

  if (answers.terrain === "Mountains") score.adventurer += 2;
  if (answers.terrain === "Beaches") score.relaxer += 2;

  if (answers.vibe === "Hidden local spots") score.cultural += 2;
  if (answers.vibe === "Famous landmarks") score.cultural += 1;

  if (answers.pace === "Fast-paced") score.adventurer += 2;
  if (answers.pace === "Slow & relaxed") score.relaxer += 2;

  if (answers.food === "Street food") score.foodie += 2;
  if (answers.food === "Fine dining") score.foodie += 1;

  const entries = Object.entries(score) as Array<[keyof typeof score, number]>;
  const [top] = entries.sort((a, b) => b[1] - a[1]);
  switch (top[0]) {
    case "adventurer":
      return "Adventurer";
    case "relaxer":
      return "Relaxer";
    case "foodie":
      return "Foodie";
    case "cultural":
    default:
      return "Cultural Explorer";
  }
}

export default function Quiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const { toast } = useToast();

  const allAnswered = useMemo(
    () => QUESTIONS.every((q) => Boolean(answers[q.id])),
    [answers]
  );

  const persona = useMemo(() => inferPersona(answers), [answers]);

  function handleSubmit() {
    if (!allAnswered) {
      toast({
        title: "Almost there!",
        description: "Please answer all questions to continue.",
      });
      return;
    }

    const profile = {
      persona,
      budgetRange: "flexible",
      preferences: answers,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("wanderbuddy_profile", JSON.stringify(profile));

    toast({
      title: `You're a ${persona}!`,
      description: "Saved your travel profile. We'll personalize suggestions.",
    });
  }

  return (
    <main className="min-h-screen py-12">
      <Helmet>
        <title>Travel Style Quiz – WanderBuddy</title>
        <meta
          name="description"
          content="Discover your travel persona with WanderBuddy's fun 2‑minute quiz and get personalized trip ideas."
        />
        <link rel="canonical" href="https://b72dde9e-06e1-4a00-9a4d-06e31b98bc02.lovableproject.com/quiz" />
      </Helmet>

      <section className="container max-w-3xl">
        <Card className="hero-surface border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl">Find your travel vibe</CardTitle>
            <CardDescription>
              Answer a few quick questions. We'll tailor destinations and
              activities just for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <h2 className="text-lg font-medium">{q.title}</h2>
                <RadioGroup
                  value={answers[q.id] ?? ""}
                  onValueChange={(val) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: val }))
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {q.options.map((opt) => (
                    <Label
                      key={opt}
                      htmlFor={`${q.id}-${opt}`}
                      className="border rounded-md p-3 cursor-pointer hover:bg-muted/60 interactive flex items-center gap-2"
                    >
                      <RadioGroupItem id={`${q.id}-${opt}`} value={opt} />
                      <span>{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <Button variant="hero" size="lg" onClick={handleSubmit}>
                Save my profile
              </Button>
              <p className="text-sm text-muted-foreground">
                Current result: <span className="font-medium">{persona}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
