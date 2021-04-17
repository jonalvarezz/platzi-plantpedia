import { Block } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Typography } from '@ui/Typography'

type ExcerptProps = {
  richText: RichText
  limit?: number
}

const LIMIT = 180

export const Excerpt = ({ richText, limit = LIMIT }: ExcerptProps) => {
  const plainText = documentToPlainTextString((richText as unknown) as Block)

  return (
    <Typography variant="body1">
      {plainText.slice(0, limit)}
      <span>...</span>
    </Typography>
  )
}
