import { getFabricCategoryTag } from '../constants/fabricCategoryTaxonomy'
import type { FabricData } from '../types/fabric'
import type { QuizQuestion } from '../types/quiz'

const OPTION_RE = /^([A-D])[\.\．、]\s*(.+)$/
const ANSWER_RE = /^答案[：:]\s*(.+)$/i

function parseAnswerKeys(raw: string): string[] {
  return raw
    .replace(/[、,，\s]/g, ' ')
    .split(' ')
    .map((s) => s.trim().toUpperCase())
    .filter((k) => /^[A-D]$/.test(k))
}

/** 仅解析「课后测试」原文（由 buildFabricQuizzes 打上模块标签） */
export function parseFabricQuizText(
  fabric: Pick<FabricData, 'fabricCode' | 'fabricName' | 'quizzes' | 'id' | 'category'>,
): QuizQuestion[] {
  const text = fabric.quizzes?.trim()
  if (!text) return []

  const blocks = text.split(/\n(?=\d+\.\s*)/).filter((b) => b.trim())
  const questions: QuizQuestion[] = []

  blocks.forEach((block, blockIndex) => {
    const lines = block
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    let prompt = ''
    const options: QuizQuestion['options'] = []
    let correctKeys: string[] = []

    for (const line of lines) {
      const optionMatch = line.match(OPTION_RE)
      if (optionMatch) {
        options.push({ key: optionMatch[1], label: optionMatch[2].trim() })
        continue
      }

      const answerMatch = line.match(ANSWER_RE)
      if (answerMatch) {
        correctKeys = parseAnswerKeys(answerMatch[1])
        continue
      }

      if (!prompt) {
        prompt = line.replace(/^\d+\.\s*/, '').trim()
      }
    }

    if (!prompt || options.length < 2 || correctKeys.length === 0) return

    const validKeys = new Set(options.map((o) => o.key))
    correctKeys = correctKeys.filter((k) => validKeys.has(k))
    if (correctKeys.length === 0) return

    const multiSelect = /多选/.test(prompt) || correctKeys.length > 1

    const { tagKey, tagLabel } = getFabricCategoryTag(fabric)
    questions.push({
      id: `fabric-quiz-${fabric.fabricCode}-${blockIndex}`,
      source: 'fabric',
      tagKey,
      tagLabel,
      moduleKey: 'quizzes',
      moduleLabel: '课后测试',
      topic: fabric.fabricName,
      prompt,
      options,
      correctKeys,
      multiSelect,
      origin: 'author',
    })
  })

  if (import.meta.env.DEV && blocks.length > 0 && questions.length === 0) {
    console.warn(`[quiz] 课后习题解析失败: ${fabric.fabricCode} ${fabric.fabricName}`)
  }

  return questions
}
