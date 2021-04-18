import { Block } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Typography, TypographyProps } from '@ui/Typography'

type ExcerptProps = {
  richText: RichText
  limit?: number
} & Pick<TypographyProps, 'color' | 'className'>

const LIMIT = 180

export const Excerpt = ({
  richText,
  limit = LIMIT,
  ...typographyProps
}: ExcerptProps) => {
  const plainText = documentToPlainTextString((richText as unknown) as Block)
  const excerpt = plainText.slice(0, limit).split(' ').slice(0, -1).join(' ')

  return (
    <Typography variant="body1" {...typographyProps}>
      {excerpt}
      <span> (...)</span>
    </Typography>
  )
}
