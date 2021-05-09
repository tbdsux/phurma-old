import { errors } from 'faunadb';
import { ErrorQuery, QueryManager } from '~types/query';

const getQueryError = (e: errors.FaunaHTTPError): ErrorQuery => {
  return {
    error: true,
    code: e.requestResult?.statusCode || 500,
    description: e.description
  };
};

const getQuery = <T>(data: T): QueryManager<T> => {
  return {
    error: false,
    code: 200,
    data: data
  };
};

export { getQueryError, getQuery };
