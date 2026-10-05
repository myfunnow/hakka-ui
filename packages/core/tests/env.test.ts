afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('IS_PRODUCTION', () => {
  // The constant is decided when the module loads, so each case loads a fresh copy
  it.each([
    { nodeEnv: 'production', expected: true },
    { nodeEnv: 'development', expected: false },
    { nodeEnv: 'test', expected: false },
  ])('should be $expected when NODE_ENV is $nodeEnv', async ({ nodeEnv, expected }) => {
    vi.stubEnv('NODE_ENV', nodeEnv)

    const { IS_PRODUCTION } = await import('@/utils/env')

    expect(IS_PRODUCTION).toBe(expected)
  })
})
