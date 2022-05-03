import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `Date` scalar represents an ISO-8601 compliant date type. */
    Date: any;
    /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
    DateTime: any;
};

export type EmailStatistics = {
    __typename?: "EmailStatistics";
    accepted: Scalars["Int"];
    canceled: Scalars["Int"];
    waitingForPayment: Scalars["Int"];
    withoutCancelationConfirmationEmail: Scalars["Int"];
    withoutEmailNotifyingOfFreeSpot: Scalars["Int"];
    withoutPaymentConfirmationEmail: Scalars["Int"];
};

export type LoginInfoInput = {
    password: Scalars["String"];
    username: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    addAdmin: Scalars["Int"];
    addParticipant: Participant;
    clearPaid: Scalars["Boolean"];
    removeParticipant: Scalars["Boolean"];
    statusAction: Scalars["Boolean"];
    statusActionAllOfStatus: Scalars["Boolean"];
    updateParticipant: Participant;
    updateParticipants: Array<Participant>;
    updateSettings: Settings;
};


export type MutationAddAdminArgs = {
    login: RegistrationInfoInput;
};


export type MutationAddParticipantArgs = {
    newParticipant: NewParticipantInput;
};


export type MutationClearPaidArgs = {
    id: Scalars["Int"];
};


export type MutationRemoveParticipantArgs = {
    id: Scalars["Int"];
};


export type MutationStatusActionArgs = {
    id: Scalars["Int"];
    presumedStatus: ParticipantStatus;
};


export type MutationStatusActionAllOfStatusArgs = {
    expectedStatus: ParticipantStatus;
};


export type MutationUpdateParticipantArgs = {
    id: Scalars["Int"];
    updateParticipant: UpdateParticipantInput;
};


export type MutationUpdateParticipantsArgs = {
    updateParticipants: Array<UpdateParticipantsItemInput>;
};


export type MutationUpdateSettingsArgs = {
    updateSettings: UpdateSettingsInput;
};

export type NewParticipantInput = {
    email: Scalars["String"];
    parentName: Scalars["String"];
    parentSurname: Scalars["String"];
    participantName: Scalars["String"];
    participantSurname: Scalars["String"];
    phone: Scalars["String"];
    school: Scalars["String"];
};

export type Participant = {
    __typename?: "Participant";
    cancelationNotified: Scalars["Boolean"];
    creationNotified: Scalars["Boolean"];
    dueDate: Scalars["Date"];
    email: Scalars["String"];
    id: Scalars["Int"];
    ip: Scalars["String"];
    isOver: Scalars["Boolean"];
    isPaid: Scalars["Boolean"];
    paidDate?: Maybe<Scalars["Date"]>;
    paidNotified: Scalars["Boolean"];
    parentName: Scalars["String"];
    parentSurname: Scalars["String"];
    participantName: Scalars["String"];
    participantSurname: Scalars["String"];
    phone: Scalars["String"];
    school: Scalars["String"];
    signUpDate: Scalars["DateTime"];
    status: ParticipantStatus;
    variableSymbol: Scalars["String"];
};

export enum ParticipantStatus {
    Canceled = "CANCELED",
    Error = "ERROR",
    NotNotified = "NOT_NOTIFIED",
    PaidConfirmed = "PAID_CONFIRMED",
    PaidUnconfirmed = "PAID_UNCONFIRMED",
    Unpaid = "UNPAID",
    UnpaidLate = "UNPAID_LATE"
}

export type Query = {
    __typename?: "Query";
    emailStatistics: EmailStatistics;
    login: Scalars["String"];
    participants: Array<Participant>;
    settings: Settings;
    statistics: Statistics;
};


export type QueryLoginArgs = {
    login: LoginInfoInput;
};

export type RegistrationInfoInput = {
    email: Scalars["String"];
    password: Scalars["String"];
    username: Scalars["String"];
};

