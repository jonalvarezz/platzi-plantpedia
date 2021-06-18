import clsx from 'clsx'

import { Typography } from '@ui/Typography'

export type CommentProps = {
  name?: string
  imageUrl?: string
  className?: string
  text: string
}

export function Comment(props: CommentProps) {
  const image = props.imageUrl ?? 'platzi.png'
  const name = props.name ?? 'Platzi student'

  return (
    <article className="p-6 border-t-2 border-gray-300 flex">
      <figure
        className={clsx(
          'inline-block rounded-full mr-4 overflow-hidden flex-shrink-0 mt-2',
          props.className
        )}
        style={{ maxWidth: 42, maxHeight: 42, padding: 3 }}
      >
        <img alt={name} src={image} width={42} />
      </figure>
      <div>
        <header className="mb-2">
          <Typography variant="h6">{name}</Typography>
        </header>
        <div dangerouslySetInnerHTML={{ __html: props.text }} />
      </div>
    </article>
  )
}
