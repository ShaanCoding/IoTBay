# How react query works

- We have a unique key for each query, and we can use that key to invalidate the query.
- data, isLoading, error, refetch, error

- mutations

  - useMutation -> we can add onSuccess to invalidate the query category and refresh on demand

- Pagination
  - If it goes page by page we can use useInfiniteQuery
  - getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  - getPreviousPageParam: (firstPage, pages) => firstPage.previousPage,
