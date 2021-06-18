import { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if (request.method !== 'POST') {
    // Not supported method
    response.status(405).end()
  }

  if (request.body.password === process.env.AUTH_PLATZI_SECRET) {
    // How about using another API to randomly generate user's and avatars? :)
    const platziUser: User = {
      name: 'Platzi student',
      email: 'student@platzi.com',
      image: 'platzi.png',
    }

    return response.status(200).json(platziUser)
  }

  // Auth failed
  response.status(401).end()
}

export default credentialsAuth
