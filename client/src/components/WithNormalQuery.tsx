import React, { useState, useEffect } from 'react';
import { useUsersWithId } from '../data_services/users/get_users';

function WithNormalQuery(): React.ReactElement {
  const [id, setId] = useState<undefined | number>();
  const { data, isLoading, error, isFetching } = useUsersWithId(id);

  return (
    <div>
      <h1>With Normal Query</h1>
      <button onClick={() => setId((prev) => (prev ? prev + 1 : 1))}>
        id {id}
      </button>
      {isLoading ? (
        <p>loading ...</p>
      ) : error ? (
        <p>{JSON.stringify(error)}</p>
      ) : (
        <p>{JSON.stringify(data)}</p>
      )}
    </div>
  );
}

export default WithNormalQuery;
