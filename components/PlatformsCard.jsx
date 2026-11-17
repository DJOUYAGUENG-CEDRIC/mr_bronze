'use client';

import { useState } from 'react';
import { PLATFORMS, WHATSAPP_URL } from '@/lib/config';

const BROWN = '#5b4034';
const BROWN_SOFT = '#7a5c4c';
const TILE_BG = '#f3e4d8';
const TILE_BORDER = '#e7d3c4';

const BRAND = {
  '1XBET': { bg: '#1769d4', fg: '#ffffff', short: '1X' },
  MELBET: { bg: '#ffc107', fg: '#2b2b2b', short: 'M' },
  LINEBET: { bg: '#0f172a', fg: '#ffffff', short: 'LB' },
  BETWINNER: { bg: '#111827', fg: '#facc15', short: 'BW' },
  WINWIN: { bg: '#e11d48', fg: '#ffffff', short: 'W' },
  '888STARZ': { bg: '#16a34a', fg: '#ffffff', short: '8' },
};

function PlatformLogo({ name }) {
  const brand = BRAND[name] || { bg: BROWN, fg: '#ffffff', short: name.slice(0, 2) };
  return (
    <span
      className="flex items-center justify-center rounded-full shrink-0 font-extrabold"
      style={{
        width: 34,
        height: 34,
        background: brand.bg,
        color: brand.fg,
        fontSize: brand.short.length > 1 ? 12 : 15,
        letterSpacing: '-0.02em',
      }}
      aria-hidden="true"
    >
      {brand.short}
    </span>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function PlatformsCard() {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const promoCode = PLATFORMS.find((p) => p.code)?.code;

  const handleCopy = async () => {
    if (!promoCode) return;
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard non disponible
    }
  };

  return (
    <div className="px-3 pt-3 pb-1">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.12em]"
          style={{ color: BROWN_SOFT }}
        >
          Plateformes &amp; code promo
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[13px] font-extrabold shrink-0"
          style={{ color: BROWN }}
          aria-expanded={open}
        >
          {open ? 'Réduire' : 'Afficher'}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl px-2.5 py-2 active:scale-[0.98] transition-transform"
              style={{ background: TILE_BG, border: `1px solid ${TILE_BORDER}`, color: BROWN }}
              title={`Rejoindre ${p.name}`}
            >
              <PlatformLogo name={p.name} />
              <span className="text-[15px] font-extrabold truncate">{p.name}</span>
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {promoCode && (
          <div
            className="flex items-center gap-2 rounded-2xl pl-3 pr-1.5 py-1.5 shrink-0"
            style={{ background: TILE_BG, border: `2px dashed ${BROWN}` }}
          >
            <span className="text-[15px] font-extrabold tracking-wide" style={{ color: BROWN }}>
              {promoCode}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center rounded-xl"
              style={{ width: 34, height: 34, background: BROWN, color: '#ffffff' }}
              title={`Copier le code ${promoCode}`}
              aria-label={`Copier le code ${promoCode}`}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        )}

        {WHATSAPP_URL && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 text-[15px] font-extrabold active:scale-[0.99] transition-transform"
            style={{ background: '#22c55e', color: '#ffffff' }}
            title="Chaîne WhatsApp"
          >
            <WhatsAppIcon />
            Mon WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
