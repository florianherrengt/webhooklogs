import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  healthz: Healthz;
  me?: Maybe<User>;
  applicationById: Application;
  applications: Array<Application>;
};


export type QueryApplicationByIdArgs = {
  id: Scalars['String'];
};

export type Healthz = {
  __typename?: 'Healthz';
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['String'];
  name: Scalars['String'];
  targetUrl: Scalars['String'];
  userId: Scalars['String'];
  hookEvents: Array<HookEvent>;
};

export type HookEvent = {
  __typename?: 'HookEvent';
  id: Scalars['String'];
  method: Scalars['String'];
  contentType: Scalars['String'];
  headers: Scalars['String'];
  body: Scalars['String'];
  applicationId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};

export type CreateApplicationInput = {
  name: Scalars['String'];
  targetUrl: Scalars['String'];
};

export type ApplicationFieldsFragment = (
  { __typename?: 'Application' }
  & Pick<Application, 'id' | 'name' | 'targetUrl' | 'userId'>
);

export type ApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApplicationsQuery = (
  { __typename?: 'Query' }
  & { applications: Array<(
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  )> }
);

export type ApplicationByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApplicationByIdQuery = (
  { __typename?: 'Query' }
  & { applicationById: (
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  ) }
);

export type CreateApplicationMutationVariables = Exact<{
  input: CreateApplicationInput;
}>;


export type CreateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { createApplication: (
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export const ApplicationFieldsFragmentDoc = gql`
    fragment ApplicationFields on Application {
  id
  name
  targetUrl
  userId
}
    `;
export const ApplicationsDocument = gql`
    query applications {
  applications {
    ...ApplicationFields
  }
}
    ${ApplicationFieldsFragmentDoc}`;

/**
 * __useApplicationsQuery__
 *
 * To run a query within a React component, call `useApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
        return Apollo.useQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
      }
export function useApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
          return Apollo.useLazyQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
        }
export type ApplicationsQueryHookResult = ReturnType<typeof useApplicationsQuery>;
export type ApplicationsLazyQueryHookResult = ReturnType<typeof useApplicationsLazyQuery>;
export type ApplicationsQueryResult = Apollo.QueryResult<ApplicationsQuery, ApplicationsQueryVariables>;
export const ApplicationByIdDocument = gql`
    query applicationById($id: String!) {
  applicationById(id: $id) {
    ...ApplicationFields
  }
}
    ${ApplicationFieldsFragmentDoc}`;

/**
 * __useApplicationByIdQuery__
 *
 * To run a query within a React component, call `useApplicationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationByIdQuery(baseOptions: Apollo.QueryHookOptions<ApplicationByIdQuery, ApplicationByIdQueryVariables>) {
        return Apollo.useQuery<ApplicationByIdQuery, ApplicationByIdQueryVariables>(ApplicationByIdDocument, baseOptions);
      }
export function useApplicationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApplicationByIdQuery, ApplicationByIdQueryVariables>) {
          return Apollo.useLazyQuery<ApplicationByIdQuery, ApplicationByIdQueryVariables>(ApplicationByIdDocument, baseOptions);
        }
export type ApplicationByIdQueryHookResult = ReturnType<typeof useApplicationByIdQuery>;
export type ApplicationByIdLazyQueryHookResult = ReturnType<typeof useApplicationByIdLazyQuery>;
export type ApplicationByIdQueryResult = Apollo.QueryResult<ApplicationByIdQuery, ApplicationByIdQueryVariables>;
export const CreateApplicationDocument = gql`
    mutation createApplication($input: CreateApplicationInput!) {
  createApplication(input: $input) {
    ...ApplicationFields
  }
}
    ${ApplicationFieldsFragmentDoc}`;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, baseOptions);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;