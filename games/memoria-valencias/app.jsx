const { useEffect, useMemo, useState } = React;

const chemistryPairs = [
  {
    id: "na",
    element: "Sodio (Na)",
    valence: "+1",
    note: "Metal alcalino del grupo 1: forma cationes Na⁺ en sales como el cloruro de sodio.",
  },
  {
    id: "ca",
    element: "Calcio (Ca)",
    valence: "+2",
    note: "Metal alcalinotérreo: libera 2 electrones para formar Ca²⁺ en óxidos y sales.",
  },
  {
    id: "al",
    element: "Aluminio (Al)",
    valence: "+3",
    note: "Metal del grupo 13: genera Al³⁺ al combinarse con oxígeno o halógenos.",
  },
  {
    id: "cl",
    element: "Cloro (Cl)",
    valence: "-1",
    note: "Halógeno del grupo 17: acepta 1 electrón para formar Cl⁻ en compuestos iónicos.",
  },
  {
    id: "o",
    element: "Oxígeno (O)",
    valence: "-2",
    note: "No metal del grupo 16: toma 2 electrones para formar O²⁻ en óxidos metálicos y compuestos iónicos.",
  },
  {
    id: "c",
    element: "Carbono (C)",
    valence: "+4",
    note: "Elemento del grupo 14: emplea valencia +4 en compuestos covalentes como CO₂ o CCl₄.",
  },
  {
    id: "n",
    element: "Nitrógeno (N)",
    valence: "-3",
    note: "No metal del grupo 15: alcanza valencia -3 en nitruros y en el ion amonio (NH₄⁺).",
  },
  {
    id: "p",
    element: "Fósforo (P)",
    valence: "+5",
    note: "Elemento del grupo 15: en los oxoácidos como H₃PO₄ utiliza valencia +5.",
  },
  {
    id: "s",
    element: "Azufre (S)",
    valence: "+6",
    note: "Elemento del grupo 16: alcanza valencia +6 en sulfatos y en el ácido sulfúrico.",
  },
  {
    id: "mn",
    element: "Manganeso (Mn)",
    valence: "+7",
    note: "Metal de transición: su estado de oxidación +7 aparece en el ion permanganato (MnO₄⁻).",
  },
];

const difficulties = {
  facil: {
    label: "Fácil",
    pairIds: ["na", "ca", "cl", "o"],
    description: "4 parejas ideales para familiarizarse con el juego.",
    timeLimit: 180,
  },
  medio: {
    label: "Medio",
    pairIds: ["na", "ca", "al", "cl", "o", "c", "n"],
    description: "7 parejas que combinan metales y no metales comunes.",
    timeLimit: 150,
  },
  dificil: {
    label: "Difícil",
    pairIds: ["na", "ca", "al", "cl", "o", "c", "n", "p", "s", "mn"],
    description: "10 parejas que abarcan valencias positivas y negativas habituales.",
    timeLimit: 120,
  },
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck(pairIds) {
  const selectedPairs = chemistryPairs.filter((pair) => pairIds.includes(pair.id));
  const deck = selectedPairs.flatMap((pair) => [
    {
      id: `${pair.id}-element`,
      pairId: pair.id,
      type: "element",
      label: pair.element,
      helper: "Elemento",
      note: pair.note,
    },
    {
      id: `${pair.id}-valence`,
      pairId: pair.id,
      type: "valence",
      label: `Valencia ${pair.valence}`,
      helper: "Valencia",
      note: pair.note,
    },
  ]);
  return shuffle(deck);
}

function calculateGrid(cardCount) {
  if (cardCount <= 0) {
    return { columns: 1, rows: 1 };
  }

  let rows = Math.floor(Math.sqrt(cardCount));
  while (rows > 1 && cardCount % rows !== 0) {
    rows -= 1;
  }

  if (cardCount % rows !== 0) {
    rows = 1;
  }

  return { columns: cardCount / rows, rows };
}

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) {
    totalSeconds = 0;
  }

  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function IntroScreen({ onContinue }) {
  return (
    <section className="space-y-8 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-brand/70">Nueva misión química</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Encuentra las parejas perfectas</h2>
        <p className="mx-auto max-w-2xl text-base text-slate-300/90">
          Da la vuelta a las cartas y busca cada pareja formada por un elemento químico y su valencia correspondiente
          antes de que se acabe el tiempo.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-base font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:from-brand-dark hover:to-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          ¡Empezar!
        </button>
      </div>
      <p className="text-sm text-slate-300/80">
        ¡Listo! Pulsa en dos cartas para descubrirlas y memoriza dónde está cada combinación.
      </p>
    </section>
  );
}