export type Settings = {
    __typename?: "Settings";
    allowedOver: Scalars["Int"];
    capacity: Scalars["Int"];
    id: Scalars["Int"];
    signUpAllowed: Scalars["Boolean"];
    signUpFrom: Scalars["Date"];
    signUpUntil: Scalars["Date"];
};

export type Statistics = {
    __typename?: "Statistics";
    capacity: Scalars["Int"];
    remainingCapacity: Scalars["Int"];
    remainingCapacityOver: Scalars["Int"];
    removedSignups: Scalars["Int"];
    totalSignups: Scalars["Int"];
};

export type UpdateParticipantInput = {
    dueDate?: InputMaybe<Scalars["Date"]>;
    email?: InputMaybe<Scalars["String"]>;
    paidDate?: InputMaybe<Scalars["Date"]>;
    parentName?: InputMaybe<Scalars["String"]>;
    parentSurname?: InputMaybe<Scalars["String"]>;
    participantName?: InputMaybe<Scalars["String"]>;
    participantSurname?: InputMaybe<Scalars["String"]>;
    phone?: InputMaybe<Scalars["String"]>;
    school?: InputMaybe<Scalars["String"]>;
};

export type UpdateParticipantsItemInput = {
    data: UpdateParticipantInput;
    id: Scalars["Int"];
};

export type UpdateSettingsInput = {
    allowedOver: Scalars["Int"];
    capacity: Scalars["Int"];
    signUpAllowed: Scalars["Boolean"];
    signUpFrom: Scalars["Date"];
    signUpUntil: Scalars["Date"];
};

export type TableParticipantFragment = { __typename?: "Participant", id: number, ip: string, school: string, email: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string, signUpDate: any, paidDate?: any | null, dueDate: any, isOver: boolean, isPaid: boolean, status: ParticipantStatus, creationNotified: boolean, cancelationNotified: boolean, paidNotified: boolean };

export type EmailStatisticsFragment = { __typename?: "EmailStatistics", accepted: number, canceled: number, waitingForPayment: number, withoutCancelationConfirmationEmail: number, withoutEmailNotifyingOfFreeSpot: number, withoutPaymentConfirmationEmail: number };

export type GetEmailStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmailStatisticsQuery = { __typename?: "Query", emailStatistics: { __typename?: "EmailStatistics", accepted: number, canceled: number, waitingForPayment: number, withoutCancelationConfirmationEmail: number, withoutEmailNotifyingOfFreeSpot: number, withoutPaymentConfirmationEmail: number } };

export type GetParticipantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetParticipantsQuery = { __typename?: "Query", participants: Array<{ __typename?: "Participant", id: number, ip: string, school: string, email: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string, signUpDate: any, paidDate?: any | null, dueDate: any, isOver: boolean, isPaid: boolean, status: ParticipantStatus, creationNotified: boolean, cancelationNotified: boolean, paidNotified: boolean }> };

export type NewParticipantMutationVariables = Exact<{
    addParticipant: NewParticipantInput;
}>;


export type NewParticipantMutation = { __typename?: "Mutation", addParticipant: { __typename?: "Participant", id: number, ip: string, school: string, email: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string, signUpDate: any, paidDate?: any | null, dueDate: any, isOver: boolean, isPaid: boolean, status: ParticipantStatus, creationNotified: boolean, cancelationNotified: boolean, paidNotified: boolean } };

export type UpdateParticipantMutationVariables = Exact<{
    id: Scalars["Int"];
    updateParticipant: UpdateParticipantInput;
}>;


export type UpdateParticipantMutation = { __typename?: "Mutation", updateParticipant: { __typename?: "Participant", id: number, ip: string, school: string, email: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string, signUpDate: any, paidDate?: any | null, dueDate: any, isOver: boolean, isPaid: boolean, status: ParticipantStatus, creationNotified: boolean, cancelationNotified: boolean, paidNotified: boolean } };

