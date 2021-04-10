import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button'

export type ButtonProps = Exclude<MuiButtonProps, 'disableElevation'>

export const Button = ({
  variant = 'contained',
  color = 'primary',
  ...props
}: ButtonProps) => (
  <MuiButton {...props} variant={variant} color={color} disableElevation />
)
