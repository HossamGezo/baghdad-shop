const SearchBar = () => {
  // --- Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // --- Return JSx
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-10 lg:h-12.5 flex items-center flex-1 bg-green-50 my-5 max-sm:my-2.5 rounded-md overflow-hidden"
    >
      <button
        aria-label="Submit search"
        className="bg-warning text-primary h-full cursor-pointer px-5 font-medium text-lg select-none hover:bg-amber-500 active:bg-amber-400 duration-300 transition-colors"
        type="submit"
      >
        Search
      </button>
      <input
        className="w-full h-full px-2.5 caret-warning outline-0 select-none bg-white overflow-hidden whitespace-nowrap text-ellipsis"
        type="search"
        aria-label="Search products"
        placeholder="What are you looking for?"
      />
    </form>
  );
};

export default SearchBar;
