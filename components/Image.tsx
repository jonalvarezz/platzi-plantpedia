import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image'

type ImageProps = {
  width: number
  height?: never
  layout: ImageLayout
  aspectRatio: AspectRatio
  fit?: ImageFit
} & DistributiveOmit<NextImageProps, 'height'>

export function Image({
  width,
  fit = 'fill',
  aspectRatio,
  ...nextImageProps
}: ImageProps) {
  const height = calcAspectRatio(aspectRatio, width)

  const imageLoader = (loaderArgs: ImageLoaderProps) => {
    const h = calcAspectRatio(aspectRatio, loaderArgs.width)

    return `${loaderArgs.src}?w=${loaderArgs.width}&h=${h}&fit=${fit}`
  }

  return (
    <NextImage
      {...nextImageProps}
      width={width}
      height={height}
      loader={imageLoader}
    />
  )
}

export type ImageFit = 'pad' | 'fill' | 'scale' | 'crop' | 'thumb'

export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:2' | '9:16'

// Next.js sadly don't export it
export type ImageLayout = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

// https://davidgomes.com/pick-omit-over-union-types-in-typescript/
type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

function calcAspectRatio(aspectRatio: AspectRatio, width: number): number {
  if (aspectRatio === '16:9') return width * (9 / 16)
  if (aspectRatio === '4:3') return width * (3 / 4)
  if (aspectRatio === '3:2') return width * (2 / 3)
  if (aspectRatio === '9:16') return width * (16 / 9)

  return width // 1:1
}
