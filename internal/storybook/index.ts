/**
 * What the docs page of a story shows besides the args table.
 * - `description`: a few plain words for people who do not code, shown above the story.
 * - `code`: the "Show code" panel is built from the args of a story and knows nothing about the `render` template, so
 *   `v-model` and slot content would be missing. A story with a `render` gives the code it wants shown here.
 */
export const storyDocs = ({ description, code }: { description: string; code?: string }) => ({
  docs: { description: { story: description }, ...(code === undefined ? {} : { source: { code } }) },
})
