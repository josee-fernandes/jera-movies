import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import { client } from '@/lib/react-query'

import { Movies } from '.'

vitest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
  useSearchParams() {
    return {
      get: () => null,
    }
  },
}))

describe('Movies', () => {
  it('should have a flex container for movie cards', async () => {
    const wrapper = render(
      <QueryClientProvider client={client}>
        <Movies profileId="" />
      </QueryClientProvider>,
    )

    await new Promise(process.nextTick)

    wrapper.rerender(
      <QueryClientProvider client={client}>
        <Movies profileId="" />
      </QueryClientProvider>,
    )

    const container = wrapper.getByTestId('movies')

    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('flex-wrap')

    wrapper.debug()
  })
})
