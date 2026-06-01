import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import type { StoreShowcaseAlbum } from '../data/storeShowcaseData'

type Props = {
  album: StoreShowcaseAlbum
}

const SWIPE_THRESHOLD_PX = 48

export default function StoreShowcaseGallery({ album }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + album.images.length) % album.images.length)
  }

  const goNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % album.images.length)
  }

  const current = lightboxIndex !== null ? album.images[lightboxIndex] : null

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX
  }

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return
    const delta = clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    if (delta > 0) goPrev()
    else goNext()
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#262626]">{album.title}</h2>
        <p className="text-sm text-[#8C8C8C] mt-1">
          {album.location} · {album.date.replace(/-/g, '/')}
        </p>
        <p className="text-sm text-[#595959] mt-3 leading-relaxed">{album.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {album.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[#E6F7FF] text-[#1890FF] text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {album.images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative rounded-xl overflow-hidden border border-[#F0F0F0] bg-[#FAFAFA] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ZoomIn
                size={28}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
              />
            </div>
            <p className="px-3 py-2 text-xs text-[#595959] bg-white border-t border-[#F0F0F0]">
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      {current && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="图片预览"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white shrink-0">
            <p className="text-sm truncate flex-1 pr-4">
              {lightboxIndex + 1} / {album.images.length} · {current.caption}
            </p>
            <button
              type="button"
              onClick={closeLightbox}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="关闭"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center min-h-0 px-4 pb-4 relative touch-pan-y"
            onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
          >
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 md:left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="上一张"
            >
              <ChevronLeft size={24} />
            </button>
            <img
              src={current.src}
              alt={current.caption}
              className="max-w-full max-h-full object-contain"
            />
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 md:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="下一张"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
