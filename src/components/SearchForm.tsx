export const SearchForm: React.FC = () => {
  return (
    <form className="flex w-full flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by a movie name"
        className="flex-1 rounded-[0.625rem] border border-brand-accent-500 px-2 py-3 text-brand-secondary-500"
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

SearchForm.displayName = 'SearchForm'
