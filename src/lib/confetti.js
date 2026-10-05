import confetti from 'canvas-confetti'

export function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#d98500', '#27ae60', '#ffd166', '#ffffff', '#7dd3fc'],
  })
}
