"use client"

import type { ComponentType } from "react"
import styles from "./ProjectSpecimen.module.css"

function GentooSpecimen() {
  return (
    <div className={styles.specimen} aria-hidden="true">
      <svg
        viewBox="0 0 360 170"
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle registration grid */}
        <line x1="24" y1="52" x2="336" y2="52" className={styles.gridLine} />
        <line x1="24" y1="118" x2="336" y2="118" className={styles.gridLine} />

        {/* Pipeline connectors */}
        <path
          d="M 104 85 L 146 85 M 214 85 L 256 85"
          className={styles.connector}
        />
        <path
          d="M 104 85 L 146 85 M 214 85 L 256 85"
          className={styles.connectorPulse}
        />

        {/* Upstream node */}
        <rect x="28" y="63" width="76" height="44" className={styles.nodeBox} />
        <text x="66" y="82" textAnchor="middle" className={styles.nodeTitle}>
          upstream
        </text>
        <text x="66" y="96" textAnchor="middle" className={styles.nodeMeta}>
          go / rust
        </text>

        {/* Vendor node */}
        <rect
          x="146"
          y="58"
          width="68"
          height="54"
          className={styles.nodeBoxPrimary}
        />
        <text
          x="180"
          y="82"
          textAnchor="middle"
          className={styles.nodeTitleLight}
        >
          vendor
        </text>
        <text
          x="180"
          y="97"
          textAnchor="middle"
          className={styles.nodeMetaLight}
        >
          sha512
        </text>

        {/* Portage node */}
        <rect
          x="256"
          y="63"
          width="76"
          height="44"
          className={styles.nodeBox}
        />
        <text x="294" y="82" textAnchor="middle" className={styles.nodeTitle}>
          portage
        </text>
        <text x="294" y="96" textAnchor="middle" className={styles.nodeMeta}>
          ebuild
        </text>

        {/* Checksum tick marks */}
        <rect
          x="28"
          y="132"
          width="44"
          height="3"
          className={styles.barMuted}
        />
        <rect x="78" y="132" width="26" height="3" className={styles.barInk} />
        <rect
          x="146"
          y="132"
          width="68"
          height="3"
          className={styles.barAccent}
        />
        <rect
          x="256"
          y="132"
          width="52"
          height="3"
          className={styles.barMuted}
        />
        <rect x="314" y="132" width="18" height="3" className={styles.barInk} />
      </svg>
    </div>
  )
}

function InstagramGraphSpecimen() {
  const leftNodes = [
    { x: 64, y: 38 },
    { x: 64, y: 70 },
    { x: 64, y: 102 },
    { x: 64, y: 134 },
  ]
  const rightNodes = [
    { x: 296, y: 48 },
    { x: 296, y: 86 },
    { x: 296, y: 124 },
  ]
  const edges: readonly [number, number, boolean][] = [
    [0, 0, false],
    [0, 1, true],
    [1, 0, false],
    [1, 1, true],
    [1, 2, false],
    [2, 1, true],
    [2, 2, false],
    [3, 1, false],
    [3, 2, true],
  ]

  return (
    <div className={styles.specimen} aria-hidden="true">
      <svg
        viewBox="0 0 360 170"
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bipartite chords */}
        {edges.map(([l, r, highlight], idx) => (
          <path
            key={idx}
            d={`M ${leftNodes[l].x} ${leftNodes[l].y} C 160 ${leftNodes[l].y}, 200 ${rightNodes[r].y}, ${rightNodes[r].x} ${rightNodes[r].y}`}
            className={highlight ? styles.graphEdgeActive : styles.graphEdge}
          />
        ))}

        {/* Sender column */}
        {leftNodes.map((n, idx) => (
          <circle
            key={`l-${idx}`}
            cx={n.x}
            cy={n.y}
            r={idx === 1 ? 6.5 : 4.5}
            className={idx === 1 ? styles.nodeAccent : styles.nodePrimary}
          />
        ))}

        {/* Conversation column */}
        {rightNodes.map((n, idx) => (
          <rect
            key={`r-${idx}`}
            x={n.x - 5}
            y={n.y - 5}
            width={10}
            height={10}
            className={idx === 1 ? styles.nodeAccent : styles.nodePrimary}
          />
        ))}

        {/* Axis labels */}
        <text x="64" y="158" textAnchor="middle" className={styles.nodeMeta}>
          senders
        </text>
        <text x="296" y="158" textAnchor="middle" className={styles.nodeMeta}>
          threads
        </text>
      </svg>
    </div>
  )
}

