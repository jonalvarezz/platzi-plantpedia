import Head from 'next/head'
import { Button } from '../ui/Button'
import { Typography } from '../ui/Typography'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button variant="contained" color="primary">
        I'm a button
      </Button>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur,
        voluptate necessitatibus. Nobis consequuntur possimus quam rerum neque
        enim ut quas, quod maxime dolorum tempora velit iure ipsa aspernatur
        blanditiis doloremque.
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur,
        voluptate necessitatibus. Nobis consequuntur possimus quam rerum neque
        enim ut quas, quod maxime dolorum tempora velit iure ipsa aspernatur
        blanditiis doloremque.
      </Typography>
    </div>
  )
}
