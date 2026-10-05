import { useRef, useState } from 'react'
import Tabs from '../components/ui/Tabs'
import { galleryCategories, galleryPhotos } from '../data/gallery'
import './Gallery.css'

// Each filter shows how many photos it has
const filters = ['All', ...galleryCategories].map((category) => ({
  id: category,
  label: category,
  count:
    category === 'All'
      ? galleryPhotos.length
      : galleryPhotos.filter((photo) => photo.category === category).length,
}))

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [previewIndex, setPreviewIndex] = useState(null)
  const previewRef = useRef(null)

  const visiblePhotos =
    activeFilter === 'All'
      ? galleryPhotos
      : galleryPhotos.filter((photo) => photo.category === activeFilter)

  const previewPhoto = previewIndex === null ? null : visiblePhotos[previewIndex]

  function openPreview(index) {
    setPreviewIndex(index)
    previewRef.current.showModal()
  }

  // Step through the photos in the current filter, wrapping at either end.
  function showSibling(step) {
    setPreviewIndex((index) => (index + step + visiblePhotos.length) % visiblePhotos.length)
  }

  function closePreview() {
    previewRef.current.close()
  }

  return (
    <div className="gallery-page">
      <title>Gallery - Brad&apos;s Bees</title>

      <section className="gallery-hero">
        <h1>Brad&apos;s Gallery</h1>
        <p>
          A visual journey through the world of beekeeping, honey production, and the beauty of
          nature&apos;s pollinators
        </p>
      </section>

      {/* Honeycomb background behind the filters and photos, lined up with the header's hexagon edge */}
      <div className="gallery-body">
        <div className="gallery-filters">
          <Tabs
            filters
            label="Filter photos"
            tabs={filters}
            activeId={activeFilter}
            onChange={setActiveFilter}
            className="gallery-tabs"
          />
        </div>

        <section className="gallery-grid" aria-label="Photo gallery">
          {visiblePhotos.map((photo, index) => (
            <figure key={photo.id} className="gallery-item">
              <button
                type="button"
                className="gallery-item-button"
                onClick={() => openPreview(index)}
                aria-label={`Preview ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <span className="gallery-item-hint" aria-hidden="true">
                  Click to preview
                </span>
              </button>
            </figure>
          ))}
          {visiblePhotos.length === 0 && (
            <p className="gallery-empty">No {activeFilter.toLowerCase()} photos yet.</p>
          )}
        </section>
      </div>

      <dialog
        ref={previewRef}
        className="gallery-preview"
        aria-label="Photo preview"
        onClose={() => setPreviewIndex(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') showSibling(-1)
          if (event.key === 'ArrowRight') showSibling(1)
        }}
        onClick={(event) => {
          // Clicking the dark backdrop (the dialog itself) closes the preview.
          if (event.target === event.currentTarget) closePreview()
        }}
      >
        {previewPhoto && (
          <div className="gallery-preview-content">
            <button
              type="button"
              className="gallery-preview-close"
              onClick={closePreview}
              aria-label="Close preview"
            >
              &times;
            </button>

            <div className="gallery-preview-stage">
              {/* key restarts the fade-in each time the photo changes */}
              <img key={previewPhoto.id} src={previewPhoto.src} alt={previewPhoto.alt} />

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-preview-nav is-prev"
                    onClick={() => showSibling(-1)}
                    aria-label="Previous photo"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    className="gallery-preview-nav is-next"
                    onClick={() => showSibling(1)}
                    aria-label="Next photo"
                  >
                    &#8250;
                  </button>
                </>
              )}
            </div>

            <div className="gallery-preview-footer">
              <span className="gallery-preview-category">{previewPhoto.category}</span>
              <span className="gallery-preview-count">
                {previewIndex + 1} of {visiblePhotos.length}
              </span>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