function DifficultyScreen({ selectedDifficulty, onSelect, onPlay, onBack }) {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-brand/70">Selecciona el reto</p>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Elige tu nivel</h2>
          <p className="text-base text-slate-300/90">
            Cada nivel añade nuevas familias de elementos y reduce el tiempo disponible. Puedes volver a esta pantalla en
            cualquier momento para cambiar de reto.
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(difficulties).map(([key, config]) => {
          const isActive = selectedDifficulty === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`group relative overflow-hidden rounded-3xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                isActive
                  ? "border-brand/70 bg-brand/10 shadow-xl"
                  : "border-white/10 bg-white/5 hover:border-brand/40 hover:bg-brand/5"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 transition group-hover:via-white/5" />
              <div className="relative flex h-full flex-col justify-between gap-6 p-6 text-left">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand/80">{config.label}</p>
                  <p className="text-lg font-semibold text-slate-100">{config.description}</p>
                </div>
                <dl className="space-y-2 text-sm text-slate-300/90">
                  <div className="flex items-center justify-between">
                    <dt>Parejas</dt>
                    <dd>{config.pairIds.length}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Tiempo</dt>
                    <dd>{formatTime(config.timeLimit)} min</dd>
                  </div>
                </dl>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          ← Volver
        </button>
        <button
          type="button"
          onClick={onPlay}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:from-brand-dark hover:to-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          ¡A jugar!
        </button>
      </div>
    </section>
  );
}

function Scoreboard({ moves, matched, totalPairs, timeLeft, timeLimit, onReset, onBack }) {
  const remaining = Number.isFinite(timeLeft) ? timeLeft : timeLimit ?? 0;
  const progress = timeLimit > 0 ? Math.min(100, ((timeLimit - remaining) / timeLimit) * 100) : 0;

  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <dl className="grid grid-cols-2 gap-4 text-sm sm:flex sm:flex-wrap sm:gap-6 sm:text-base">
          <div className="space-y-1">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Intentos</dt>
            <dd className="text-2xl font-semibold text-slate-100">{moves}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Parejas</dt>
            <dd className="text-2xl font-semibold text-slate-100">
              {matched} / {totalPairs}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Tiempo</dt>
            <dd className={`text-2xl font-semibold ${remaining <= 10 ? "text-amber-300" : "text-emerald-200"}`}>
              {formatTime(remaining)}
            </dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Cambiar nivel
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:from-brand-dark hover:to-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-emerald-300 via-brand to-brand-dark transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

function MemoryBoard({ cards, flippedCards, matchedPairs, isBusy, onCardClick }) {
  const flippedIds = flippedCards.map((card) => card.id);
  const matchedIds = new Set(matchedPairs);
  const { columns } = useMemo(() => calculateGrid(cards.length), [cards.length]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Encuentra las parejas</h2>
      <div
        className="grid gap-3 sm:gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => {
          const isMatched = matchedIds.has(card.pairId);
          const isRevealed = isMatched || flippedIds.includes(card.id);
          const disabled = isMatched || isRevealed || isBusy;

          return (
            <button
              key={card.id}
              type="button"
              disabled={disabled}
              onClick={() => onCardClick(card)}
              className={`relative flex aspect-[3/4] w-full items-center justify-center rounded-2xl border text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                isMatched
                  ? "border-emerald-300/70 bg-emerald-500/20 text-emerald-100 shadow-inner"
                  : isRevealed
                  ? "border-white/70 bg-white text-slate-900 shadow-xl"
                  : "border-white/10 bg-slate-900/70 text-slate-300/70 hover:border-brand/40 hover:bg-slate-900"
              } ${disabled ? "cursor-default" : "cursor-pointer"}`}
              aria-pressed={isRevealed}
            >
              {isRevealed ? (
                <div className="flex h-full w-full flex-col items-center gap-3 overflow-hidden px-3 py-4 text-sm sm:px-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      card.type === "element"
                        ? "bg-brand/10 text-brand"
                        : "bg-amber-200/20 text-amber-200"
                    }`}
                  >
                    {card.helper}
                  </span>
                  <div className="flex flex-1 flex-col justify-center gap-2 text-pretty">
                    <span className="text-base font-semibold leading-tight text-balance sm:text-lg">{card.label}</span>
                    <p className="text-[11px] leading-relaxed text-slate-500 sm:text-xs">{card.note}</p>
                  </div>
                </div>
              ) : (
                <span className="text-3xl font-semibold text-brand">?</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function HelperPanel({ difficulty }) {
  const config = difficulties[difficulty];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300/90">
      <h3 className="text-base font-semibold text-slate-100">Consejo rápido</h3>
      <p className="mt-2 leading-relaxed">
        {config
          ? `Repasa las valencias clave del nivel ${config.label.toLowerCase()}: los metales alcalinos suelen ser +1, los alcalinotérreos +2 y los halógenos -1. Observa las notas en cada carta para recordar en qué compuestos aparece la valencia.`
          : "Gira dos cartas por turno y encuentra coincidencias antes de que se agote el tiempo."}
      </p>
    </section>
  );
}

