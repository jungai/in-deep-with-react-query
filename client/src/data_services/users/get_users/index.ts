import ky from 'ky';
import { useQuery, QueryFunctionContext } from 'react-query';

export interface IGetUsersResult {
    id: number;
    name: string;
}

export type Result = { result: IGetUsersResult[] };

export function getUsers(): () => Promise<Result> {
    // if has any params body
    return () => ky.get('http://localhost:4000/users').json<Result>();
}

export function useUsers() {
    return useQuery('users', () => getUsers()());
}

export function getUsersWithId(): (id?: number) => Promise<Result> {
    // if has any params body
    return (id) =>
        ky.get(`http://localhost:4000/users?id=${id}`).json<Result>();
}

type QueryKey = [string, { id?: number }]; // args[1] contain query string, params

/**
 * Query Keys
 *
 * {@link https://react-query.tanstack.com/guides/query-keys#query-keys-are-hashed-deterministically}
 */
export function useUsersWithId(id?: number) {
    return useQuery<Result, Error, Result, QueryKey>(
        ['users', { id }],
        (_context) => getUsersWithId()(id),
        {
            // Dependent Queries (<- might be this case in my case than disabling queries)
            // The query will not execute until the id exists
            // or https://react-query.tanstack.com/guides/disabling-queries
            enabled: !!id,
        },
    );
}
