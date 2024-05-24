import { NextPage } from 'next'

import { Profiles } from '@/components/Profiles'

const Browse: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-brand-primary-500">
      <Profiles />
    </div>
  )
}

Browse.displayName = 'Browse'

export default Browse
