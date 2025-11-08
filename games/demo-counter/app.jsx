const { useState, useEffect } = React;

const buttonTone = {
  danger: "bg-rose-500 text-brand-foreground hover:bg-rose-400",
  success: "bg-emerald-400 text-brand-foreground hover:bg-emerald-300",
  neutral: "bg-white/10 text-slate-100 hover:bg-white/20",
};

function CounterButton({ label, onClick, tone }) {
  return (
    <button
      type="button"
      className={`min-w-[96px] rounded-xl px-5 py-3 text-lg font-semibold shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${buttonTone[tone]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function CounterDisplay({ value }) {
  return (
    <div className="grid place-items-center gap-2 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">
        Marcador
      </span>
      <output className="text-5xl font-black sm:text-6xl" aria-live="polite">
        {value}
      </output>
    </div>
  );
}

function HistoryList({ history }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Historial</h2>
      {history.length === 0 ? (
        <p className="text-sm text-slate-300/70">
          Empieza a jugar para ver tus movimientos.
        </p>
      ) : (
        <ol className="space-y-2 pl-4">
          {history.map((entry, index) => (
            <li
              key={index}
              className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm"
            >
              <span
                className={`inline-grid h-7 w-7 place-items-center rounded-full text-sm font-semibold text-brand-foreground ${
                  entry.type === "add"
                    ? "bg-emerald-400"
                    : entry.type === "subtract"
                    ? "bg-rose-500"
                    : "bg-brand"
                }`}
              >
                {entry.type === "add"
                  ? "+"
                  : entry.type === "subtract"
                  ? "−"
                  : "0"}
              </span>
              <span className="text-slate-50">{entry.message}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function CounterGame() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCount((current) => current + 1);
      setHistory((current) => [
        { type: "add", message: "Auto incremento" },
        ...current.slice(0, 19),
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const pushHistory = (type, message) => {
    setHistory((current) => [
      { type, message },
      ...current.slice(0, 19),
    ]);
  };

  const handleAdd = () => {
    setCount((value) => value + 1);
    pushHistory("add", "Sumaste 1 punto.");
  };

  const handleSubtract = () => {
    setCount((value) => value - 1);
    pushHistory("subtract", "Restaste 1 punto.");
  };

  const handleReset = () => {
    setCount(0);
    setHistory([{ type: "reset", message: "Reiniciaste el marcador." }]);
  };

  const toggleAutoPlay = () => {
    setAutoPlay((value) => {
      const nextValue = !value;
      pushHistory(
        "auto",
        nextValue ? "Auto incremento activado." : "Auto incremento detenido."
      );
      return nextValue;
    });
  };

  return (
    <div className="space-y-6">
      <CounterDisplay value={count} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <CounterButton label="-1" onClick={handleSubtract} tone="danger" />
        <CounterButton label="Reset" onClick={handleReset} tone="neutral" />
        <CounterButton label="+1" onClick={handleAdd} tone="success" />
      </div>

      <label className="inline-flex items-center justify-center gap-3 text-sm text-slate-300/80">
        <input
          className="h-5 w-5 rounded border border-white/30 bg-slate-900 accent-brand"
          type="checkbox"
          checked={autoPlay}
          onChange={toggleAutoPlay}
        />
        Incremento automático cada 1,5 segundos
      </label>

      <HistoryList history={history} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CounterGame />);
