"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import type { DotStyle, ErrorCorrectionLevel } from "@/lib/qr";
import { isFinderPattern } from "@/lib/qr";

export interface QrRenderOptions {
  value: string;
  fg: string;
  bg: string;
  dotStyle: DotStyle;
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  style: DotStyle
) {
  const cx = x + s / 2;
  const cy = y + s / 2;
  ctx.beginPath();
  switch (style) {
    case "dots":
      ctx.arc(cx, cy, s * 0.42, 0, Math.PI * 2);
      break;
    case "rounded":
      ctx.roundRect(x + s * 0.08, y + s * 0.08, s * 0.84, s * 0.84, s * 0.28);
      break;
    case "diamond":
      ctx.moveTo(cx, y + s * 0.08);
      ctx.lineTo(x + s * 0.92, cy);
      ctx.lineTo(cx, y + s * 0.92);
      ctx.lineTo(x + s * 0.08, cy);
      ctx.closePath();
      break;
    case "star": {
      const rOuter = s * 0.48;
      const rInner = s * 0.2;
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? rOuter : rInner;
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }
    case "heart": {
      const w = s * 0.9;
      const h = s * 0.9;
      const top = y + s * 0.18;
      ctx.moveTo(cx, top + h * 0.75);
      ctx.bezierCurveTo(x + s * 0.05, top + h * 0.3, x + s * 0.15, top, cx - w * 0.12, top + h * 0.18);
      ctx.bezierCurveTo(cx - w * 0.02, top - h * 0.02, cx + w * 0.12, top, cx + w * 0.28, top + h * 0.18);
      ctx.bezierCurveTo(cx + w * 0.42, top + h * 0.32, cx + w * 0.18, top + h * 0.62, cx, top + h * 0.75);
      ctx.closePath();
      break;
    }
    case "hex":
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + Math.cos(a) * s * 0.48;
        const py = cy + Math.sin(a) * s * 0.48;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    case "sparkle":
      ctx.moveTo(cx, y + s * 0.05);
      ctx.quadraticCurveTo(cx + s * 0.12, cy - s * 0.12, x + s * 0.95, cy);
      ctx.quadraticCurveTo(cx + s * 0.12, cy + s * 0.12, cx, y + s * 0.95);
      ctx.quadraticCurveTo(cx - s * 0.12, cy + s * 0.12, x + s * 0.05, cy);
      ctx.quadraticCurveTo(cx - s * 0.12, cy - s * 0.12, cx, y + s * 0.05);
      ctx.closePath();
      break;
    case "bars":
      ctx.roundRect(x + s * 0.08, y + s * 0.18, s * 0.84, s * 0.64, s * 0.2);
      break;
    case "rings":
      ctx.arc(cx, cy, s * 0.42, 0, Math.PI * 2);
      break;
    case "square":
    default:
      ctx.rect(x, y, s, s);
      break;
  }
  ctx.fill();
}

export function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  opts: QrRenderOptions
) {
  const qr = QRCode.create(opts.value, {
    errorCorrectionLevel: opts.errorCorrectionLevel,
  });
  const count = qr.modules.size;
  const data = qr.modules.data;
  const quiet = opts.margin;
  const total = count + quiet * 2;
  const scale = opts.size / total;

  canvas.width = opts.size;
  canvas.height = opts.size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = opts.bg;
  ctx.fillRect(0, 0, opts.size, opts.size);
  ctx.fillStyle = opts.fg;

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!data[row * count + col]) continue;
      const x = (col + quiet) * scale;
      const y = (row + quiet) * scale;
      if (isFinderPattern(row, col, count)) {
        // Keep finder patterns solid so scanners stay reliable.
        ctx.beginPath();
        ctx.roundRect(x, y, scale, scale, scale * 0.12);
        ctx.fill();
      } else if (opts.dotStyle === "rings") {
        ctx.beginPath();
        ctx.arc(x + scale / 2, y + scale / 2, scale * 0.42, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = opts.bg;
        ctx.beginPath();
        ctx.arc(x + scale / 2, y + scale / 2, scale * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = opts.fg;
      } else {
        drawModule(ctx, x, y, scale, opts.dotStyle);
      }
    }
  }
}

export function buildQrSvg(opts: QrRenderOptions): string {
  const qr = QRCode.create(opts.value, {
    errorCorrectionLevel: opts.errorCorrectionLevel,
  });
  const count = qr.modules.size;
  const data = qr.modules.data;
  const quiet = opts.margin;
  const total = count + quiet * 2;
  const cell = 100 / total;
  const parts: string[] = [];

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!data[row * count + col]) continue;
      const x = (col + quiet) * cell;
      const y = (row + quiet) * cell;
      const r = opts.dotStyle === "dots" || opts.dotStyle === "rings" ? cell * 0.42 : 0;
      if (r > 0) {
        parts.push(
          `<circle cx="${(x + cell / 2).toFixed(3)}" cy="${(y + cell / 2).toFixed(3)}" r="${r.toFixed(3)}" />`
        );
      } else {
        parts.push(
          `<rect x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="${cell.toFixed(3)}" height="${cell.toFixed(3)}" rx="${(cell * 0.12).toFixed(3)}" />`
        );
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${opts.bg}"/><g fill="${opts.fg}">${parts.join("")}</g></svg>`;
}

export default function QrPreview({
  value,
  fg,
  bg,
  dotStyle,
  size,
  errorCorrectionLevel,
}: {
  value: string;
  fg: string;
  bg: string;
  dotStyle: DotStyle;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !value) return;
    renderQrToCanvas(ref.current, {
      value,
      fg,
      bg,
      dotStyle,
      size: 1024,
      margin: 2,
      errorCorrectionLevel,
    });
  }, [value, fg, bg, dotStyle, errorCorrectionLevel]);

  return (
    <canvas
      ref={ref}
      aria-label="QR code preview"
      className="h-auto w-full max-w-[320px] rounded-lg"
      style={{ aspectRatio: "1 / 1" }}
    />
  );
}