function GameScreen({
  cards,
  flippedCards,
  matchedPairs,
  isBusy,
  onCardClick,
  moves,
  totalPairs,
  timeLeft,
  timeLimit,
  onReset,
  onBack,
  difficulty,
}) {
  return (
    <div className="space-y-6">
      <Scoreboard
        moves={moves}
        matched={matchedPairs.length}
        totalPairs={totalPairs}
        timeLeft={timeLeft}
        timeLimit={timeLimit}
        onReset={onReset}
        onBack={onBack}
      />
      <MemoryBoard
        cards={cards}
        flippedCards={flippedCards}
        matchedPairs={matchedPairs}
        isBusy={isBusy}
        onCardClick={onCardClick}
      />
      <HelperPanel difficulty={difficulty} />
    </div>
  );
}

function ResultScreen({ result, onReplay, onSelectLevel }) {
  const config = result ? difficulties[result.difficulty] : null;
  const isSuccess = result?.status === "success";
  const timeUsed = result?.timeLimit != null && result?.timeLeft != null ? result.timeLimit - result.timeLeft : null;

  return (
    <section className="space-y-6 text-center">
      <div
        className={`space-y-4 rounded-3xl border p-6 shadow-xl ${
          isSuccess
            ? "border-emerald-300/60 bg-emerald-500/15 text-emerald-50"
            : "border-rose-400/60 bg-rose-500/15 text-rose-50"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {isSuccess ? "¡Victoria química!" : "Tiempo agotado"}
        </h2>
        <p className="text-base text-white/90">
          {isSuccess
            ? "Has relacionado todas las valencias correctamente. Sigue practicando para dominar toda la tabla periódica."
            : "Se acabó el tiempo antes de encontrar todas las parejas. Respira hondo y vuelve a intentarlo."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300/70">Nivel</p>
          <p className="mt-1 text-lg font-semibold text-slate-100">{config?.label ?? "-"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300/70">Intentos</p>
          <p className="mt-1 text-lg font-semibold text-slate-100">{result?.moves ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300/70">Tiempo</p>
          <p className="mt-1 text-lg font-semibold text-slate-100">
            {timeUsed != null ? `${formatTime(timeUsed)} / ${formatTime(result.timeLimit)}` : "-"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onSelectLevel}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Elegir otro nivel
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Intentarlo de nuevo
        </button>
      </div>
    </section>
  );
}

function MemoryValencesGame() {
  const [gameStage, setGameStage] = useState("intro");
  const [selectedDifficulty, setSelectedDifficulty] = useState("facil");
  const [difficulty, setDifficulty] = useState(null);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [result, setResult] = useState(null);

  const totalPairs = useMemo(() => (difficulty ? difficulties[difficulty].pairIds.length : 0), [difficulty]);
  const timeLimit = difficulty ? difficulties[difficulty].timeLimit : null;

  const startNewGame = (levelKey) => {
    const deck = createDeck(difficulties[levelKey].pairIds);
    setDifficulty(levelKey);
    setSelectedDifficulty(levelKey);
    setCards(deck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsBusy(false);
    setResult(null);
    setTimeLeft(difficulties[levelKey].timeLimit);
    setGameStage("playing");
  };

  useEffect(() => {
    if (gameStage !== "playing") {
      return;
    }
    if (timeLeft === null || timeLeft <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [gameStage, timeLeft]);

  useEffect(() => {
    if (gameStage !== "playing") {
      return;
    }
    if (!difficulty) {
      return;
    }
    if (totalPairs > 0 && matchedPairs.length === totalPairs) {
      const limit = difficulties[difficulty].timeLimit;
      setResult({
        status: "success",
        moves,
        matched: totalPairs,
        totalPairs,
        difficulty,
        timeLeft,
        timeLimit: limit,
      });
      setGameStage("complete");
      if (window.CommonFireworks && typeof window.CommonFireworks.launch === "function") {
        window.CommonFireworks.launch({ duration: 4200 });
      }
    }
  }, [matchedPairs, totalPairs, moves, difficulty, timeLeft, gameStage]);

  useEffect(() => {
    if (gameStage !== "playing") {
      return;
    }
    if (!difficulty) {
      return;
    }
    if (timeLeft !== 0) {
      return;
    }
    setResult({
      status: "timeout",
      moves,
      matched: matchedPairs.length,
      totalPairs,
      difficulty,
      timeLeft: 0,
      timeLimit: difficulties[difficulty].timeLimit,
    });
    setGameStage("complete");
  }, [timeLeft, gameStage, difficulty, moves, matchedPairs.length, totalPairs]);

  const handleCardClick = (card) => {
    if (gameStage !== "playing" || isBusy || timeLeft === 0) {
      return;
    }

    const alreadyFlipped = flippedCards.find((flipped) => flipped.id === card.id);
    if (alreadyFlipped || matchedPairs.includes(card.pairId)) {
      return;
    }

    const nextFlipped = [...flippedCards, card];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsBusy(true);
      setMoves((value) => value + 1);

      const [first, second] = nextFlipped;
      if (first.pairId === second.pairId && first.type !== second.type) {
        const pairId = first.pairId;
        window.setTimeout(() => {
          setMatchedPairs((current) => (current.includes(pairId) ? current : [...current, pairId]));
          setFlippedCards([]);
          setIsBusy(false);
        }, 400);
      } else {
        window.setTimeout(() => {
          setFlippedCards([]);
          setIsBusy(false);
        }, 900);
      }
    }
  };

  const handleReset = () => {
    if (difficulty) {
      startNewGame(difficulty);
    }
  };

  const goToDifficulty = () => {
    setGameStage("difficulty");
  };

  let content = null;

  if (gameStage === "intro") {
    content = <IntroScreen onContinue={goToDifficulty} />;
  } else if (gameStage === "difficulty") {
    content = (
      <DifficultyScreen
        selectedDifficulty={selectedDifficulty}
        onSelect={setSelectedDifficulty}
        onPlay={() => startNewGame(selectedDifficulty)}
        onBack={() => setGameStage("intro")}
      />
    );
  } else if (gameStage === "playing") {
    content = (
      <GameScreen
        cards={cards}
        flippedCards={flippedCards}
        matchedPairs={matchedPairs}
        isBusy={isBusy}
        onCardClick={handleCardClick}
        moves={moves}
        totalPairs={totalPairs}
        timeLeft={timeLeft}
        timeLimit={timeLimit}
        onReset={handleReset}
        onBack={goToDifficulty}
        difficulty={difficulty}
      />
    );
  } else if (gameStage === "complete") {
    content = (
      <ResultScreen
        result={result}
        onReplay={() => difficulty && startNewGame(difficulty)}
        onSelectLevel={goToDifficulty}
      />
    );
  }

  return <div className="space-y-6">{content}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MemoryValencesGame />);
