import { useQuery} from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { getUserAccount } from "../../helpers"

export const useGetUserAccount = (email:string) => {
    return useQuery({
        queryFn: () => getUserAccount(email),
        queryKey: [QUERY_KEYS.GET_USER_ACCOUNTS]
    })
}