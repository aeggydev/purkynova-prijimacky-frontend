import {gql} from "@apollo/client"

export const GET_PEOPLE  = gql`
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