function UsaSpendingSpecimen() {
  const strata = [
    { y: 34, w: 148, accent: false },
    { y: 54, w: 196, accent: false },
    { y: 74, w: 122, accent: true },
    { y: 94, w: 174, accent: false },
    { y: 114, w: 158, accent: false },
    { y: 134, w: 94, accent: false },
  ]

  return (
    <div className={styles.specimen} aria-hidden="true">
      <svg
        viewBox="0 0 360 170"
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Compressed source block */}
        <rect
          x="28"
          y="50"
          width="48"
          height="70"
          className={styles.nodeBoxPrimary}
        />
        <text
          x="52"
          y="83"
          textAnchor="middle"
          className={styles.nodeTitleLight}
        >
          zstd
        </text>
        <text
          x="52"
          y="97"
          textAnchor="middle"
          className={styles.nodeMetaLight}
        >
          csv
        </text>

        {/* Fan-out lines into partitioned Parquet strata */}
        {strata.map((row, idx) => (
          <g key={idx} className={styles.strataRow}>
            <path
              d={`M 76 85 C 102 85, 102 ${row.y + 5}, 126 ${row.y + 5}`}
              className={styles.graphEdge}
            />
            <rect
              x="128"
              y={row.y}
              width={row.w}
              height="10"
              className={row.accent ? styles.strataBarAccent : styles.strataBar}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

function BeatDetectorSpecimen() {
  const heights = [
    18, 28, 16, 42, 74, 34, 20, 26, 86, 48, 22, 16, 54, 78, 30, 18, 24, 68, 36,
    20, 14, 46, 82, 32, 18,
  ]
  const beatIndices = new Set([4, 8, 13, 17, 22])

  return (
    <div className={styles.specimen} aria-hidden="true">
      <svg
        viewBox="0 0 360 170"
        className={styles.svg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center baseline */}
        <line x1="24" y1="88" x2="336" y2="88" className={styles.gridLine} />

        {/* Audio onset bars */}
        {heights.map((h, idx) => {
          const x = 32 + idx * 12.2
          const isBeat = beatIndices.has(idx)
          return (
            <rect
              key={idx}
              x={x}
              y={88 - h / 2}
              width={5}
              height={h}
              className={isBeat ? styles.beatBarAccent : styles.beatBar}
              style={{ animationDelay: `${(idx % 5) * 90}ms` }}
            />
          )
        })}

        {/* Tempo readout */}
        <text x="32" y="152" className={styles.nodeMeta}>
          pipewire · aubio
        </text>
        <text x="328" y="152" textAnchor="end" className={styles.bpmTag}>
          124 BPM
        </text>
      </svg>
    </div>
  )
}

const projectSpecimens: Readonly<Record<string, ComponentType>> = {
  "gentoo-overlay-vendoring": GentooSpecimen,
  "instagram-message-analyzer": InstagramGraphSpecimen,
  "usaspending-data-pipeline": UsaSpendingSpecimen,
  "beat-detector": BeatDetectorSpecimen,
}

export function getProjectSpecimen(
  projectId: string,
): ComponentType | undefined {
  return Object.hasOwn(projectSpecimens, projectId)
    ? projectSpecimens[projectId]
    : undefined
}