export type UpdateParticipantsMutationVariables = Exact<{
    updateParticipants: Array<UpdateParticipantsItemInput> | UpdateParticipantsItemInput;
}>;


export type UpdateParticipantsMutation = { __typename?: "Mutation", updateParticipants: Array<{ __typename?: "Participant", id: number, ip: string, school: string, email: string, phone: string, variableSymbol: string, parentName: string, parentSurname: string, participantName: string, participantSurname: string, signUpDate: any, paidDate?: any | null, dueDate: any, isOver: boolean, isPaid: boolean, status: ParticipantStatus, creationNotified: boolean, cancelationNotified: boolean, paidNotified: boolean }> };

export type SettingsFragment = { __typename?: "Settings", allowedOver: number, capacity: number, signUpAllowed: boolean, signUpUntil: any, signUpFrom: any };

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { __typename?: "Query", settings: { __typename?: "Settings", allowedOver: number, capacity: number, signUpAllowed: boolean, signUpUntil: any, signUpFrom: any } };

export type UpdateSettingsMutationVariables = Exact<{
    updateSettings: UpdateSettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: "Mutation", updateSettings: { __typename?: "Settings", allowedOver: number, capacity: number, signUpAllowed: boolean, signUpUntil: any, signUpFrom: any } };

export type RemoveParticipantMutationVariables = Exact<{
    id: Scalars["Int"];
}>;


export type RemoveParticipantMutation = { __typename?: "Mutation", removeParticipant: boolean };

export type StatusActionMutationVariables = Exact<{
    id: Scalars["Int"];
    presumedStatus: ParticipantStatus;
}>;


export type StatusActionMutation = { __typename?: "Mutation", statusAction: boolean };

export type StatusActionAllOfStatusMutationVariables = Exact<{
    expectedStatus: ParticipantStatus;
}>;


export type StatusActionAllOfStatusMutation = { __typename?: "Mutation", statusActionAllOfStatus: boolean };

export type ClearPaidMutationVariables = Exact<{
    id: Scalars["Int"];
}>;


export type ClearPaidMutation = { __typename?: "Mutation", clearPaid: boolean };

export type LoginQueryVariables = Exact<{
    username: Scalars["String"];
    password: Scalars["String"];
}>;


export type LoginQuery = { __typename?: "Query", login: string };

export type StatisticsFragment = { __typename?: "Statistics", remainingCapacity: number, remainingCapacityOver: number, removedSignups: number, totalSignups: number, capacity: number };

export type GetStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsQuery = { __typename?: "Query", statistics: { __typename?: "Statistics", remainingCapacity: number, remainingCapacityOver: number, removedSignups: number, totalSignups: number, capacity: number } };

export const TableParticipantFragmentDoc = gql`
    fragment TableParticipant on Participant {
        id
        ip
        school
        email
        phone
        variableSymbol
        parentName
        parentSurname
        participantName
        participantSurname
        signUpDate
        paidDate
        dueDate
        isOver
        isPaid
        status
        creationNotified
        cancelationNotified
        paidNotified
    }
`
export const EmailStatisticsFragmentDoc = gql`
    fragment EmailStatistics on EmailStatistics {
        accepted
        canceled
        waitingForPayment
        withoutCancelationConfirmationEmail
        withoutEmailNotifyingOfFreeSpot
        withoutPaymentConfirmationEmail
    }
`
export const SettingsFragmentDoc = gql`
    fragment Settings on Settings {
        allowedOver
        capacity
        signUpAllowed
        signUpUntil
        signUpFrom
    }
`
export const StatisticsFragmentDoc = gql`
    fragment Statistics on Statistics {
        remainingCapacity
        remainingCapacityOver
        removedSignups
        totalSignups
        capacity
    }
`
export const GetEmailStatisticsDocument = gql`
    query GetEmailStatistics {
        emailStatistics {
            ...EmailStatistics
        }
    }
${EmailStatisticsFragmentDoc}`

