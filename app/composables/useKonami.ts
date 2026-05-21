const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export const useKonami = () => {
  const unlocked = useState('konami-unlocked', () => false)
  const progress = ref<string[]>([])

  function onKey(e: KeyboardEvent) {
    const expected = KONAMI[progress.value.length]
    if (e.key === expected) {
      progress.value.push(e.key)
      if (progress.value.length === KONAMI.length) {
        unlocked.value = true
      }
    } else {
      progress.value = e.key === KONAMI[0] ? [e.key] : []
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
  })

  return { unlocked }
}
