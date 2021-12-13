import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: string;
};

export type Mutation = {
  __typename?: "Mutation";
  createPerson: Person;
};


export type MutationCreatePersonArgs = {
  input: NewPerson;
};

export type NewPerson = {
  applicantName: Scalars["String"];
  applicantSurname: Scalars["String"];
  createdAt: Scalars["Time"];
  id: Scalars["ID"];
  ip: Scalars["String"];
  paidDate?: Maybe<Scalars["Time"]>;
  parentEmail: Scalars["String"];
  parentName: Scalars["String"];
  parentSurname: Scalars["String"];
  payTillDate: Scalars["Time"];
  personalId: Scalars["String"];
  phone: Scalars["String"];
  schoolName: Scalars["String"];
  signInDate: Scalars["Time"];
  variableSymbol: Scalars["String"];
};

export type Person = {
  __typename?: "Person";
  applicantName: Scalars["String"];
  applicantSurname: Scalars["String"];
  createdAt: Scalars["Time"];
  id: Scalars["ID"];
  ip: Scalars["String"];
  paidDate?: Maybe<Scalars["Time"]>;
  parentEmail: Scalars["String"];
  parentName: Scalars["String"];
  parentSurname: Scalars["String"];
  payTillDate: Scalars["Time"];
  personalId: Scalars["String"];
  phone: Scalars["String"];
  schoolName: Scalars["String"];
  signInDate: Scalars["Time"];
  variableSymbol: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  people: Array<Person>;
};

export type GetPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPeopleQuery = { __typename?: "Query", people: Array<{ __typename?: "Person", id: string, personalId: string, createdAt: string, applicantName: string, applicantSurname: string, parentName: string, parentSurname: string, parentEmail: string, schoolName: string, phone: string, ip: string, variableSymbol: string, signInDate: string, payTillDate: string, paidDate?: string | null | undefined }> };


export const GetPeopleDocument = gql`
    query GetPeople {
  people {
    id
    personalId
    createdAt
    applicantName
    applicantSurname
    parentName
    parentSurname
    parentEmail
    schoolName
    phone
    ip
    variableSymbol
    signInDate
    payTillDate
    paidDate
  }
}
    `

/**
 * __useGetPeopleQuery__
 *
 * To run a query within a React component, call `useGetPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeopleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPeopleQuery(baseOptions?: Apollo.QueryHookOptions<GetPeopleQuery, GetPeopleQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPeopleQuery, GetPeopleQueryVariables>(GetPeopleDocument, options)
}

export function useGetPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeopleQuery, GetPeopleQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPeopleQuery, GetPeopleQueryVariables>(GetPeopleDocument, options)
}

export type GetPeopleQueryHookResult = ReturnType<typeof useGetPeopleQuery>;
export type GetPeopleLazyQueryHookResult = ReturnType<typeof useGetPeopleLazyQuery>;
export type GetPeopleQueryResult = Apollo.QueryResult<GetPeopleQuery, GetPeopleQueryVariables>;