/**
 * __useGetEmailStatisticsQuery__
 *
 * To run a query within a React component, call `useGetEmailStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmailStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<GetEmailStatisticsQuery, GetEmailStatisticsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetEmailStatisticsQuery, GetEmailStatisticsQueryVariables>(GetEmailStatisticsDocument, options)
}
export function useGetEmailStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailStatisticsQuery, GetEmailStatisticsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetEmailStatisticsQuery, GetEmailStatisticsQueryVariables>(GetEmailStatisticsDocument, options)
}
export type GetEmailStatisticsQueryHookResult = ReturnType<typeof useGetEmailStatisticsQuery>;
export type GetEmailStatisticsLazyQueryHookResult = ReturnType<typeof useGetEmailStatisticsLazyQuery>;
export type GetEmailStatisticsQueryResult = Apollo.QueryResult<GetEmailStatisticsQuery, GetEmailStatisticsQueryVariables>;
export const GetParticipantsDocument = gql`
    query GetParticipants {
        participants {
            ...TableParticipant
        }
    }
${TableParticipantFragmentDoc}`

/**
 * __useGetParticipantsQuery__
 *
 * To run a query within a React component, call `useGetParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParticipantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetParticipantsQuery(baseOptions?: Apollo.QueryHookOptions<GetParticipantsQuery, GetParticipantsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, options)
}
export function useGetParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParticipantsQuery, GetParticipantsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, options)
}
export type GetParticipantsQueryHookResult = ReturnType<typeof useGetParticipantsQuery>;
export type GetParticipantsLazyQueryHookResult = ReturnType<typeof useGetParticipantsLazyQuery>;
export type GetParticipantsQueryResult = Apollo.QueryResult<GetParticipantsQuery, GetParticipantsQueryVariables>;
export const NewParticipantDocument = gql`
    mutation NewParticipant($addParticipant: NewParticipantInput!) {
        addParticipant(newParticipant: $addParticipant) {
            ...TableParticipant
        }
    }
${TableParticipantFragmentDoc}`
export type NewParticipantMutationFn = Apollo.MutationFunction<NewParticipantMutation, NewParticipantMutationVariables>;

/**
 * __useNewParticipantMutation__
 *
 * To run a mutation, you first call `useNewParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newParticipantMutation, { data, loading, error }] = useNewParticipantMutation({
 *   variables: {
 *      addParticipant: // value for 'addParticipant'
 *   },
 * });
 */
export function useNewParticipantMutation(baseOptions?: Apollo.MutationHookOptions<NewParticipantMutation, NewParticipantMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<NewParticipantMutation, NewParticipantMutationVariables>(NewParticipantDocument, options)
}
export type NewParticipantMutationHookResult = ReturnType<typeof useNewParticipantMutation>;
export type NewParticipantMutationResult = Apollo.MutationResult<NewParticipantMutation>;
export type NewParticipantMutationOptions = Apollo.BaseMutationOptions<NewParticipantMutation, NewParticipantMutationVariables>;
export const UpdateParticipantDocument = gql`
    mutation UpdateParticipant($id: Int!, $updateParticipant: UpdateParticipantInput!) {
        updateParticipant(id: $id, updateParticipant: $updateParticipant) {
            ...TableParticipant
        }
    }
${TableParticipantFragmentDoc}`
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
 *      updateParticipant: // value for 'updateParticipant'
 *   },
 * });
 */
export function useUpdateParticipantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<UpdateParticipantMutation, UpdateParticipantMutationVariables>(UpdateParticipantDocument, options)
}
export type UpdateParticipantMutationHookResult = ReturnType<typeof useUpdateParticipantMutation>;
export type UpdateParticipantMutationResult = Apollo.MutationResult<UpdateParticipantMutation>;
export type UpdateParticipantMutationOptions = Apollo.BaseMutationOptions<UpdateParticipantMutation, UpdateParticipantMutationVariables>;
export const UpdateParticipantsDocument = gql`
    mutation UpdateParticipants($updateParticipants: [UpdateParticipantsItemInput!]!) {
        updateParticipants(updateParticipants: $updateParticipants) {
            ...TableParticipant
        }
    }
${TableParticipantFragmentDoc}`
export type UpdateParticipantsMutationFn = Apollo.MutationFunction<UpdateParticipantsMutation, UpdateParticipantsMutationVariables>;

