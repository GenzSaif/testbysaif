"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QrPreview, {
  buildQrSvg,
  renderQrToCanvas,
} from "@/components/QrPreview";
import {
  COLOR_PRESETS,
  DOT_STYLES,
  buildPayload,
  emptyForm,
  isFormReady,
} from "@/lib/qr";
import type {
  DotStyle,
  ErrorCorrectionLevel,
  QrForm,
  QrType,
} from "@/lib/qr";

const TYPES: { id: QrType; label: string; hint: string; badge: string }[] = [
  { id: "link", label: "Link", hint: "Website or any URL", badge: "#9DECFF" },
  { id: "text", label: "Text", hint: "Plain text", badge: "#D1FFAB" },
  { id: "wifi", label: "Wi-Fi", hint: "Join a network in one scan", badge: "#FF9AE4" },
  { id: "email", label: "Email", hint: "Open a pre-filled email", badge: "#E389FF" },
  { id: "contact", label: "Contact", hint: "Save as a vCard", badge: "#9681FF" },
];

const PASTELS = ["#9DECFF", "#D1FFAB", "#FF9AE4", "#E389FF", "#9681FF"];

function PastelBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-[40px] border px-4 py-1.5 text-sm font-medium text-[#212121]"
      style={{ background: `${color}80`, borderColor: color }}
    >
      {children}
    </span>
  );
}

