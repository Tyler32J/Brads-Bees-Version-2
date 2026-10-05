// Every image in src/assets/gallery/ is picked up automatically. To add a
// photo, drop a file named gallery-NN.webp into that folder.
const images = import.meta.glob('../assets/gallery/*.webp', { eager: true, import: 'default' })

export const galleryCategories = ['Beekeeping', 'Honey', 'Education']

// Photos are Beekeeping unless listed here by file number (gallery-NN.webp).
const photoCategories = {
  5: 'Honey',
  7: 'Honey',
  14: 'Education',
  15: 'Education',
  23: 'Honey',
  24: 'Honey',
}

export const galleryPhotos = Object.entries(images)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src], index) => ({
    id: index + 1,
    src,
    alt: `Brad's Bees gallery photo ${index + 1}`,
    category: photoCategories[index + 1] ?? 'Beekeeping',
  }))
