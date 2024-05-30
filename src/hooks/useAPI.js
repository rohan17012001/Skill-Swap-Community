import {useQuery} from '@tanstack/react-query'

export const LikePost = (postId) => {
    return useQuery({
        queryKey: ['likePost', postId],
        queryFn: () => {
            //define post function here
        },
        refetchInterval: 15*60*1000,
        _optimisticResults: true
    })
}