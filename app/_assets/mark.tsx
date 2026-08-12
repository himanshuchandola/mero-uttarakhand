import { ImageResponse } from "next/og";

/**
 * A single ridge silhouette, drawn with the classic CSS border-triangle trick so it
 * renders through satori without depending on an external image asset. Cream peak on
 * the same dusk ground as the rest of the site, ringed in the accent used for the
 * second hero line.
 */
export function renderMark(edge: number) {
  const ring = Math.max(2, Math.round(edge * 0.07));
  const peak = edge * 0.34;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#2a1a12",
          border: `${ring}px solid #ffe9cf`,
          borderRadius: edge * 0.22,
          paddingBottom: edge * 0.16,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${peak}px solid transparent`,
            borderRight: `${peak}px solid transparent`,
            borderBottom: `${peak * 1.05}px solid #fff4e6`,
          }}
        />
      </div>
    ),
    { width: edge, height: edge },
  );
}
