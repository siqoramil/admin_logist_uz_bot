import { useTranslation } from 'react-i18next'
import type { AccessGrant } from '@entities/access-grant'
import { Icon } from '@shared/ui'
import { apiErrorTranslationKey } from '@shared/api'
import { useDeleteAccess, useToggleAccess } from '../api/access-queries'

interface AccessActionsProps {
  grant: AccessGrant
  active: boolean
}

export function AccessActions({ grant, active }: AccessActionsProps) {
  const { t } = useTranslation()
  const toggle = useToggleAccess()
  const remove = useDeleteAccess()

  const deleteGrant = () => {
    if (window.confirm(t('actions.deleteConfirm', { username: grant.username }))) remove.mutate(grant.id)
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center justify-end gap-2">
        <button onClick={() => toggle.mutate({ id: grant.id, enabled: !active })} disabled={toggle.isPending} title={active ? t('actions.block') : t('actions.activate')} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-ink-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40">
          <Icon name={active ? 'pause' : 'play'} className="h-4 w-4" />
        </button>
        <button onClick={deleteGrant} disabled={remove.isPending} title={t('actions.delete')} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-ink-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-40">
          <Icon name="trash" className="h-4 w-4" />
        </button>
      </div>
      {(toggle.error || remove.error) && <p className="max-w-64 text-right text-xs font-semibold text-red-600" role="alert">{t(apiErrorTranslationKey(toggle.error ?? remove.error))}</p>}
    </div>
  )
}