/**
 * __useUpdateParticipantsMutation__
 *
 * To run a mutation, you first call `useUpdateParticipantsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParticipantsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParticipantsMutation, { data, loading, error }] = useUpdateParticipantsMutation({
 *   variables: {
 *      updateParticipants: // value for 'updateParticipants'
 *   },
 * });
 */
export function useUpdateParticipantsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParticipantsMutation, UpdateParticipantsMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<UpdateParticipantsMutation, UpdateParticipantsMutationVariables>(UpdateParticipantsDocument, options)
}
export type UpdateParticipantsMutationHookResult = ReturnType<typeof useUpdateParticipantsMutation>;
export type UpdateParticipantsMutationResult = Apollo.MutationResult<UpdateParticipantsMutation>;
export type UpdateParticipantsMutationOptions = Apollo.BaseMutationOptions<UpdateParticipantsMutation, UpdateParticipantsMutationVariables>;
export const GetSettingsDocument = gql`
    query GetSettings {
        settings {
            ...Settings
        }
    }
${SettingsFragmentDoc}`

/**
 * __useGetSettingsQuery__
 *
 * To run a query within a React component, call `useGetSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options)
}
export function useGetSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options)
}
export type GetSettingsQueryHookResult = ReturnType<typeof useGetSettingsQuery>;
export type GetSettingsLazyQueryHookResult = ReturnType<typeof useGetSettingsLazyQuery>;
export type GetSettingsQueryResult = Apollo.QueryResult<GetSettingsQuery, GetSettingsQueryVariables>;
export const UpdateSettingsDocument = gql`
    mutation UpdateSettings($updateSettings: UpdateSettingsInput!) {
        updateSettings(updateSettings: $updateSettings) {
            ...Settings
        }
    }
${SettingsFragmentDoc}`
export type UpdateSettingsMutationFn = Apollo.MutationFunction<UpdateSettingsMutation, UpdateSettingsMutationVariables>;

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      updateSettings: // value for 'updateSettings'
 *   },
 * });
 */
export function useUpdateSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(UpdateSettingsDocument, options)
}
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = Apollo.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const RemoveParticipantDocument = gql`
    mutation RemoveParticipant($id: Int!) {
        removeParticipant(id: $id)
    }
`
export type RemoveParticipantMutationFn = Apollo.MutationFunction<RemoveParticipantMutation, RemoveParticipantMutationVariables>;

/**
 * __useRemoveParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParticipantMutation, { data, loading, error }] = useRemoveParticipantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveParticipantMutation, RemoveParticipantMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<RemoveParticipantMutation, RemoveParticipantMutationVariables>(RemoveParticipantDocument, options)
}
export type RemoveParticipantMutationHookResult = ReturnType<typeof useRemoveParticipantMutation>;
export type RemoveParticipantMutationResult = Apollo.MutationResult<RemoveParticipantMutation>;
export type RemoveParticipantMutationOptions = Apollo.BaseMutationOptions<RemoveParticipantMutation, RemoveParticipantMutationVariables>;
export const StatusActionDocument = gql`
    mutation StatusAction($id: Int!, $presumedStatus: ParticipantStatus!) {
        statusAction(id: $id, presumedStatus: $presumedStatus)
    }
`
export type StatusActionMutationFn = Apollo.MutationFunction<StatusActionMutation, StatusActionMutationVariables>;

/**
 * __useStatusActionMutation__
 *
 * To run a mutation, you first call `useStatusActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStatusActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [statusActionMutation, { data, loading, error }] = useStatusActionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      presumedStatus: // value for 'presumedStatus'
 *   },
 * });
 */
