import { NextApiHandler } from 'next'
import { getPlant } from '@api'

const enablePreview: NextApiHandler = async (req, res) => {
  const slug = req.query.slug
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.PREVIEW_SECRET ||
    typeof slug !== 'string' ||
    slug == ''
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Fetch the headless CMS to check if the provided `slug` exists
    const plant = await getPlant(slug, true)

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // Redirect to the path from the fetched plant
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(`/entry/${plant.slug}`)
  } catch {
    return res.status(401).json({ message: 'Invalid slug' })
  }
}

export default enablePreview
