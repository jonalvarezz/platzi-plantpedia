import Link from 'next/link'
import { Typography } from '@ui/Typography'

type HeroProps = Plant & { className?: string }

export function Hero({ plantName, slug, image, className }: HeroProps) {
  return (
    <div className={className}>
      <div className="relative text-center">
        <div className="opacity-60 inline-block">
          <img src={image.url} width={600} />
        </div>
        <div className="text-container absolute">
          <Link href={`/entry/${slug}`}>
            <a title={`Go to ${plantName}`}>
              <Typography
                variant="h1"
                component="h2"
                className="break-words text-left text-6xl sm:text-8xl"
              >
                {plantName}
              </Typography>
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .text-container {
          top: 50%;
          transform: translateY(-50%);
          max-width: 400px;
          left: 3vh;
        }

        @media screen and (min-width: 600px) {
          .text-container {
            max-width: 600px;
            left: 10vh;
          }
        }

        @media screen and (min-width: 1300px) {
          .text-container {
            max-width: 600px;
            left: 15vh;
          }
        }
      `}</style>
    </div>
  )
}
