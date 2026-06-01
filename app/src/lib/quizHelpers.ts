import type { QuizOption, QuizQuestion } from '../types/quiz'

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function truncate(text: string, max = 96): string {
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length <= max ? t : `${t.slice(0, max)}…`
}

export function buildMcq(
  id: string,
  fields: Pick<
    QuizQuestion,
    'source' | 'tagKey' | 'tagLabel' | 'moduleKey' | 'moduleLabel' | 'topic' | 'prompt'
  > &
    Partial<Pick<QuizQuestion, 'imageUrl' | 'reveal' | 'multiSelect'>>,
  correct: string,
  pool: string[],
): QuizQuestion | null {
  if (!correct?.trim()) return null
  const keys = ['A', 'B', 'C', 'D']
  const correctLabel = truncate(correct, 120)
  const distractorLabels = shuffle(pool.filter((v) => v && v !== correct))
    .slice(0, 3)
    .map((d) => truncate(d, 120))
  const labels = shuffle([correctLabel, ...distractorLabels]).slice(0, 4)
  const correctIndex = labels.indexOf(correctLabel)
  if (correctIndex < 0) return null
  const options: QuizOption[] = labels.map((label, i) => ({
    key: keys[i],
    label,
  }))
  const correctKey = keys[correctIndex]

  return {
    id,
    source: fields.source,
    tagKey: fields.tagKey,
    tagLabel: fields.tagLabel,
    moduleKey: fields.moduleKey,
    moduleLabel: fields.moduleLabel,
    topic: fields.topic,
    prompt: fields.prompt,
    options,
    correctKeys: [correctKey],
    multiSelect: fields.multiSelect ?? false,
    imageUrl: fields.imageUrl,
    reveal: fields.reveal,
  }
}

/** 按知识模块轮询抽题，尽量覆盖各板块 */
export function pickBalancedByModule(pool: QuizQuestion[], count: number): QuizQuestion[] {
  if (pool.length === 0) return []

  const byModule = new Map<string, QuizQuestion[]>()
  for (const q of pool) {
    const list = byModule.get(q.moduleKey) ?? []
    list.push(q)
    byModule.set(q.moduleKey, list)
  }

  const moduleKeys = shuffle([...byModule.keys()])
  const picked: QuizQuestion[] = []
  const pickedIds = new Set<string>()

  let round = 0
  while (picked.length < count && round < 40) {
    let added = false
    for (const mk of moduleKeys) {
      if (picked.length >= count) break
      const candidates = shuffle(byModule.get(mk) ?? []).filter((q) => !pickedIds.has(q.id))
      if (candidates[0]) {
        picked.push(candidates[0])
        pickedIds.add(candidates[0].id)
        added = true
      }
    }
    if (!added) break
    round++
  }

  if (picked.length < count) {
    const rest = shuffle(pool.filter((q) => !pickedIds.has(q.id)))
    for (const q of rest) {
      if (picked.length >= count) break
      picked.push(q)
      pickedIds.add(q.id)
    }
  }

  return picked.slice(0, count)
}

export function groupPoolByModule(pool: QuizQuestion[]) {
  const map = new Map<string, { label: string; count: number }>()
  for (const q of pool) {
    const cur = map.get(q.moduleKey)
    if (cur) cur.count++
    else map.set(q.moduleKey, { label: q.moduleLabel, count: 1 })
  }
  return map
}
