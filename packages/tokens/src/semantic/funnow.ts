import { colors } from '@/generated/funnow/theme.config'

// Interim until token-transformer emits semantic tokens. Names follow the Figma
// paths in the comments so replacing this file with generated output stays mechanical.
export const semanticColors = {
  primary: colors.orange[50], // fn-color.Background.-primary_O50
  'primary-hover': colors.orange[60], // fn-color.Background.-primary_O60
  'primary-pressed': colors.orange[70], // fn-color.Button.Background.filledbtn.-primary_click
  'on-color': colors.gray[10], // gl-color.Text.-on_color
  'text-default': colors.black[50], // gl-color.Text.-default
  'text-helper': colors.gray[80], // gl-color.Text.-helper
  'text-placeholder': colors.gray[60], // gl-color.Text.-placeholder
  'text-disabled': colors.gray[60], // gl-color.Text.t-disable
  'outline-container': colors.gray[50], // gl-color.Outline.-container
  'outline-divider': colors.gray[40], // gl-color.Outline.-divider
} as const
