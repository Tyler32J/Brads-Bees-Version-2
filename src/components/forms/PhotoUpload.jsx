import { useEffect, useRef, useState } from 'react'
import { Camera, X } from 'lucide-react'
import './PhotoUpload.css'

// Shows a chosen photo, making a temporary link to it and freeing it afterwards
function PhotoPreview({ file }) {
  const imgRef = useRef(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    imgRef.current.src = url
    return () => URL.revokeObjectURL(url)
  }, [file])

  return <img ref={imgRef} alt={file.name} />
}

// A large tap-or-drag area for adding photos, with previews of the chosen
// photos. New photos are added to the list rather than replacing it.
export default function PhotoUpload({ id, images, onChange }) {
  const [dragging, setDragging] = useState(false)

  function addFiles(fileList) {
    const incoming = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    if (incoming.length === 0) return
    // Skip photos that are already in the list
    const isNew = (file) =>
      !images.some((existing) => existing.name === file.name && existing.size === file.size)
    onChange([...images, ...incoming.filter(isNew)])
  }

  function removeAt(index) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="photo-upload">
      <input
        id={id}
        type="file"
        className="photo-upload-input"
        accept="image/*"
        multiple
        onChange={(e) => {
          addFiles(e.target.files ?? [])
          // Clear the input so the same photo can be picked again after removing it
          e.target.value = ''
        }}
      />
      <label
        htmlFor={id}
        className={`photo-upload-drop${dragging ? ' is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
      >
        <Camera className="photo-upload-icon" aria-hidden="true" />
        <span className="photo-upload-title">Tap to add photos of the bees</span>
        <span className="photo-upload-hint">or drag them here. Photos help Brad give a quick quote.</span>
      </label>

      {images.length > 0 && (
        <>
          <p className="photo-upload-count" aria-live="polite">
            {images.length} {images.length === 1 ? 'photo' : 'photos'} added
          </p>
          <ul className="photo-upload-list">
            {images.map((file, index) => (
              <li key={`${file.name}-${file.size}`} className="photo-upload-item">
                <PhotoPreview file={file} />
                <button
                  type="button"
                  className="photo-upload-remove"
                  onClick={() => removeAt(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
