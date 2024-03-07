import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      pattern: ['**/*.vue'],
      loaders: ['vue'],
    },
    {
      builder: 'mkdist',
      input: './src',
      pattern: ['**/!(*.test|*.stories).(ts|js)'],
      format: 'esm',
      loaders: ['js'],
    },
    { builder: 'mkdist', input: './src/', pattern: ['**/*.scss'] },
    {
      builder: 'mkdist',
      input: './src/assets/images/',
      outDir: './dist/assets/images/',
    },
  ],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
