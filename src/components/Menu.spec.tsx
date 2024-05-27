import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Menu } from './Menu'

const onProfileSelectionCallback = vi.fn()
const onMenuCloseCallback = vi.fn()

vitest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe('Menu', () => {
  it('should be hidden by default', async () => {
    const wrapper = render(
      <Menu
        isOpen={false}
        onClose={onMenuCloseCallback}
        onProfileSelection={() => {}}
      />,
    )

    const menuContainer = wrapper.getByTestId('menu')

    expect(menuContainer).toHaveClass('-right-96')

    expect(menuContainer).toBeInTheDocument()
  })

  it('should close by clicking on x button', async () => {
    const wrapper = render(
      <Menu
        isOpen={true}
        onClose={onMenuCloseCallback}
        onProfileSelection={() => {}}
      />,
    )

    const menus = wrapper.getAllByRole('button')
    const closeButton = menus[0]

    expect(closeButton).toBeInTheDocument()
    const user = userEvent.setup()

    await user.click(closeButton)

    expect(onMenuCloseCallback).toHaveBeenCalled()
  })

  it('should open profile selection menu when clicking on "profiles"', async () => {
    const wrapper = render(
      <Menu
        isOpen={true}
        onClose={() => {}}
        onProfileSelection={onProfileSelectionCallback}
      />,
    )

    const menus = wrapper.getAllByRole('button')
    const profilesMenu = menus[1]

    expect(profilesMenu).toBeInTheDocument()
    const user = userEvent.setup()

    await user.click(profilesMenu)

    expect(onProfileSelectionCallback).toHaveBeenCalled()
  })
})
