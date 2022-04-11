import { Participant, ParticipantStatus } from "../../../../graphql/graphql"
import { Canceled, Confirmed, Normal, Paid, Unpaid, UnpaidLate } from "../../../../Icons/ParticipantStatus"

export interface IResolved {
    color: string // Hex code
    icon: JSX.Element
    execute: (participant: Participant) => boolean // Successful or not
}

const notImplemented: IResolved["execute"] = participant => {
    console.log(participant)
    return true
}

export function Resolve(participant: Participant): IResolved {
    switch (participant.status) {
        case ParticipantStatus.Canceled:
            return {
                color: "#000000",
                icon: Canceled,
                execute: notImplemented
            }
        case ParticipantStatus.Error:
            return {
                color: "#F00",
                icon: Normal,
                execute: notImplemented
            }
        case ParticipantStatus.NotNotified:
            return {
                color: "#FFF",
                icon: Normal,
                execute: notImplemented
            }
        case ParticipantStatus.PaidConfirmed:
            return {
                color: "#B9E6D2",
                icon: Confirmed,
                execute: notImplemented
            }
        case ParticipantStatus.PaidUnconfirmed:
            return {
                color: "#F5DB00",
                icon: Paid,
                execute: notImplemented
            }
        case ParticipantStatus.Unpaid:
            return {
                color: "#939393",
                icon: Unpaid,
                execute: notImplemented
            }
        case ParticipantStatus.UnpaidLate:
            return {
                color: "#AC1821",
                icon: UnpaidLate,
                execute: notImplemented
            }
    }
}
