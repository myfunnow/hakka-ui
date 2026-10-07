# @myfunnow/hakka-shared

Types and helpers that more than one hakka-ui package uses. Most apps do not import it directly: the other hakka packages depend on it.

```ts
import type { AspectRatio, CssLength } from '@myfunnow/hakka-shared'
```

| Export        | Type               | Meaning                                                                                      |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `CssLength`   | `string \| number` | A number or numeric string means px, any other string goes to CSS as is (`"50%"`, `"20rem"`) |
| `AspectRatio` | `string \| number` | Width divided by height: `1.8`, `"1.8"` or `"16/9"`                                          |
