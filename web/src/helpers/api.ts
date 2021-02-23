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
  hookEventById: HookEvent;
  hookEvents: PaginatedHookEventResponse;
};


export type QueryApplicationByIdArgs = {
  id: Scalars['String'];
};


export type QueryHookEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryHookEventsArgs = {
  cursor?: Maybe<PaginationCursorFields>;
  where: HookEventWhereFields;
};

export type Healthz = {
  __typename?: 'Healthz';
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['String'];
  name: Scalars['String'];
  targetUrl: Scalars['String'];
  userId: Scalars['String'];
};

export type HookEvent = {
  __typename?: 'HookEvent';
  id: Scalars['String'];
  method: Scalars['String'];
  headers: Scalars['String'];
  body: Scalars['String'];
  path: Scalars['String'];
  applicationId: Scalars['String'];
  targetResponse?: Maybe<TargetResponse>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TargetResponse = {
  __typename?: 'TargetResponse';
  id: Scalars['String'];
  data: Scalars['String'];
  status: Scalars['Float'];
  headers: Scalars['String'];
  hookEventId: Scalars['String'];
};

export type PaginatedHookEventResponse = {
  __typename?: 'PaginatedHookEventResponse';
  items: Array<HookEvent>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PaginationCursorFields = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
};

export type HookEventWhereFields = {
  applicationId?: Maybe<WhereOps>;
};

export type WhereOps = {
  eq: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  deleteApplicationById: Scalars['Int'];
  updateApplicationById: Application;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationDeleteApplicationByIdArgs = {
  id: Scalars['String'];
};


export type MutationUpdateApplicationByIdArgs = {
  input: UpdateApplicationInput;
};

export type CreateApplicationInput = {
  name: Scalars['String'];
  targetUrl: Scalars['String'];
};

export type UpdateApplicationInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  targetUrl: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newHookEvent?: Maybe<HookEvent>;
};


export type SubscriptionNewHookEventArgs = {
  applicationId: Scalars['String'];
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

export type UpdateApplicationByIdMutationVariables = Exact<{
  input: UpdateApplicationInput;
}>;


export type UpdateApplicationByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateApplicationById: (
    { __typename?: 'Application' }
    & ApplicationFieldsFragment
  ) }
);

export type DeleteApplicationByIdMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteApplicationByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteApplicationById'>
);

export type HookEventsFragmentFragment = (
  { __typename?: 'HookEvent' }
  & Pick<HookEvent, 'id' | 'method' | 'headers' | 'path' | 'body' | 'applicationId' | 'createdAt' | 'updatedAt'>
  & { targetResponse?: Maybe<(
    { __typename?: 'TargetResponse' }
    & Pick<TargetResponse, 'id' | 'data' | 'headers' | 'status'>
  )> }
);

export type HookEventsQueryVariables = Exact<{
  where: HookEventWhereFields;
  cursor?: Maybe<PaginationCursorFields>;
}>;


export type HookEventsQuery = (
  { __typename?: 'Query' }
  & { hookEvents: (
    { __typename?: 'PaginatedHookEventResponse' }
    & Pick<PaginatedHookEventResponse, 'total' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'HookEvent' }
      & HookEventsFragmentFragment
    )> }
  ) }
);

export type NewHookEventSubscriptionVariables = Exact<{
  applicationId: Scalars['String'];
}>;


