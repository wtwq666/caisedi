import { knowledgeNavGroups, knowledgeTabs } from '../constants/knowledgeNav'

type Props = {
  activeTab: string
  onTabChange: (key: string) => void
  fillHeight?: boolean
}

export default function KnowledgeNav({ activeTab, onTabChange, fillHeight = false }: Props) {
  return (
    <nav
      className={`w-full md:w-[188px] shrink-0 ${fillHeight ? 'md:h-full md:min-h-0' : ''}`}
      aria-label="知识管理分类"
    >
      {/* 手机：横向滑动 Tab */}
      <div className="md:hidden knowledge-nav-sticky bg-white border border-[#F0F0F0] overflow-hidden sticky top-14 z-30">
        <div className="overflow-x-auto overscroll-x-contain scrollbar-none">
          <div className="flex gap-1.5 p-2.5 min-w-max">
            {knowledgeTabs.map((tab) => {
              const active = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onTabChange(tab.key)}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-tab-btn shrink-0 rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors min-h-[40px] ${
                    active
                      ? 'bg-[#E6F7FF] text-primary font-medium'
                      : 'text-[#595959] bg-[#F5F5F5] hover:bg-[#E6F7FF]/60'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 桌面：分组侧栏 */}
      <div
        className={`hidden md:block bg-white rounded-lg border border-[#F0F0F0] overflow-hidden ${
          fillHeight ? 'h-full flex flex-col min-h-0' : ''
        }`}
      >
        <div className={fillHeight ? 'flex-1 min-h-0 overflow-y-auto overscroll-contain' : ''}>
        {knowledgeNavGroups.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? 'border-t border-[#F0F0F0]' : ''}>
            <div className="px-3 py-2 text-[10px] font-medium text-[#8C8C8C] uppercase tracking-wider bg-[#FAFAFA]">
              {group.label}
            </div>
            <ul className="p-1.5 space-y-0.5">
              {group.tabs.map((tab) => {
                const active = activeTab === tab.key
                return (
                  <li key={tab.key}>
                    <button
                      type="button"
                      onClick={() => onTabChange(tab.key)}
                      aria-current={active ? 'page' : undefined}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors border-l-[3px] ${
                        active
                          ? 'bg-[#E6F7FF] text-primary border-primary font-medium'
                          : 'text-[#595959] border-transparent hover:bg-[#F5F5F5]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </nav>
  )
}
