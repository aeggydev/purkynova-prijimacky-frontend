import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addParticipant: Participant;
  updateParticipant: Participant;
  updateSettings: Settings;
};


export type MutationAddParticipantArgs = {
  newParticipant: NewParticipantInput;
};


export type MutationUpdateParticipantArgs = {
  id: Scalars['Int'];
  updateParticipant: UpdateParticipantInput;
};


export type MutationUpdateSettingsArgs = {
  updateSettings: UpdateSettingsInput;
};

export type NewParticipantInput = {
  email: Scalars['String'];
  parentName: Scalars['String'];
  parentSurname: Scalars['String'];
  participantName: Scalars['String'];
  participantSurname: Scalars['String'];
  phone: Scalars['String'];
  school: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  dueDate: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  ip: Scalars['String'];
  paidDate?: Maybe<Scalars['DateTime']>;
  parentName: Scalars['String'];
  parentSurname: Scalars['String'];
  participantName: Scalars['String'];
  participantSurname: Scalars['String'];
  phone: Scalars['String'];
  school: Scalars['String'];
  signUpDate: Scalars['DateTime'];
  variableSymbol: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  participants: Array<Participant>;
  settings: Settings;
};

export type Settings = {
  __typename?: 'Settings';
  allowedOver: Scalars['Int'];
  capacity: Scalars['Int'];
  id: Scalars['Int'];
  signUpAllowed: Scalars['Boolean'];
};

export type UpdateParticipantInput = {
  email?: InputMaybe<Scalars['String']>;
  paidDate?: InputMaybe<Scalars['DateTime']>;
  parentName?: InputMaybe<Scalars['String']>;
  parentSurname?: InputMaybe<Scalars['String']>;
  participantName?: InputMaybe<Scalars['String']>;
  participantSurname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
};

export type UpdateSettingsInput = {
  allowedOver?: InputMaybe<Scalars['Int']>;
  capacity?: InputMaybe<Scalars['Int']>;
  signUpAllowed?: InputMaybe<Scalars['Boolean']>;
};

export type ParticipantsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantsQuery = { __typename?: 'Query', participants: Array<{ __typename?: 'Participant', dueDate: any, paidDate?: any | null, signUpDate: any, email: string, id: number, ip: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string }> };

export type AddParticipantMutationVariables = Exact<{
  participantSurname: Scalars['String'];
  participantName: Scalars['String'];
  parentSurname: Scalars['String'];
  parentName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  school: Scalars['String'];
}>;


export type AddParticipantMutation = { __typename?: 'Mutation', addParticipant: { __typename?: 'Participant', id: number } };

export type UpdateParticipantMutationVariables = Exact<{
  id: Scalars['Int'];
  participantSurname?: InputMaybe<Scalars['String']>;
  participantName?: InputMaybe<Scalars['String']>;
  parentSurname?: InputMaybe<Scalars['String']>;
  parentName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
}>;


export type UpdateParticipantMutation = { __typename?: 'Mutation', updateParticipant: { __typename?: 'Participant', id: number } };


export const ParticipantsDocument = gql`
    query Participants {
  participants {
    dueDate
    paidDate
    signUpDate
    email
    id
    ip
    phone
    variableSymbol
    parentName
    parentSurname
    participantName
    participantSurname
  }
}
    `;

/**
 * __useParticipantsQuery__
 *
 * To run a query within a React component, call `useParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useParticipantsQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, options);
      }
export function useParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, options);
        }
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsLazyQueryHookResult = ReturnType<typeof useParticipantsLazyQuery>;
export type ParticipantsQueryResult = Apollo.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
export const AddParticipantDocument = gql`
    mutation addParticipant($participantSurname: String!, $participantName: String!, $parentSurname: String!, $parentName: String!, $phone: String!, $email: String!, $school: String!) {
  addParticipant(
    newParticipant: {participantSurname: $participantSurname, participantName: $participantName, parentSurname: $parentSurname, parentName: $parentName, phone: $phone, email: $email, school: $school}
  ) {
    id
  }
}
    `;
export type AddParticipantMutationFn = Apollo.MutationFunction<AddParticipantMutation, AddParticipantMutationVariables>;

/**
 * __useAddParticipantMutation__
 *
 * To run a mutation, you first call `useAddParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addParticipantMutation, { data, loading, error }] = useAddParticipantMutation({
 *   variables: {
 *      participantSurname: // value for 'participantSurname'
 *      participantName: // value for 'participantName'
 *      parentSurname: // value for 'parentSurname'
 *      parentName: // value for 'parentName'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      school: // value for 'school'
 *   },
 * });
 */
export function useAddParticipantMutation(baseOptions?: Apollo.MutationHookOptions<AddParticipantMutation, AddParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddParticipantMutation, AddParticipantMutationVariables>(AddParticipantDocument, options);
      }
export type AddParticipantMutationHookResult = ReturnType<typeof useAddParticipantMutation>;
export type AddParticipantMutationResult = Apollo.MutationResult<AddParticipantMutation>;
export type AddParticipantMutationOptions = Apollo.BaseMutationOptions<AddParticipantMutation, AddParticipantMutationVariables>;
export const UpdateParticipantDocument = gql`
    mutation updateParticipant($id: Int!, $participantSurname: String, $participantName: String, $parentSurname: String, $parentName: String, $phone: String, $email: String, $school: String) {
  updateParticipant(
    id: $id
    updateParticipant: {participantSurname: $participantSurname, participantName: $participantName, parentSurname: $parentSurname, parentName: $parentName, phone: $phone, email: $email, school: $school}
  ) {
    id
  }
}
    `;
export type UpdateParticipantMutationFn = Apollo.MutationFunction<UpdateParticipantMutation, UpdateParticipantMutationVariables>;

/**
 * __useUpdateParticipantMutation__
 *
 * To run a mutation, you first call `useUpdateParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParticipantMutation, { data, loading, error }] = useUpdateParticipantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      participantSurname: // value for 'participantSurname'
 *      participantName: // value for 'participantName'
 *      parentSurname: // value for 'parentSurname'
 *      parentName: // value for 'parentName'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      school: // value for 'school'
 *   },
 * });
 */
export function useUpdateParticipantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateParticipantMutation, UpdateParticipantMutationVariables>(UpdateParticipantDocument, options);
      }
export type UpdateParticipantMutationHookResult = ReturnType<typeof useUpdateParticipantMutation>;
export type UpdateParticipantMutationResult = Apollo.MutationResult<UpdateParticipantMutation>;
export type UpdateParticipantMutationOptions = Apollo.BaseMutationOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>;