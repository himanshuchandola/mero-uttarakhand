"use client";
import { useEffect, useState } from "react";

/** Renders nothing until mounted so server and client markup agree. */
export default function Clock() {
  const [now, setNow] = useState<string>();
  useEffect(() => {
    const read = () => setNow(new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).toLowerCase());
    read();
    const id = window.setInterval(read, 1_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="clock">{now ?? ""}</span>;
}
