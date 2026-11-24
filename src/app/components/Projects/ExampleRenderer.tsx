"use client"

import type { Example } from "@/types/project"
import { useRef, useState } from "react"
import styles from "./ExampleRenderer.module.css"

const webmPath = /^([^?#]*)\.webm([?#].*)?$/i

interface ExampleRendererProps {
  example: Example
  surface: "preview" | "detail"
  onPreviewUnavailable?: () => void
}

export function hasCardPreview(
  example: Example | undefined,
): example is Example {
  return !!example && (example.kind !== "video" || !!example.poster)
}

function resolveProjectMediaUrl(url: string): string {
  if (url.startsWith("http") || url.startsWith("/images/")) return url

  const base = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL
  return base ? `${base.replace(/\/$/, "")}/${url}` : `/images/${url}`
}

function ExampleImage({
  src,
  alt,
  preview,
  onUnavailable,
}: {
  src?: string
  alt: string
  preview: boolean
  onUnavailable?: () => void
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return preview ? null : (
      <p role="status" className={styles.unavailable}>
        Image unavailable. {alt}
      </p>
    )
  }

  function handleFailure() {
    setFailed(true)
    if (preview) onUnavailable?.()
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Catalog media has no authored dimensions or optimizer host requirements.
    <img
      className={preview ? styles.previewImage : styles.detailImage}
      src={src}
      alt={alt}
      loading={preview ? "lazy" : undefined}
      decoding="async"
      ref={(image) => {
        // A server-rendered image can fail before hydration attaches onError.
        if (image?.complete && !image.naturalWidth) handleFailure()
      }}
      onError={handleFailure}
    />
  )
}

function ExampleVideo({
  src,
  alt,
  poster,
}: {
  src: string
  alt: string
  poster?: string
}) {
  const [failed, setFailed] = useState(false)
  const failedSources = useRef(new Set<string>())
  const sources = webmPath.test(src)
    ? [
        { src, type: "video/webm" },
        { src: src.replace(webmPath, "$1.mp4$2"), type: "video/mp4" },
      ]
    : [{ src, type: undefined }]

  if (failed) {
    return (
      <p role="status" className={styles.unavailable}>
        Video unavailable. {alt}
      </p>
    )
  }

  return (
    <video
      aria-label={alt}
      className={styles.detailVideo}
      controls
      playsInline
      poster={poster}
      preload="metadata"
      onError={(event) => {
        if (event.target === event.currentTarget) setFailed(true)
      }}
    >
      {sources.map((source) => (
        <source
          key={source.src}
          src={source.src}
          type={source.type}
          onError={() => {
            failedSources.current.add(source.src)
            if (failedSources.current.size === sources.length) setFailed(true)
          }}
        />
      ))}
      Your browser does not support video playback.
    </video>
  )
}

export default function ExampleRenderer({
  example,
  surface,
  onPreviewUnavailable,
}: ExampleRendererProps) {
  const preview = surface === "preview"

  function renderImage(src: string | undefined, alt: string) {
    const resolved = src ? resolveProjectMediaUrl(src) : undefined
    return (
      <ExampleImage
        key={resolved}
        src={resolved}
        alt={alt}
        preview={preview}
        onUnavailable={onPreviewUnavailable}
      />
    )
  }

  const content = (() => {
    switch (example.kind) {
      case "image":
        return renderImage(example.src, example.alt)
      case "video": {
        if (preview) return renderImage(example.poster, example.alt)
        const src = resolveProjectMediaUrl(example.src)
        return (
          <ExampleVideo
            key={src}
            src={src}
            alt={example.alt}
            poster={
              example.poster
                ? resolveProjectMediaUrl(example.poster)
                : undefined
            }
          />
        )
      }
      case "excerpt":
        return preview ? (
          <div className={styles.previewExcerpt}>
            <pre>
              <code>{example.text}</code>
            </pre>
          </div>
        ) : (
          <pre
            className={styles.detailExcerpt}
            tabIndex={0}
            role="region"
            aria-label="Project excerpt"
          >
            <code>{example.text}</code>
          </pre>
        )
      default:
        return example satisfies never
    }
  })()

  return preview ? (
    content
  ) : (
    <figure className={styles.figure}>
      {content}
      {example.caption ? (
        <figcaption className={styles.caption}>{example.caption}</figcaption>
      ) : null}
    </figure>
  )
}
