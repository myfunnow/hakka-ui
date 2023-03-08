import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src/', outDir: './dist/' },
  ],
  declaration: false,
  clean: true,
  hooks: {
    "mkdist:entry:options": (ctx, entry, mkdistOptions) => {
      mkdistOptions.pattern = ['components/**/*.vue', '**/index.js', '**/*.scss']
      return mkdistOptions
    }
  }
})
