import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AccessActions, useAccessGrants } from '@features/access-management'
import { Icon } from '@shared/ui'
import { apiErrorTranslationKey } from '@shared/api'

type StatusFilter = 'all' | 'active' | 'blocked'

const filterDot: Record<StatusFilter, string> = {
  all: 'bg-ink-500',
  active: 'bg-emerald-500',
  blocked: 'bg-red-500',
}

const filterOptions = ['all', 'active', 'blocked'] as const satisfies readonly StatusFilter[]

export function AccessTable() {
  const { t, i18n } = useTranslation()
  const query = useAccessGrants()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => Date.now())
  const filterRef = useRef<HTMLDivElement>(null)
  const dateTimeFormat = useMemo(
    () => new Intl.DateTimeFormat(i18n.resolvedLanguage === 'en' ? 'en-GB' : 'ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    [i18n.resolvedLanguage],
  )

  useEffect(() => {
    if (!filterOpen) return

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !filterRef.current?.contains(event.target)) setFilterOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilterOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [filterOpen])

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 15_000)
    return () => window.clearInterval(timer)
  }, [])

  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return (query.data?.grants ?? []).filter((grant) => {
      const active = grant.enabled && new Date(grant.expiresAt).getTime() > currentTime
      const matchesStatus = filter === 'all' || (filter === 'active' ? active : !active)
      const matchesSearch = !needle || grant.username.includes(needle) || grant.phone.includes(needle) || String(grant.linkedUserId ?? '').includes(needle)
      return matchesStatus && matchesSearch
    })
  }, [currentTime, filter, query.data, search])

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(16,29,26,0.045)]">
      <header className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-ink-950">{t('table.title')}</h2>
          <p className="mt-1 text-sm text-ink-500">{t('table.description')}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-brand-500 sm:w-64" placeholder={t('table.search')} />
          </label>
          <div className="relative" ref={filterRef}>
            <button type="button" className={`flex h-10 w-full items-center gap-2 rounded-xl border bg-white px-3 text-sm font-bold text-ink-700 outline-none transition sm:w-[170px] ${filterOpen ? 'border-brand-500 ring-4 ring-brand-100' : 'border-slate-200 hover:border-slate-300'}`} onClick={() => setFilterOpen((open) => !open)} aria-haspopup="listbox" aria-expanded={filterOpen} aria-controls="access-status-filter">
              <span className={`h-2 w-2 rounded-full ${filterDot[filter]}`} />
              <span>{t(`common.${filter}`)}</span>
              <Icon name="chevronDown" className={`ml-auto h-4 w-4 text-ink-500 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <div id="access-status-filter" className="absolute right-0 top-[calc(100%+8px)] z-30 w-full min-w-[190px] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(16,29,26,0.16)]" role="listbox" aria-label={t('table.status')}>
                {filterOptions.map((option) => (
                  <button key={option} type="button" className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${filter === option ? 'bg-brand-100 text-brand-600' : 'text-ink-700 hover:bg-slate-50'}`} onClick={() => { setFilter(option); setFilterOpen(false) }} role="option" aria-selected={filter === option}>
                    <span className={`h-2 w-2 rounded-full ${filterDot[option]}`} />
                    <span>{t(`common.${option}`)}</span>
                    {filter === option && <Icon name="check" className="ml-auto h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => query.refetch()} title={t('common.refresh')} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-ink-500 transition hover:bg-slate-50"><Icon name="refresh" className={`h-4 w-4 ${query.isFetching ? 'animate-spin' : ''}`} /></button>
        </div>
      </header>

      {query.error ? (
        <div className="m-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">{t(apiErrorTranslationKey(query.error))}</div>
      ) : query.isLoading ? (
        <div className="space-y-3 p-5">{[1, 2, 3, 4].map((item) => <div key={item} className="h-16 animate-pulse rounded-xl bg-slate-50" />)}</div>
      ) : rows.length === 0 ? (
        <div className="grid place-items-center px-5 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Icon name="users" className="h-6 w-6" /></div>
          <p className="mt-4 font-extrabold text-ink-950">{t('table.emptyTitle')}</p>
          <p className="mt-1 text-sm text-ink-500">{t('table.emptyHint')}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-left">
            <thead><tr className="bg-slate-50/80 text-xs font-bold uppercase tracking-[0.08em] text-ink-500"><th className="px-5 py-3">{t('table.username')}</th><th className="px-5 py-3">{t('table.phone')}</th><th className="px-5 py-3">{t('table.verification')}</th><th className="px-5 py-3">{t('table.status')}</th><th className="px-5 py-3">{t('table.created')}</th><th className="px-5 py-3">{t('table.expires')}</th><th className="px-5 py-3 text-right">{t('table.actions')}</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((grant) => {
                const active = grant.enabled && new Date(grant.expiresAt).getTime() > currentTime
                return <tr key={grant.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon name="at" className="h-4 w-4" /></div><div><p className="font-extrabold text-ink-950">@{grant.username}</p><p className="text-xs text-ink-500">ID: {grant.id.slice(-6).toUpperCase()}</p></div></div></td>
                  <td className="px-5 py-4"><p className="text-sm font-bold text-ink-700">+{grant.phone}</p></td>
                  <td className="px-5 py-4">{grant.linkedUserId ? <div><p className="text-sm font-bold text-emerald-700">{t('table.verified')}</p><p className="text-xs text-ink-500">{t('table.telegramId', { id: grant.linkedUserId })}</p></div> : <span className="text-sm text-ink-500">{t('table.waiting')}</span>}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}><span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-red-500'}`} />{active ? t('table.active') : t('table.blocked')}</span></td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-500">{dateTimeFormat.format(new Date(grant.createdAt))}</td>
                  <td className={`whitespace-nowrap px-5 py-4 text-sm font-bold ${active ? 'text-ink-700' : 'text-red-600'}`}>{dateTimeFormat.format(new Date(grant.expiresAt))}</td>
                  <td className="px-5 py-4"><AccessActions grant={grant} active={active} /></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
