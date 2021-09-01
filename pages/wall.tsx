import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { AccessDenied } from '@components/AccessDenied'
import { Comment, CommentProps } from '@components/Wall/Comment'
import { Editor } from '@components/Wall/Editor'

import { getSession, useSession } from '@auth/client'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)
  const i18n = await serverSideTranslations(context.locale!)

  if (session == null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session, ...i18n },
  }
}

type Story = Pick<CommentProps, 'name' | 'imageUrl' | 'text'> & { id: string }

export default function WallPage() {
  const [session] = useSession()
  const [stories, setStories] = useState<Story[]>([])
  const { t } = useTranslation(['page-wall'])

  const addStory = (text: string) => {
    const message = text.trim()

    if (message.length < 1) {
      return
    }

    const newStory: Story = {
      id: new Date().getTime().toString(),
      name: session?.user?.name || '',
      imageUrl: session?.user?.image || '',
      text: message,
    }

    setStories((previousStories) => [newStory, ...previousStories])
  }

  if (session == null) {
    return <AccessDenied />
  }

  return (
    <Layout title={t('wall')}>
      <div className="text-center pb-6">
        <Typography variant="h2">{t('wall')}</Typography>
        <div className="max-w-5xl mx-auto mb-6 mt-4">
          <Editor onSubmit={addStory} />
        </div>
      </div>
      <section className="">
        {stories.map(({ id, ...storyProps }) => (
          <Comment key={id} {...storyProps} />
        ))}
        <Comment
          className="bg-pink-700"
          text="This man is a knight in shining armor. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they'll be."
        />
        <Comment
          className="bg-indigo-700"
          text="Itaque quisquam dolores voluptates. Aut molestiae voluptates asperiores sequi et facere itaque porro doloribus!"
        />
        <Comment
          className="bg-purple-600"
          text="You hit me with a cricket bat. Stop talking, brain thinking. Hush. I'm the Doctor. Well, they call me the Doctor. I don't know why. I call me the Doctor too. I still don't know why. I am the Doctor, and you are the Daleks!"
        />
      </section>
    </Layout>
  )
}