export type NewHookEventSubscription = (
  { __typename?: 'Subscription' }
  & { newHookEvent?: Maybe<(
    { __typename?: 'HookEvent' }
    & HookEventsFragmentFragment
  )> }
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'githubId'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
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
export const HookEventsFragmentFragmentDoc = gql`
    fragment HookEventsFragment on HookEvent {
  id
  method
  headers
  path
  body
  applicationId
  createdAt
  updatedAt
  targetResponse {
    id
    data
    headers
    status
  }
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  githubId
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
export const UpdateApplicationByIdDocument = gql`
    mutation updateApplicationById($input: UpdateApplicationInput!) {
  updateApplicationById(input: $input) {
    ...ApplicationFields
  }
}
    ${ApplicationFieldsFragmentDoc}`;
export type UpdateApplicationByIdMutationFn = Apollo.MutationFunction<UpdateApplicationByIdMutation, UpdateApplicationByIdMutationVariables>;

/**
 * __useUpdateApplicationByIdMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationByIdMutation, { data, loading, error }] = useUpdateApplicationByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateApplicationByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApplicationByIdMutation, UpdateApplicationByIdMutationVariables>) {
        return Apollo.useMutation<UpdateApplicationByIdMutation, UpdateApplicationByIdMutationVariables>(UpdateApplicationByIdDocument, baseOptions);
      }
export type UpdateApplicationByIdMutationHookResult = ReturnType<typeof useUpdateApplicationByIdMutation>;
export type UpdateApplicationByIdMutationResult = Apollo.MutationResult<UpdateApplicationByIdMutation>;
export type UpdateApplicationByIdMutationOptions = Apollo.BaseMutationOptions<UpdateApplicationByIdMutation, UpdateApplicationByIdMutationVariables>;
export const DeleteApplicationByIdDocument = gql`
    mutation deleteApplicationById($id: String!) {
  deleteApplicationById(id: $id)
}
    `;
export type DeleteApplicationByIdMutationFn = Apollo.MutationFunction<DeleteApplicationByIdMutation, DeleteApplicationByIdMutationVariables>;

/**
 * __useDeleteApplicationByIdMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationByIdMutation, { data, loading, error }] = useDeleteApplicationByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApplicationByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApplicationByIdMutation, DeleteApplicationByIdMutationVariables>) {
        return Apollo.useMutation<DeleteApplicationByIdMutation, DeleteApplicationByIdMutationVariables>(DeleteApplicationByIdDocument, baseOptions);
      }
export type DeleteApplicationByIdMutationHookResult = ReturnType<typeof useDeleteApplicationByIdMutation>;
export type DeleteApplicationByIdMutationResult = Apollo.MutationResult<DeleteApplicationByIdMutation>;
export type DeleteApplicationByIdMutationOptions = Apollo.BaseMutationOptions<DeleteApplicationByIdMutation, DeleteApplicationByIdMutationVariables>;
export const HookEventsDocument = gql`
    query hookEvents($where: HookEventWhereFields!, $cursor: PaginationCursorFields) {
  hookEvents(where: $where, cursor: $cursor) {
    items {
      ...HookEventsFragment
    }
    total
    hasMore
  }
}
    ${HookEventsFragmentFragmentDoc}`;

/**
 * __useHookEventsQuery__
 *
 * To run a query within a React component, call `useHookEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHookEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHookEventsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useHookEventsQuery(baseOptions: Apollo.QueryHookOptions<HookEventsQuery, HookEventsQueryVariables>) {
        return Apollo.useQuery<HookEventsQuery, HookEventsQueryVariables>(HookEventsDocument, baseOptions);
      }
export function useHookEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HookEventsQuery, HookEventsQueryVariables>) {
          return Apollo.useLazyQuery<HookEventsQuery, HookEventsQueryVariables>(HookEventsDocument, baseOptions);
        }
export type HookEventsQueryHookResult = ReturnType<typeof useHookEventsQuery>;
export type HookEventsLazyQueryHookResult = ReturnType<typeof useHookEventsLazyQuery>;
export type HookEventsQueryResult = Apollo.QueryResult<HookEventsQuery, HookEventsQueryVariables>;
export const NewHookEventDocument = gql`
    subscription newHookEvent($applicationId: String!) {
  newHookEvent(applicationId: $applicationId) {
    ...HookEventsFragment
  }
}
    ${HookEventsFragmentFragmentDoc}`;

/**
 * __useNewHookEventSubscription__
 *
 * To run a query within a React component, call `useNewHookEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewHookEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewHookEventSubscription({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useNewHookEventSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewHookEventSubscription, NewHookEventSubscriptionVariables>) {
        return Apollo.useSubscription<NewHookEventSubscription, NewHookEventSubscriptionVariables>(NewHookEventDocument, baseOptions);
      }
export type NewHookEventSubscriptionHookResult = ReturnType<typeof useNewHookEventSubscription>;
export type NewHookEventSubscriptionResult = Apollo.SubscriptionResult<NewHookEventSubscription>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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