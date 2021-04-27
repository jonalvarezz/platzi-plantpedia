import { NextApiHandler } from 'next'

const exitPreview: NextApiHandler = (_, res) => {
  // Exit the current user from "Preview Mode".
  res.clearPreviewData()

  // 307 (temporary) redirect to homepage
  res.redirect('/')
  res.end()
}

export default exitPreview
