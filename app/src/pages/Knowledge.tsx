import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRegisterBackHandler } from '../context/BackNavigationContext'
import FabricKnowledge from '../components/FabricKnowledge'
import KnowledgeQuizDialog from '../components/KnowledgeQuizDialog'
import KnowledgeQuizSection from '../components/KnowledgeQuizSection'
import KnowledgeNav from '../components/KnowledgeNav'
import { KNOWLEDGE_QUIZ_TAB_KEYS } from '../constants/knowledgeNav'
import type { QuizSource } from '../types/quiz'
import type { QuizSession } from '../types/quizSession'
import ProductKnowledge from '../components/ProductKnowledge'
import ManagerTraining from '../components/ManagerTraining'
import ManagementSystem from '../components/ManagementSystem'
import StoreImageSystem from '../components/StoreImageSystem'
import BrandIntroSystem from '../components/BrandIntroSystem'
import SalesScriptSystem from '../components/SalesScriptSystem'
import NewStaffSystem from '../components/NewStaffSystem'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Knowledge() {
  useDocumentTitle('知识管理')
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<string>('fabric')
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null)
  const [quizRefresh, setQuizRefresh] = useState(0)
  const [quizHighlight, setQuizHighlight] = useState(false)
  const [sectionTagReset, setSectionTagReset] = useState(0)
  const [initialFabricId, setInitialFabricId] = useState<number | undefined>()
  const [initialProductId, setInitialProductId] = useState<number | undefined>()

  const showQuizEntry = KNOWLEDGE_QUIZ_TAB_KEYS.has(activeTab)
  const quizSource: QuizSource = activeTab === 'product' ? 'product' : 'fabric'

  const locationState = location.state as {
    openQuiz?: QuizSource
    tab?: string
    albumId?: string
    docId?: string
    fabricId?: number
    productId?: number
    quizTagKey?: string
    quizModuleKey?: string
    autoStartQuiz?: boolean
  } | null

  const quizTagKey = locationState?.quizTagKey
  const quizModuleKey = locationState?.quizModuleKey
  const autoStartQuiz = locationState?.autoStartQuiz

  useRegisterBackHandler('knowledge-quiz', quizOpen, () => {
    setQuizOpen(false)
    setQuizSession(null)
  })

  const storeAlbumId = locationState?.albumId
  const storeDocId = locationState?.docId

  useEffect(() => {
    if (!locationState) return

    if (locationState.tab) {
      setActiveTab(locationState.tab)
    }
    if (locationState.fabricId != null) {
      setActiveTab('fabric')
      setInitialFabricId(locationState.fabricId)
    }
    if (locationState.productId != null) {
      setActiveTab('product')
      setInitialProductId(locationState.productId)
    }
    if (locationState.openQuiz) {
      setActiveTab(locationState.openQuiz === 'product' ? 'product' : 'fabric')
      setQuizHighlight(true)
      requestAnimationFrame(() => {
        document.getElementById('knowledge-quiz-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
      const t = window.setTimeout(() => setQuizHighlight(false), 2500)
      window.history.replaceState({}, document.title)
      return () => window.clearTimeout(t)
    }
    if (
      locationState.tab ||
      locationState.albumId ||
      locationState.fabricId != null ||
      locationState.productId != null ||
      locationState.quizTagKey
    ) {
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    setQuizOpen(false)
    setQuizSession(null)
  }, [activeTab])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    setInitialFabricId(undefined)
    setInitialProductId(undefined)
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-4">
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-[#262626]">知识管理</h1>
        <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">产品资料与培训话术一站式查阅</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <KnowledgeNav activeTab={activeTab} onTabChange={handleTabChange} />

        <div
          className={`flex-1 min-w-0 w-full flex flex-col ${
            showQuizEntry
              ? 'md:min-h-[calc(100dvh-10.5rem)] md:max-h-[calc(100dvh-10.5rem)]'
              : ''
          }`}
        >
          {showQuizEntry && (
            <KnowledgeQuizSection
              key={`${quizSource}-${sectionTagReset}-${quizTagKey ?? ''}-${quizModuleKey ?? ''}`}
              variant={quizSource}
              refreshKey={quizRefresh}
              highlight={quizHighlight}
              defaultCollapsed
              initialTagKey={quizTagKey}
              initialModuleKey={quizModuleKey}
              autoStartQuiz={autoStartQuiz}
              onStartQuiz={(session) => {
                setQuizSession(session)
                setQuizOpen(true)
              }}
            />
          )}

          <KnowledgeQuizDialog
            open={quizOpen}
            onOpenChange={(open) => {
              setQuizOpen(open)
              if (!open) setQuizSession(null)
            }}
            variant={quizSource}
            session={quizSession}
            onAttemptSaved={() => setQuizRefresh((n) => n + 1)}
            onContinueModules={() => setQuizSession(null)}
            onChangeTag={() => {
              setQuizSession(null)
              setSectionTagReset((n) => n + 1)
            }}
          />

          <div className={showQuizEntry ? 'flex-1 min-h-0 flex flex-col mt-2' : 'mt-0'}>
            {activeTab === 'fabric' && (
              <FabricKnowledge
                className={showQuizEntry ? 'flex-1 min-h-0' : ''}
                initialFabricId={initialFabricId}
              />
            )}
            {activeTab === 'product' && (
              <ProductKnowledge
                className={showQuizEntry ? 'flex-1 min-h-0' : ''}
                initialProductId={initialProductId}
              />
            )}
            {activeTab === 'manager' && <ManagerTraining />}
            {activeTab === 'store-image' && (
              <StoreImageSystem initialAlbumId={storeAlbumId} initialDocId={storeDocId} />
            )}
            {activeTab === 'management' && <ManagementSystem />}
            {activeTab === 'brand' && <BrandIntroSystem />}
            {activeTab === 'sales' && <SalesScriptSystem />}
            {activeTab === 'new-staff' && <NewStaffSystem />}
          </div>
        </div>
      </div>
    </div>
  )
}
