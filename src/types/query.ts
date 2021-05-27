interface QueryManager<T> {
  error: boolean;
  code: number;
  description?: string;
  data?: T;
}

type ErrorQuery = QueryManager<undefined>;

export type { QueryManager, ErrorQuery };
