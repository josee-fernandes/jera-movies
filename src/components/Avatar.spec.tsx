import { render } from '@testing-library/react'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('should display the proper image element after transpiling', () => {
    const wrapper = render(<Avatar src="/avatar-1.png" alt="Avatar" />)

    const image = wrapper.getByAltText('Avatar')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading')
    expect(image).toHaveAttribute('src')
  })

  it('should have a relative container', () => {
    const wrapper = render(<Avatar src="/avatar-1.png" alt="Avatar" />)

    const avatarContainer = wrapper.getByTestId('avatar')

    expect(avatarContainer).toHaveClass('relative')
  })
})
