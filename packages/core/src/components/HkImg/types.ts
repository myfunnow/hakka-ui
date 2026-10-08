import type { AspectRatio, CssLength } from '@myfunnow/hakka-shared'

// Props, slots and events follow Vuetify's v-img so a call site can swap one for the other.
// The comments on the props are shown in Storybook, so they are written for people who do not code.
export interface HkImgProps {
  /** Address of the image. Leave it empty to show the placeholder instead. */
  src: string
  /** Short text that describes the image. Screen readers read it, and it shows when the image cannot load. */
  alt?: string
  /** Fill the whole box and cut off what does not fit. By default the whole image is shown. */
  cover?: boolean
  /** Load the image right away. By default it loads when it comes close to the screen. */
  eager?: boolean
  /** Shape of the box: width divided by height, for example 1 (square) or 1.8. Without it, the box takes the shape of the image after it has loaded. */
  aspectRatio?: AspectRatio
  /** Width of the box. A number means pixels (320). Text is used as it is ("50%", "20rem"). */
  width?: CssLength
  /** Height of the box. A number means pixels (320). Text is used as it is ("50%", "20rem"). */
  height?: CssLength
  /** The box never gets wider than this. A number means pixels, text is used as it is. */
  maxWidth?: CssLength
  /** The box never gets taller than this. A number means pixels, text is used as it is. */
  maxHeight?: CssLength
  /** The box never gets narrower than this. A number means pixels, text is used as it is. */
  minWidth?: CssLength
  /** The box never gets shorter than this. A number means pixels, text is used as it is. */
  minHeight?: CssLength
  /** Which part of the image stays in view when it is cut off, for example "top" or "left center". */
  position?: string
  /** A color layer on top of the image. Write what goes inside the CSS linear-gradient(), for example: to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4) */
  gradient?: string
  /**
   * For an svg with one color: paint its shape with the text color, so a class such as "text-yellow-50" changes its color.
   * An svg inside an <img> cannot read the page's color, so the shape is used as a CSS mask instead.
   */
  inheritColor?: boolean
  /** Shape of the box while there is nothing to show (no src, or the image failed), so the page does not jump. Same values as aspectRatio. */
  fallbackAspectRatio?: AspectRatio
  /** Fade the image in after it has loaded. On by default; use :fade-in="false" to turn it off. Images already in the server-rendered page are shown at once, with no fade. */
  fadeIn?: boolean
}

export interface HkImgEmits {
  (event: 'load', src: string): void
  (event: 'error', src: string): void
}

export interface HkImgSlots {
  /** Shown until the image has loaded, and when there is no src. */
  placeholder?(): unknown
  /** Replaces the image when it fails to load. */
  error?(): unknown
  /** Content on top of the image. */
  default?(): unknown
}
