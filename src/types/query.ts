interface QueryManager<T> {
  error: boolean;
  code: number;
  description?: string;
  data?: T;
}

interface ErrorQuery extends QueryManager<undefined> {}

export type { QueryManager, ErrorQuery };
