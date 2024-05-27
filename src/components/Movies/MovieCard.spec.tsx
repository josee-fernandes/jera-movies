import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import { client } from '@/lib/react-query'

import { MovieCard } from './MovieCard'

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

describe('MovieCard', () => {
  it('should have two action buttons', () => {
    const wrapper = render(
      <QueryClientProvider client={client}>
        <MovieCard movie={{} as MovieType} profileId="" />
      </QueryClientProvider>,
    )

    const buttons = wrapper.getAllByRole('button')

    expect(buttons.length).toBeLessThanOrEqual(2)
  })

  it('should have a cover image', () => {
    const wrapper = render(
      <QueryClientProvider client={client}>
        <MovieCard
          movie={{ title: 'Movie', cover: '/movie.png' } as MovieType}
          profileId=""
        />
      </QueryClientProvider>,
    )

    const coverImage = wrapper.getByAltText('Movie')

    expect(coverImage).toBeInTheDocument()
    expect(coverImage).toHaveClass('object-cover')
    expect(coverImage).toHaveAttribute('loading', 'lazy')
  })

  it('should contain the movie title', () => {
    const wrapper = render(
      <QueryClientProvider client={client}>
        <MovieCard
          movie={{ title: 'Movie', cover: '/movie.png' } as MovieType}
          profileId=""
        />
      </QueryClientProvider>,
    )

    const title = wrapper.getByText('Movie')

    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('uppercase')
    expect(title).toHaveClass('text-brand-secondary-500')

    wrapper.debug()
  })
})
