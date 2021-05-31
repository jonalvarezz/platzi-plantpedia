import clsx from 'clsx'
import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={clsx(
        'pt-20 pb-6 bg-black text-gray-300 overflow-hidden',
        className
      )}
    >
      <div className="max-w-screen-xl mx-auto w-95">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={5}
            className="text-center sm:text-left relative"
          >
            <PlantpediaLogo />
            <Typography variant="h5" component="a" href="/" title="Go home">
              Platzi's Plantpedia
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h5" className="mb-4">
              Pages
            </Typography>
            <ul className="p0">
              <li className="pb-1">
                <a href="/getting-started">Getting started</a>
              </li>
              <li className="pb-1">
                <a href="/search">Search</a>
              </li>
              <li className="pb-1">
                <a href="/top-stories">Top stories</a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" className="mb-4">
              About
            </Typography>
            <p>
              <a href="https://platzi.com/">Platzi's Next.js Course by</a>{' '}
              <a href="https://twitter.com/jonalvarezz">@jonalvarezz</a>
            </p>
            <div className="mt-3">
              <a
                href="https://twitter.com/jonalvarezz"
                title="Follow @jonalvarezz on Twitter"
                className="pr-4"
              >
                TW
              </a>
              <a
                href="https://github.com/jonalvarezz"
                title="Open this project on GitHub"
              >
                GH
              </a>
            </div>
          </Grid>
        </Grid>
        <div className="mt-20 border-t-2 border-gray-600 text-gray-600 pt-6 flex justify-between">
          <p>
            Images from
            <a target="_blank" href="https://www.pexels.com" title="Pexels">
              Pexels
            </a>
          </p>
          <p>
            <a target="_blank" href="https://jonalvarezz.com">
              jonalvarezz.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function PlantpediaLogo() {
  return (
    <>
      <div className="absolute" />
      <style jsx>
        {`
          div {
            width: 205px;
            height: 216px;
            background: url(/leaf.png) center center no-repeat;
            opacity: 0.2;
            bottom: 0;
            left: -40px;
            transform: rotate(120deg);
          }

          @media screen and (min-width: 600px) {
            div {
              bottom: 17px;
            }
          }
        `}
      </style>
    </>
  )
}
