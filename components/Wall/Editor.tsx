import { FormEventHandler, KeyboardEventHandler } from 'react'
import { useTranslation } from 'next-i18next'
import sanitizeHtml from 'sanitize-html'

import { Button } from '@ui/Button'
import { TextField } from '@ui/FormField'

type EditorOnSubmitHandler = (value: string, form: HTMLFormElement) => void

export type EditorProps = {
  onSubmit: EditorOnSubmitHandler
  resetOnSubmit?: boolean
}

export function Editor({
  resetOnSubmit = true,
  onSubmit: onSubmitCb,
}: EditorProps) {
  const { t } = useTranslation(['page-wall'])

  const onSubmit: EditorOnSubmitHandler = (value, form) => {
    if (resetOnSubmit) {
      form.reset()
    }

    const safeHtml = sanitizeHtml(value, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href', 'target'],
      },
    })

    onSubmitCb(safeHtml, form)
  }

  const shareStory: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmit(event.currentTarget.story.value, event.currentTarget)
  }

  const submitOnKeyDown: KeyboardEventHandler<HTMLFormElement> = ({
    key,
    metaKey,
    currentTarget,
  }) => {
    if (key === 'Enter' && metaKey) {
      onSubmit(currentTarget.story.value, currentTarget)
    }
  }

  return (
    <form onSubmit={shareStory} onKeyDown={submitOnKeyDown}>
      <TextField
        id="story-input"
        name="story"
        label={t('whatsUp')}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
      <Button variant="outlined" type="submit" className="mt-4">
        {t('share')}
      </Button>
    </form>
  )
}