function ArrowCircle({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        dark ? "bg-[#212121] text-white" : "bg-white text-[#212121]"
      }`}
    >
      <span className="arrow-track inline-block text-sm leading-none">↗</span>
    </span>
  );
}

function fieldLabel(text: string) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-[#555C4D] dark:text-neutral-300">
      {text}
    </label>
  );
}

const inputCls =
  "w-full rounded-[20px] border border-[#E7ECEF] bg-white px-4 py-3 text-[15px] text-[#212121] outline-none placeholder:text-[#CDD3D6] focus:border-[#58A60A] focus:ring-2 focus:ring-[#58A60A]/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

const STATEMENT = [
  "One",
  "scan,",
  "and",
  "you're",
  "there.",
  "No",
  "typing,",
  "no",
  "searching,",
  "no",
  "fuss,",
  "just",
  "the",
  "thing",
  "you",
  "wanted,",
  "in",
  "front",
  "of",
  "you.",
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState<QrForm>(emptyForm);
  const [fg, setFg] = useState("#212121");
  const [bg, setBg] = useState("#FFFFFF");
  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [size, setSize] = useState(1024);
  const [ecl, setEcl] = useState<ErrorCorrectionLevel>("M");
  const [preset, setPreset] = useState("Classic");
  const [notice, setNotice] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [statementOn, setStatementOn] = useState(false);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("qr-recent") ?? "[]") as string[];
      setRecent(saved.slice(0, 6));
    } catch {
      setRecent([]);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > lastScroll.current && y > 140);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStatementOn(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const payload = useMemo(() => buildPayload(form), [form]);
  const ready = isFormReady(form);

  const set = <K extends keyof QrForm>(key: K, value: QrForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function showNotice(text: string) {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function saveRecent(value: string) {
    setRecent((prev) => {
      const next = [value, ...prev.filter((v) => v !== value)].slice(0, 6);
      localStorage.setItem("qr-recent", JSON.stringify(next));
      return next;
    });
  }

  function downloadPng() {
    if (!ready) return;
    const canvas = document.createElement("canvas");
    renderQrToCanvas(canvas, {
      value: payload,
      fg,
      bg,
      dotStyle,
      size,
      margin: 2,
      errorCorrectionLevel: ecl,
    });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "qr-code.png";
    a.click();
    saveRecent(payload);
    showNotice("PNG downloaded.");
  }

  function downloadSvg() {
    if (!ready) return;
    const svg = buildQrSvg({
      value: payload,
      fg,
      bg,
      dotStyle,
      size,
      margin: 2,
      errorCorrectionLevel: ecl,
    });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
    saveRecent(payload);
    showNotice("SVG downloaded.");
  }

  async function copyPng() {
    if (!ready) return;
    try {
      const canvas = document.createElement("canvas");
      renderQrToCanvas(canvas, {
        value: payload,
        fg,
        bg,
        dotStyle,
        size: 1024,
        margin: 2,
        errorCorrectionLevel: ecl,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!blob) throw new Error("No image");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      showNotice("QR code copied to clipboard.");
    } catch {
      showNotice("Copy is not supported in this browser — use Download PNG.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4FFEB] font-sans text-[#212121] dark:bg-[#0A0A0A] dark:text-white">
      {/* Floating glass pill navbar */}
      <header
        className={`glass-dark fixed left-1/2 top-[27px] z-50 flex w-[min(100%-32px,1248px)] -translate-x-1/2 items-center justify-between rounded-[80px] px-4 py-2 shadow-nav transition-transform duration-300 ease-in-out sm:px-5 ${
          navHidden ? "-translate-y-[140%]" : "translate-y-0"
        }`}
        style={{ minHeight: 66 }}
      >
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#81D829] text-xl font-bold text-[#0A0A0A]">
            ▦
          </span>
          <span className="font-display text-[22px] font-bold italic leading-none">
            QR Studio
          </span>
        </a>
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
          <a href="#make" className="text-[15px] text-white/70 transition hover:text-white hover:font-semibold">
            Make
          </a>
          <a href="#styles" className="text-[15px] text-white/70 transition hover:text-white hover:font-semibold">
            Styles
          </a>
          <a href="#how" className="text-[15px] text-white/70 transition hover:text-white hover:font-semibold">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((v) => !v)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
            aria-label="Toggle light and dark theme"
          >
            {dark ? "☀ Light" : "◐ Dark"}
          </button>
          <a
            href="#make"
            className="arrow-btn hidden items-center gap-2 rounded-full bg-white/90 py-2 pl-4 pr-2 text-sm font-semibold text-[#0A0A0A] sm:inline-flex"
          >
            Make one <ArrowCircle dark />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="glass-dark fixed inset-x-4 top-[104px] z-40 rounded-[20px] p-5 lg:hidden">
          <nav className="flex flex-col gap-4 text-white" aria-label="Mobile">
            <a href="#make" onClick={() => setMenuOpen(false)}>Make</a>
            <a href="#styles" onClick={() => setMenuOpen(false)}>Styles</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          </nav>
        </div>
      )}

      {/* Hero */}
      <section id="top" className="px-4 pb-24 pt-[clamp(140px,18vw,190px)] sm:px-6">
        <div className="mx-auto max-w-[1208px] text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <PastelBadge color="#D1FFAB">Free, forever</PastelBadge>
            <PastelBadge color="#9DECFF">No sign-up</PastelBadge>
            <PastelBadge color="#FF9AE4">Made in your browser</PastelBadge>
          </div>
          <h1 className="hero-title mx-auto mt-6 max-w-3xl font-display font-extrabold italic">
            Make a QR code in{" "}
            <em className="not-italic italic text-[#58A60A]">seconds.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(16px,1.26vw,19px)] leading-relaxed text-[#555C4D] dark:text-neutral-300">
            Link, text, Wi-Fi, email or contact — type it, style it, download
            it. Nothing is uploaded. Everything happens on your device.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#make"
              className="arrow-btn inline-flex min-h-[56px] items-center gap-3 rounded-full bg-[#0A0A0A] py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition hover:bg-[#BDE930] hover:text-[#0A0A0A]"
            >
              Start making <ArrowCircle />
            </a>
            <a
              href="#how"
              className="glass-light inline-flex min-h-[56px] items-center rounded-full px-6 text-[15px] font-semibold text-[#212121] dark:text-white"
            >
              See how it works
            </a>
          </div>
          <p className="mt-10 text-sm font-light text-[#555C4D] dark:text-neutral-400">
            Scroll down <span aria-hidden>↓</span>
          </p>
        </div>
      </section>

      {/* Generator — stacked white sheet overlapping the hero */}
      <section
        id="make"
        className="relative z-10 -mt-[80px] rounded-t-[80px] bg-white px-4 pb-[clamp(84px,10vw,120px)] pt-[clamp(48px,6vw,72px)] shadow-card dark:bg-neutral-900 max-sm:-mt-10 max-sm:rounded-t-[36px]"
      >
        <div className="mx-auto max-w-[1208px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <div className="rounded-[36px] bg-white p-5 shadow-card dark:bg-neutral-900 sm:p-7">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="QR code type">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={form.type === t.id}
                    onClick={() => setForm((f) => ({ ...f, type: t.id }))}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      form.type === t.id
                        ? "bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A]"
                        : "bg-[#F4FFEB] text-[#212121] hover:bg-[#DFF1FC] dark:bg-neutral-800 dark:text-neutral-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-[#555C4D] dark:text-neutral-400">
                {TYPES.find((t) => t.id === form.type)?.hint}
              </p>

              <div className="mt-6 space-y-5">
                {form.type === "link" && (
                  <div>
                    {fieldLabel("Website link")}
                    <input className={inputCls} type="url" inputMode="url" placeholder="https://example.com" value={form.link} onChange={(e) => set("link", e.target.value)} />
                  </div>
                )}
                {form.type === "text" && (
                  <div>
                    {fieldLabel("Text")}
                    <textarea className={`${inputCls} min-h-[120px] resize-y`} placeholder="Type anything…" value={form.text} onChange={(e) => set("text", e.target.value)} />
                  </div>
                )}
                {form.type === "wifi" && (
                  <>
                    <div>
                      {fieldLabel("Network name (SSID)")}
                      <input className={inputCls} placeholder="My Wi-Fi" value={form.wifiSsid} onChange={(e) => set("wifiSsid", e.target.value)} />
                    </div>
                    <div>
                      {fieldLabel("Password")}
                      <input className={inputCls} type="password" autoComplete="off" placeholder="Wi-Fi password" value={form.wifiPassword} onChange={(e) => set("wifiPassword", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        {fieldLabel("Security")}
                        <select className={inputCls} value={form.wifiEncryption} onChange={(e) => set("wifiEncryption", e.target.value as QrForm["wifiEncryption"])}>
                          <option value="WPA">WPA / WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">No password</option>
                        </select>
                      </div>
                      <label className="flex items-end gap-2 pb-2 text-sm">
                        <input type="checkbox" checked={form.wifiHidden} onChange={(e) => set("wifiHidden", e.target.checked)} className="h-4 w-4 accent-[#58A60A]" />
                        Hidden network
                      </label>
                    </div>
                  </>
                )}
                {form.type === "email" && (
                  <>
                    <div>
                      {fieldLabel("To")}
                      <input className={inputCls} type="email" placeholder="hello@example.com" value={form.emailTo} onChange={(e) => set("emailTo", e.target.value)} />
                    </div>
                    <div>
                      {fieldLabel("Subject (optional)")}
                      <input className={inputCls} placeholder="Subject" value={form.emailSubject} onChange={(e) => set("emailSubject", e.target.value)} />
                    </div>
                    <div>
                      {fieldLabel("Message (optional)")}
                      <textarea className={`${inputCls} min-h-[100px] resize-y`} placeholder="Message" value={form.emailBody} onChange={(e) => set("emailBody", e.target.value)} />
                    </div>
                  </>
                )}
                {form.type === "contact" && (
                  <>
                    <div>
                      {fieldLabel("Full name")}
                      <input className={inputCls} placeholder="Abdullah Saif" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        {fieldLabel("Phone")}
                        <input className={inputCls} type="tel" placeholder="+880 1XXX-XXXXXX" value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
                      </div>
                      <div>
                        {fieldLabel("Email")}
                        <input className={inputCls} type="email" placeholder="hello@example.com" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      {fieldLabel("Organisation (optional)")}
                      <input className={inputCls} placeholder="Company or school" value={form.contactOrg} onChange={(e) => set("contactOrg", e.target.value)} />
                    </div>
                  </>
                )}
              </div>

              {/* Style */}
              <div id="styles" className="mt-8 border-t border-[#E7ECEF] pt-6 dark:border-neutral-800">
                <h2 className="font-display text-[22px] font-semibold">Style it your way</h2>
                <p className="mb-2 mt-4 text-sm font-medium text-[#555C4D] dark:text-neutral-300">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      title={p.name}
                      aria-label={`Colour preset ${p.name}`}
                      aria-pressed={preset === p.name}
                      onClick={() => { setPreset(p.name); setFg(p.fg); setBg(p.bg); }}
                      className={`h-10 w-10 rounded-full border-2 ${preset === p.name ? "border-[#0A0A0A] dark:border-white" : "border-transparent"}`}
                      style={{ background: p.fg, boxShadow: `inset 0 0 0 2px ${p.bg}` }}
                    />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    {fieldLabel("QR colour")}
                    <div className="flex items-center gap-2">
                      <input type="color" value={fg} onChange={(e) => { setFg(e.target.value); setPreset(""); }} className="h-10 w-12" aria-label="QR colour" />
                      <span className="text-sm">{fg}</span>
                    </div>
                  </div>
                  <div>
                    {fieldLabel("Background")}
                    <div className="flex items-center gap-2">
                      <input type="color" value={bg} onChange={(e) => { setBg(e.target.value); setPreset(""); }} className="h-10 w-12" aria-label="Background colour" />
                      <span className="text-sm">{bg}</span>
                    </div>
                  </div>
                </div>

                <p className="mb-2 mt-6 text-sm font-medium text-[#555C4D] dark:text-neutral-300">Dot style</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {DOT_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setDotStyle(s.id)}
                      aria-pressed={dotStyle === s.id}
                      className={`rounded-full px-2 py-2.5 text-sm ${
                        dotStyle === s.id
                          ? "bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A]"
                          : "bg-[#F4FFEB] hover:bg-[#DFF1FC] dark:bg-neutral-800"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    {fieldLabel(`Size — ${size} px`)}
                    <input type="range" min={512} max={2048} step={256} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    {fieldLabel("Error correction")}
                    <select className={inputCls} value={ecl} onChange={(e) => setEcl(e.target.value as ErrorCorrectionLevel)}>
                      <option value="L">Low (L) — smallest</option>
                      <option value="M">Medium (M) — recommended</option>
                      <option value="Q">Quartile (Q)</option>
                      <option value="H">High (H) — best for print</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <section className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[36px] bg-[#DFF1FC] p-5 shadow-card dark:bg-neutral-800 sm:p-6">
                <h2 className="font-display text-[22px] font-semibold">Live preview</h2>
                <div className="mt-4 flex justify-center rounded-[32px] bg-white p-5 dark:bg-neutral-900">
                  {ready ? (
                    <QrPreview value={payload} fg={fg} bg={bg} dotStyle={dotStyle} size={1024} errorCorrectionLevel={ecl} />
                  ) : (
                    <div className="flex aspect-square w-full max-w-[320px] flex-col items-center justify-center rounded-[32px] border border-dashed border-[#CDD3D6] p-6 text-center">
                      <p className="text-3xl">▦</p>
                      <p className="mt-3 font-medium">Your QR code will appear here</p>
                      <p className="mt-1 text-sm text-[#555C4D]">Fill in the field on the left to generate it.</p>
                    </div>
                  )}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={downloadPng}
                    disabled={!ready}
                    className="arrow-btn inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0A0A] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#BDE930] hover:text-[#0A0A0A] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Download PNG <ArrowCircle />
                  </button>
                  <button
                    onClick={downloadSvg}
                    disabled={!ready}
                    className="rounded-full bg-white px-4 py-3.5 text-sm font-semibold text-[#212121] transition hover:bg-[#F4FFEB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Download SVG
                  </button>
                  <button
                    onClick={copyPng}
                    disabled={!ready}
                    className="col-span-2 rounded-full bg-white px-4 py-3.5 text-sm font-semibold text-[#212121] transition hover:bg-[#F4FFEB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Copy image
                  </button>
                </div>
                {notice && (
                  <p role="status" className="mt-3 text-center text-sm text-[#555C4D] dark:text-neutral-300">{notice}</p>
                )}
                <p className="mt-3 text-center text-xs leading-relaxed text-[#555C4D] dark:text-neutral-400">
                  Tip: test the code with your phone camera before printing it.
                </p>
              </div>

              {recent.length > 0 && (
                <div className="mt-4 rounded-[36px] bg-white p-5 shadow-card dark:bg-neutral-900">
                  <h3 className="text-sm font-semibold">Recent</h3>
                  <ul className="mt-2 space-y-1">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => {
                            setForm((f) => ({ ...f, type: r.startsWith("http") ? "link" : "text", link: r.startsWith("http") ? r : f.link, text: r.startsWith("http") ? f.text : r }));
                          }}
                          className="block w-full truncate rounded-full px-3 py-1.5 text-left text-sm text-[#555C4D] hover:bg-[#F4FFEB] dark:text-neutral-300"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      {/* Scroll statement */}
      <section className="bg-[#F4FFEB] px-4 py-[clamp(84px,10vw,120px)] dark:bg-[#0A0A0A] sm:px-6">
        <p ref={statementRef} className="mx-auto max-w-3xl text-center font-display text-[clamp(32px,3.33vw,56px)] font-bold leading-[1.4]">
          {STATEMENT.map((w, i) => (
            <span
              key={i}
              className={`reveal-word ${statementOn ? (w === "there." ? "on-accent" : "on") : ""}`}
              style={{ transitionDelay: statementOn ? `${i * 90}ms` : "0ms" }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </section>

      {/* How it works — showcase cards */}
      <section id="how" className="rounded-t-[80px] bg-white px-4 py-[clamp(84px,10vw,120px)] dark:bg-neutral-900 max-sm:rounded-t-[36px] sm:px-6">
        <div className="mx-auto max-w-[1208px]">
          <h2 className="section-title text-center font-display font-semibold">
            Done in <em className="text-[#58A60A]">three taps.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-[clamp(16px,1.26vw,19px)] text-[#555C4D] dark:text-neutral-400">
            One idea per card. Nothing dense, nothing to learn.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { badge: "#9DECFF", title: "Type it", desc: "Pick Link, Text, Wi-Fi, Email or Contact and fill in the field.", shape: "bg-[#DFF1FC]" },
              { badge: "#D1FFAB", title: "Style it", desc: "Choose a colour preset and a dot style. Finder squares stay solid so it scans.", shape: "bg-[#F4FFEB]" },
              { badge: "#FF9AE4", title: "Download it", desc: "PNG for sharing and print, SVG for logos and large signs.", shape: "bg-[#FAF2E6]" },
            ].map((c, i) => (
              <article key={c.title} className="flex min-h-[450px] flex-col items-center rounded-[36px] bg-white p-7 text-center shadow-card dark:bg-neutral-800">
                <PastelBadge color={c.badge}>Step {i + 1}</PastelBadge>
                <h3 className="mt-4 font-display text-[22px] font-semibold">{c.title}</h3>
                <p className="mt-2 text-[clamp(16px,1.26vw,19px)] font-medium leading-relaxed text-[#555C4D] dark:text-neutral-300">{c.desc}</p>
                <div className={`mt-auto flex h-28 w-full items-center justify-center rounded-[32px] ${c.shape} pt-6`}>
                  <span className="text-5xl text-[#212121]">▦</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof band */}
      <section className="bg-[#E7ECEF] px-4 py-[clamp(84px,10vw,112px)] dark:bg-neutral-800 sm:px-6">
        <div className="mx-auto max-w-[1208px] text-center">
          <div className="flex justify-center">
            <div className="flex">
              {PASTELS.map((c, i) => (
                <span key={c} className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-4 border-white text-xl font-bold text-[#212121]" style={{ background: c, marginLeft: i === 0 ? 0 : -38 }}>
                  {["A", "S", "R", "T", "M"][i]}
                </span>
              ))}
              <span className="ml-[-38px] flex h-[84px] w-[84px] items-center justify-center rounded-full border-4 border-white bg-[#0A0A0A] text-sm font-semibold text-white">
                1k+
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-[54px] bg-white/50 px-4 py-2 text-sm font-medium">★★★★★ 4.9</span>
            <span className="rounded-[54px] bg-white/50 px-4 py-2 text-sm font-medium">Free, no sign-up</span>
            <span className="rounded-[54px] bg-white/50 px-4 py-2 text-sm font-medium">Works offline in your browser</span>
          </div>
          <p className="mx-auto mt-5 max-w-lg text-[clamp(16px,1.26vw,19px)] text-[#555C4D] dark:text-neutral-300">
            Made for menus, Wi-Fi, business cards, posters and everything in between.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <section aria-hidden className="overflow-hidden bg-white py-6 dark:bg-neutral-900" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-8">
              {["Menu", "Wi-Fi", "Business card", "Poster", "Event", "Payment", "Website", "Contact"].map((w) => (
                <span key={w} className="font-display text-[28px] font-semibold italic text-[#212121] dark:text-white">
                  {w} <span className="text-[#58A60A]">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Dark band */}
      <section className="bg-[#212121] px-4 py-[clamp(84px,10vw,120px)] text-center sm:px-6">
        <h2 className="section-title mx-auto max-w-2xl font-display font-semibold text-white">
          Your next scan is <em className="text-[#81D829]">one code away.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[clamp(16px,1.26vw,19px)] text-[#FAF2E6]">
          No account. No upload. Just a clean code that works.
        </p>
        <a href="#make" className="arrow-btn mt-8 inline-flex min-h-[56px] items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-[#0A0A0A] transition hover:bg-[#BDE930]">
          Make your code <ArrowCircle dark />
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#212121] px-4 pb-10 pt-[clamp(84px,10vw,120px)] text-white sm:px-6">
        <div className="mx-auto max-w-[min(1760px,100vw-64px)]">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-bold italic">QR Studio</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                A small, friendly QR maker. Built with Next.js, TypeScript and Tailwind CSS.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Make</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li><a href="#make">Link</a></li>
                <li><a href="#make">Wi-Fi</a></li>
                <li><a href="#make">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Good to know</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>Codes are made locally, in your browser</li>
                <li>PNG for print, SVG for large signs</li>
                <li>Test with your phone camera first</li>
              </ul>
            </div>
          </div>
          <p className="mt-16 text-center font-display text-[clamp(48px,10vw,140px)] font-extrabold leading-none text-[#80FF00]">
            QR STUDIO
          </p>
          <p className="mt-8 text-center text-xs text-white/50">
            QR Studio — free QR codes, made in your browser.
          </p>
        </div>
      </footer>
    </main>
  );
}
