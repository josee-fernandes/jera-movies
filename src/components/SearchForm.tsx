import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SearchFormProps {
  profileId: string
}

const searchFormSchema = z.object({
  query: z.string().transform((query) => query.trim()),
})

type SearchFormSchemaType = z.infer<typeof searchFormSchema>

const SearchFormFC: React.FC<SearchFormProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { register, handleSubmit } = useForm<SearchFormSchemaType>({
    defaultValues: {
      query: '',
    },
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleSearch = useCallback(
    (data: SearchFormSchemaType) => {
      try {
        router.push(`${pathname}?${createQueryString('query', data.query)}`)
      } catch (error) {
        console.error(error)
      }
    },
    [createQueryString, pathname, router],
  )

  return (
    <form
      className="flex w-full flex-wrap gap-4"
      onSubmit={handleSubmit(handleSearch)}
    >
      <input
        type="text"
        placeholder="Search by a movie name"
        className="flex-1 rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
        {...register('query')}
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-brand-accent-500 px-6 py-2 font-bold text-brand-primary-500 transition-all hover:bg-brand-accent-900 md:w-max"
      >
        SEARCH
      </button>
    </form>
  )
}

SearchFormFC.displayName = 'SearchFormFC'

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  return (
    <Suspense>
      <SearchFormFC {...props} />
    </Suspense>
  )
}

SearchForm.displayName = 'SearchForm'
