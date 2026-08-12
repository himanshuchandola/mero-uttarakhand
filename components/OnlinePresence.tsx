"use client";
import { useEffect, useState } from "react";

const HEARTBEAT_MS = 8_000;

function sessionId() {
  const key = "mero-uttarakhand-session";
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export default function OnlinePresence() {
  const [count, setCount] = useState<number>();

  useEffect(() => {
    const id = sessionId();
    let cancelled = false;
    const beat = () => fetch("/api/presence", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: id }) })
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setCount(data.count); })
      .catch(() => {});
    beat();
    const interval = window.setInterval(beat, HEARTBEAT_MS);
    return () => { cancelled = true; window.clearInterval(interval); };
  }, []);

  if (count === undefined) return null;
  const noun = count === 1 ? "सवारी" : "सवारियाँ";
  return (
    <span className="presence" aria-label={`${count} passengers headed to the hills right now`}>
      <span className="presence-dot" aria-hidden="true" />
      <b>{count}</b> {noun}, पहाड़ की ओर
    </span>
  );
}
