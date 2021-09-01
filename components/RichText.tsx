import { BLOCKS, Document } from '@contentful/rich-text-types'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { Typography } from '@ui/Typography'

type RichTextProps = {
  richText: RichText
  className?: string
}

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: function Paragraph(_, children) {
      return (
        <Typography variant="body1" gutterBottom color="textSecondary">
          {children}
        </Typography>
      )
    },
  },
}

export const RichText = ({ richText, className }: RichTextProps) => {
  return (
    <div className={className}>
      {documentToReactComponents(richText as unknown as Document, options)}
    </div>
  )
}
