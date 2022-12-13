import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const userSliceApiTag = 'user_api';

const user_api = createApi({
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === HYDRATE) {
    //         console.log('HYDRATE', action, reducerPath);
    //         return action.payload[reducerPath];
    //     }
    // },
    reducerPath: userSliceApiTag,
    baseQuery,
    tagTypes: [userSliceApiTag],
    endpoints: (build) => ({

    })
});

// export const {
//     useGetCartListQuery
// } = user_api;

export default user_api;
