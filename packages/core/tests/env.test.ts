import { isProduction } from '@/utils/env'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('isProduction', () => {
  it.each([
    { nodeEnv: 'production', expected: true },
    { nodeEnv: 'development', expected: false },
    { nodeEnv: 'test', expected: false },
  ])('should be $expected when NODE_ENV is $nodeEnv', ({ nodeEnv, expected }) => {
    vi.stubEnv('NODE_ENV', nodeEnv)

    const result = isProduction()

    expect(result).toBe(expected)
  })

  it('should read NODE_ENV every time it is called', () => {
    vi.stubEnv('NODE_ENV', 'production')
    const wasProduction = isProduction()

    vi.stubEnv('NODE_ENV', 'test')

    expect(wasProduction).toBe(true)
    expect(isProduction()).toBe(false)
  })
})
