<template>
  <div class="hk-img" :style="rootStyle">
    <picture v-if="src && !isFailed" class="hk-img__layer">
      <source v-if="webpSrc" :srcset="webpSrc" type="image/webp" />
      <img
        ref="img"
        class="hk-img__layer hk-img__image"
        :class="{ 'hk-img__image--cover': cover }"
        :src="src"
        :alt="alt"
        :loading="eager ? 'eager' : 'lazy'"
        :style="{ objectPosition: position }"
        @load="handleLoad"
        @error="handleError"
      />
    </picture>
    <div v-if="gradient" class="hk-img__layer hk-img__gradient" :style="{ backgroundImage: `linear-gradient(${gradient})` }" />
    <div v-if="$slots.placeholder && !isLoaded && !isFailed" class="hk-img__layer">
      <slot name="placeholder" />
    </div>
    <div v-if="$slots.error && isFailed" class="hk-img__layer">
      <slot name="error" />
    </div>
    <div class="hk-img__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

import { getWebpSrc, readWebpEnvironment } from '@/utils/image'
import { toCssSize, type CssSize } from '@/utils/css'

// Props, slots and events follow Vuetify's v-img so a call site can swap one for the other.
interface Props {
  src: string
  alt?: string
  cover?: boolean
  eager?: boolean
  aspectRatio?: CssSize
  width?: CssSize
  height?: CssSize
  maxWidth?: CssSize
  maxHeight?: CssSize
  minWidth?: CssSize
  minHeight?: CssSize
  /** object-position of the image */
  position?: string
  /** The inside of a linear-gradient(), for example `to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)` */
  gradient?: string
}

interface Emits {
  (event: 'load', src: string): void
  (event: 'error', src: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const imgRef = useTemplateRef<HTMLImageElement>('img')

const isLoaded = ref(false)
const isFailed = ref(false)
const naturalAspectRatio = ref<number>()

// <picture> only negotiates browser support, it doesn't check that the webp file exists, and a
// 404 on the selected <source> does not fall back to the <img>. The app's build guarantees the
// file, so there is deliberately no runtime fallback here.
const webpSrc = computed(() => getWebpSrc(props.src, readWebpEnvironment()))

const rootStyle = computed(() => {
  const aspectRatio = props.aspectRatio ?? naturalAspectRatio.value

  return {
    width: toCssSize(props.width),
    height: toCssSize(props.height),
    maxWidth: toCssSize(props.maxWidth),
    maxHeight: toCssSize(props.maxHeight),
    minWidth: toCssSize(props.minWidth),
    minHeight: toCssSize(props.minHeight),
    aspectRatio: aspectRatio === undefined ? undefined : `${aspectRatio}`,
  }
})

function handleLoad() {
  const { naturalWidth = 0, naturalHeight = 0 } = imgRef.value ?? {}

  if (naturalWidth && naturalHeight) {
    naturalAspectRatio.value = naturalWidth / naturalHeight
  }

  isLoaded.value = true
  emit('load', props.src)
}

function handleError() {
  isFailed.value = true
  emit('error', props.src)
}

// An SSR image has already loaded or failed before hydration, so its load and error events are
// gone. Read the result from the element once mounted.
onMounted(() => {
  const img = imgRef.value

  if (!img?.complete) {
    return
  }

  if (img.naturalWidth > 0) {
    handleLoad()
  } else {
    handleError()
  }
})

watch(
  () => props.src,
  () => {
    isLoaded.value = false
    isFailed.value = false
    naturalAspectRatio.value = undefined
  }
)
</script>

<style scoped>
/* Image, gradient, placeholder and error all stack on one spot; the root is sized by aspect-ratio. */
.hk-img {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.hk-img__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hk-img__image {
  object-fit: contain;
}

.hk-img__image--cover {
  object-fit: cover;
}

.hk-img__gradient {
  background-repeat: no-repeat;
}

.hk-img__content {
  position: relative;
  flex: 1 1 0%;
  max-width: 100%;
}
</style>
