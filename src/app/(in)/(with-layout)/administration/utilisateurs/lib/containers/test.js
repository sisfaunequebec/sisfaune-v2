'use server'
import { getUsers } from '@/lib/data/users/service'
// import { useInfiniteQuery } from '@tanstack/react-query'

const useTest = () => {
  // const result = useInfiniteQuery({
  //   queryKey: ['users'],
  //   queryFn: getUsers,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor
  // })

  // console.debug(result)
  // return result
}

export default useTest