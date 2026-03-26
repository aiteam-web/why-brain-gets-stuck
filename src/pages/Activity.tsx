import { useState, useRef, useEffect } from "react";

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center justify-center gap-2 pb-safe py-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-2 rounded-full transition-all duration-300 ${
          i === current ? "w-6 bg-primary" : "w-2 bg-border"
        }`}
      />
    ))}
  </div>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 left-4 pt-safe text-muted-foreground text-xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-card transition-colors"
    aria-label="Go back"
  >
    ‹
  </button>
);

const BreathingEmoji = ({ emoji }: { emoji: string }) => (
  <div className="text-[32px] animate-breathe inline-block">{emoji}</div>
);

interface AccordionItemProps {
  header: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

const AccordionItem = ({ header, body, isOpen, onToggle, delay }: AccordionItemProps) => (
  <div
    className="border border-border rounded-[10px] bg-background overflow-hidden opacity-0"
    style={{
      animation: `fadeUp 0.4s ease-out ${delay}s forwards`,
      borderWidth: "0.5px",
    }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3.5 text-left text-body font-medium text-foreground"
    >
      <span>{header}</span>
      <span
        className="text-muted-foreground transition-transform duration-400 text-sm"
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.4s ease" }}
      >
        ▾
      </span>
    </button>
    <div
      className="overflow-hidden transition-all duration-400"
      style={{
        maxHeight: isOpen ? "200px" : "0",
        transition: "max-height 0.4s ease",
      }}
    >
      <div className="px-4 pb-4 text-body text-muted-foreground leading-relaxed">
        {body}
      </div>
    </div>
  </div>
);

const Screen1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center px-6 pt-16 pb-4 h-full">
    <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
      <BreathingEmoji emoji="🧠" />

      <h1
        className="text-title text-foreground text-center mt-5 opacity-0"
        style={{ animation: "fadeUp 0.4s ease-out 0.1s forwards" }}
      >
        Your brain didn't break. It adapted.
      </h1>

      <p
        className="text-body text-muted-foreground text-center mt-4 leading-relaxed opacity-0"
        style={{ animation: "fadeUp 0.4s ease-out 0.25s forwards" }}
      >
        After trauma, your brain rewires itself to keep you safe. It learned that the world could be dangerous, so it stayed ready. That's not a flaw. That's survival.
      </p>

      <div
        className="w-full bg-accent rounded-xl p-4 mt-6 opacity-0"
        style={{ animation: "fadeUp 0.4s ease-out 0.4s forwards" }}
      >
        <p className="text-body text-accent-foreground leading-relaxed">
          💬 PTSD isn't a sign that something is wrong with you. It's a sign that something <em>happened</em> to you.
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-body font-semibold opacity-0 hover:opacity-90 transition-opacity"
        style={{ animation: "fadeUp 0.4s ease-out 0.55s forwards" }}
      >
        Tell me more →
      </button>
    </div>
  </div>
);

const Screen2 = ({ onBack }: { onBack: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordions = [
    {
      header: "🚨 Your brain learned danger",
      body: "After trauma, the brain's alarm system stays switched on. Hypervigilance and startling easily aren't overreactions — your brain is doing its job too well.",
    },
    {
      header: "🔁 Flashbacks are memory",
      body: "Triggers pull your brain back because it never got the signal that the threat was over. It's protecting you from something that already passed.",
    },
    {
      header: "🤍 A stuck brain fought for you",
      body: "Every symptom of PTSD was once an act of survival. Your brain did what it had to do to keep you alive.",
    },
  ];

  return (
    <div className="flex flex-col px-6 pt-16 pb-4 h-full overflow-y-auto">
      <div className="max-w-sm w-full mx-auto">
        <div className="flex justify-center">
          <span
            className="inline-block bg-accent text-accent-foreground text-badge uppercase tracking-wider px-3 py-1 rounded-full opacity-0"
            style={{ animation: "fadeUp 0.4s ease-out 0.1s forwards" }}
          >
            gentle truths
          </span>
        </div>

        <div className="flex justify-center mt-4">
          <BreathingEmoji emoji="🕊️" />
        </div>

        <h1
          className="text-title text-foreground text-center mt-4 opacity-0"
          style={{ animation: "fadeUp 0.4s ease-out 0.15s forwards" }}
        >
          What your brain was trying to do
        </h1>

        <p
          className="text-body text-hint text-center mt-2 opacity-0"
          style={{ animation: "fadeUp 0.4s ease-out 0.25s forwards" }}
        >
          Tap each to learn more.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          {accordions.map((item, i) => (
            <AccordionItem
              key={i}
              header={item.header}
              body={item.body}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={0.35 + i * 0.15}
            />
          ))}
        </div>

        <div
          className="w-full bg-accent rounded-xl p-4 mt-6 mb-4 opacity-0"
          style={{ animation: "fadeUp 0.4s ease-out 0.8s forwards" }}
        >
          <p className="text-body text-accent-foreground leading-relaxed">
            🌿 Healing isn't about forgetting. It's about helping your brain learn that you're safe now.
          </p>
        </div>
      </div>
    </div>
  );
};

const Activity = () => {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayScreen, setDisplayScreen] = useState(0);

  const goTo = (target: number) => {
    if (isTransitioning) return;
    setDirection(target > screen ? 1 : -1);
    setIsTransitioning(true);
    setDisplayScreen(target);
    setTimeout(() => {
      setScreen(target);
      setIsTransitioning(false);
    }, 600);
  };

  const handleBack = () => {
    if (screen === 0) {
      // Exit activity — in a real app this would navigate away
      return;
    }
    goTo(screen - 1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative w-full max-w-[390px] h-[100dvh] max-h-[844px] overflow-hidden flex flex-col bg-background">
        <BackButton onClick={handleBack} />

        <div className="flex-1 relative overflow-hidden">
          {/* Current screen */}
          <div
            className="absolute inset-0"
            style={{
              transform: isTransitioning
                ? `translateX(${-direction * 100}%)`
                : "translateX(0)",
              transition: isTransitioning ? "transform 600ms ease-in-out" : "none",
            }}
          >
            {screen === 0 ? (
              <Screen1 onNext={() => goTo(1)} />
            ) : (
              <Screen2 onBack={() => goTo(0)} />
            )}
          </div>

          {/* Incoming screen */}
          {isTransitioning && (
            <div
              className="absolute inset-0"
              style={{
                transform: isTransitioning
                  ? "translateX(0)"
                  : `translateX(${direction * 100}%)`,
                transition: "transform 600ms ease-in-out",
              }}
            >
              {displayScreen === 0 ? (
                <Screen1 onNext={() => goTo(1)} />
              ) : (
                <Screen2 onBack={() => goTo(0)} />
              )}
            </div>
          )}
        </div>

        <ProgressDots current={isTransitioning ? displayScreen : screen} total={2} />
      </div>
    </div>
  );
};

export default Activity;
