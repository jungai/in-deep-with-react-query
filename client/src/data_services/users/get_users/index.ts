import ky from 'ky';
import { useQuery } from 'react-query';

export interface IGetUsersResult {
    id: number;
    name: string;
}

export function getUsers(): () => Promise<{ result: IGetUsersResult[] }> {
    // if has any params body
    return () =>
        ky
            .get('http://localhost:4000/users')
            .json<{ result: IGetUsersResult[] }>();
}

export function useUsers() {
    return useQuery('users', () => getUsers()());
}

export function getUsersWithId(): (
    id: number,
) => Promise<{ result: IGetUsersResult[] }> {
    // if has any params body
    return (id) =>
        ky
            .get(`http://localhost:4000/users?id=${id}`)
            .json<{ result: IGetUsersResult[] }>();
}

/**
 * Query Keys
 *
 * {@link https://react-query.tanstack.com/guides/query-keys#query-keys-are-hashed-deterministically}
 */
export function useUsersWithId(id: number) {
    return useQuery(['users', { id }], () => getUsersWithId()(id));
}