export function useStatusActionMutation(baseOptions?: Apollo.MutationHookOptions<StatusActionMutation, StatusActionMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<StatusActionMutation, StatusActionMutationVariables>(StatusActionDocument, options)
}
export type StatusActionMutationHookResult = ReturnType<typeof useStatusActionMutation>;
export type StatusActionMutationResult = Apollo.MutationResult<StatusActionMutation>;
export type StatusActionMutationOptions = Apollo.BaseMutationOptions<StatusActionMutation, StatusActionMutationVariables>;
export const StatusActionAllOfStatusDocument = gql`
    mutation StatusActionAllOfStatus($expectedStatus: ParticipantStatus!) {
        statusActionAllOfStatus(expectedStatus: $expectedStatus)
    }
`
export type StatusActionAllOfStatusMutationFn = Apollo.MutationFunction<StatusActionAllOfStatusMutation, StatusActionAllOfStatusMutationVariables>;

/**
 * __useStatusActionAllOfStatusMutation__
 *
 * To run a mutation, you first call `useStatusActionAllOfStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStatusActionAllOfStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [statusActionAllOfStatusMutation, { data, loading, error }] = useStatusActionAllOfStatusMutation({
 *   variables: {
 *      expectedStatus: // value for 'expectedStatus'
 *   },
 * });
 */
export function useStatusActionAllOfStatusMutation(baseOptions?: Apollo.MutationHookOptions<StatusActionAllOfStatusMutation, StatusActionAllOfStatusMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<StatusActionAllOfStatusMutation, StatusActionAllOfStatusMutationVariables>(StatusActionAllOfStatusDocument, options)
}

export type StatusActionAllOfStatusMutationHookResult = ReturnType<typeof useStatusActionAllOfStatusMutation>;
export type StatusActionAllOfStatusMutationResult = Apollo.MutationResult<StatusActionAllOfStatusMutation>;
export type StatusActionAllOfStatusMutationOptions = Apollo.BaseMutationOptions<StatusActionAllOfStatusMutation, StatusActionAllOfStatusMutationVariables>;
export const ClearPaidDocument = gql`
    mutation ClearPaid($id: Int!) {
        clearPaid(id: $id)
    }
`
export type ClearPaidMutationFn = Apollo.MutationFunction<ClearPaidMutation, ClearPaidMutationVariables>;

/**
 * __useClearPaidMutation__
 *
 * To run a mutation, you first call `useClearPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearPaidMutation, { data, loading, error }] = useClearPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClearPaidMutation(baseOptions?: Apollo.MutationHookOptions<ClearPaidMutation, ClearPaidMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<ClearPaidMutation, ClearPaidMutationVariables>(ClearPaidDocument, options)
}

export type ClearPaidMutationHookResult = ReturnType<typeof useClearPaidMutation>;
export type ClearPaidMutationResult = Apollo.MutationResult<ClearPaidMutation>;
export type ClearPaidMutationOptions = Apollo.BaseMutationOptions<ClearPaidMutation, ClearPaidMutationVariables>;
export const LoginDocument = gql`
    query Login($username: String!, $password: String!) {
        login(login: {username: $username, password: $password})
    }
`

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options)
}
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options)
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const GetStatisticsDocument = gql`
    query GetStatistics {
        statistics {
            ...Statistics
        }
    }
${StatisticsFragmentDoc}`

/**
 * __useGetStatisticsQuery__
 *
 * To run a query within a React component, call `useGetStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, options)
}
export function useGetStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, options)
}
export type GetStatisticsQueryHookResult = ReturnType<typeof useGetStatisticsQuery>;
export type GetStatisticsLazyQueryHookResult = ReturnType<typeof useGetStatisticsLazyQuery>;
export type GetStatisticsQueryResult = Apollo.QueryResult<GetStatisticsQuery, GetStatisticsQueryVariables>;
