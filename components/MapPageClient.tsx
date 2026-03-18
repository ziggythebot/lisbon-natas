"use client";

import { useMemo, useState } from "react";

import Map from "@/components/Map";
import { ECOSYSTEM_META, ECOSYSTEM_ORDER } from "@/lib/ecosystemConfig";
import { EcosystemPoint, EcosystemType } from "@/lib/types";

interface MapPageClientProps {
  ecosystemPoints: EcosystemPoint[];
}

function buildInitialState(points: EcosystemPoint[]): Record<EcosystemType, boolean> {
  const initial: Record<EcosystemType, boolean> = {
    vc: false,
    funding: false,
    ai: false,
    ai_bio: false,
    fintech: false,
    web3: false,
    coworking: false,
    edu: false,
    big_tech: false,
    legendary: false,
    top: false,
    award: false,
    historic: false
  };

  points.forEach((point) => {
    initial[point.type] = true;
  });

  return initial;
}

const DEFAULT_VISIBLE_TYPES: EcosystemType[] = ["legendary", "top", "award", "historic"];

export default function MapPageClient({ ecosystemPoints }: MapPageClientProps) {
  const [enabledByType, setEnabledByType] = useState<Record<EcosystemType, boolean>>(() => {
    const initial = buildInitialState(ecosystemPoints);
    const hasAny = Object.values(initial).some(Boolean);
    if (hasAny) return initial;
    return {
      ...initial,
      legendary: true,
      top: true,
      award: true,
      historic: true
    };
  });

  const availableTypes = useMemo(
    () => {
      const fromData = ECOSYSTEM_ORDER.filter((type) => ecosystemPoints.some((point) => point.type === type));
      return fromData.length ? fromData : DEFAULT_VISIBLE_TYPES;
    },
    [ecosystemPoints]
  );

  const enabledTypes = useMemo(
    () => availableTypes.filter((type) => enabledByType[type]),
    [availableTypes, enabledByType]
  );

  return (
    <main className="shell">
      <header className="topbar" style={{ background: 'linear-gradient(135deg, #fff5e1 0%, #ffe4b5 100%)', borderBottom: '3px solid #d4a574' }}>
        <div className="topbar-brand">
          <h1 style={{ color: '#8b4513', fontFamily: 'Georgia, serif', letterSpacing: '0.5px' }}>🥮 Pastéis de Nata em Lisboa 🇵🇹</h1>
          <span className="topbar-cta" style={{ color: '#8b6914' }}>
            [By{" "}
            <a href="https://x.com/b1rdmania" target="_blank" rel="noreferrer" style={{ color: '#d4a574' }}>
              b1rdmania
            </a>
            ] [<span className="mobile-hide">{ecosystemPoints.length} legendary nata spots</span><span className="mobile-hide">]</span>
          </span>
        </div>
        <nav className="topbar-nav" aria-label="Map layers">
          <span className="topbar-cta topbar-toggle-label">toggle:</span>
          {availableTypes.map((type) => {
            const isOn = enabledByType[type];
            return (
              <button
                key={type}
                type="button"
                className={isOn ? "topbar-btn active" : "topbar-btn"}
                onClick={() => setEnabledByType((state) => ({ ...state, [type]: !state[type] }))}
              >
                <span className="dot" style={{ background: isOn ? ECOSYSTEM_META[type].color : "transparent", borderColor: ECOSYSTEM_META[type].color }} aria-hidden="true" />
                {ECOSYSTEM_META[type].label}
              </button>
            );
          })}
        </nav>
      </header>

      <section className="map-shell">
        <Map ecosystemPoints={ecosystemPoints} enabledTypes={enabledTypes} />
      </section>
    </main>
  );
}
