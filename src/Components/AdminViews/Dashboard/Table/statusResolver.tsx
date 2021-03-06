import {
    GetEmailStatisticsDocument,
    GetParticipantsDocument,
    Participant,
    ParticipantStatus,
    StatusActionDocument
} from "../../../../graphql/graphql"
import { Canceled, Confirmed, Normal, Paid, Unpaid, UnpaidLate } from "../../../../Icons/ParticipantStatus"
import { ApolloClient } from "@apollo/client"

export interface IResolved {
    color: string // Hex code
    icon: JSX.Element
    tooltip: string
    execute: (participant: Participant, apollo: ApolloClient<object>) => Promise<boolean>
}

const notImplemented: IResolved["execute"] = async participant => {
    console.log(participant)
    return true
}

export function Resolve(participant: Participant): IResolved {
    switch (participant.status) {
        case ParticipantStatus.Canceled:
            return {
                color: "#000000",
                icon: Canceled,
                tooltip: "Přihláška zrušena",
                execute: notImplemented
            }
        case ParticipantStatus.Error:
            return {
                color: "#F00",
                icon: Normal,
                tooltip: "Nastala chyba",
                execute: notImplemented
            }
        case ParticipantStatus.NotNotified:
            return {
                color: "#FFF",
                icon: Normal,
                tooltip: "Ještě nebyl poslán email o zápisu",
                execute: notImplemented
            }
        case ParticipantStatus.PaidConfirmed:
            return {
                color: "#B9E6D2",
                icon: Confirmed,
                tooltip: "Email potvrzující platbu byl poslán",
                execute: notImplemented
            }
        case ParticipantStatus.PaidUnconfirmed:
            return {
                color: "#F5DB00",
                icon: Paid,
                tooltip: "Email potvrzující platba ještě nebyl poslán",
                execute: async (participant, apollo) => {
                    const data = await apollo.mutate({
                        mutation: StatusActionDocument,
                        variables: {
                            id: participant.id,
                            presumedStatus: participant.status
                        },
                        refetchQueries: [GetParticipantsDocument, GetEmailStatisticsDocument]
                    })
                    return data.data as boolean
                }
            }
        case ParticipantStatus.Unpaid:
            return {
                color: "#939393",
                icon: Unpaid,
                tooltip: "Účast ještě nebyla zaplacena",
                execute: notImplemented
            }
        case ParticipantStatus.UnpaidLate:
            return {
                color: "#AC1821",
                icon: UnpaidLate,
                tooltip: "Účast nebyla včas zaplacena, čeká na posunutí datumu platby nebo zrušení",
                execute: async (participant, apollo) => {
                    const data = await apollo.mutate({
                        mutation: StatusActionDocument,
                        variables: {
                            id: participant.id,
                            presumedStatus: participant.status
                        },
                        refetchQueries: [GetParticipantsDocument, GetEmailStatisticsDocument]
                    })
                    return data.data as boolean
                }
            }
    }
}
