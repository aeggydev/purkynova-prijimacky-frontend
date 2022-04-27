import styled from "styled-components"
import Save from "../../../../Icons/Save"
import Cancel from "../../../../Icons/Cancel"
import EmailConfirm from "../../../../Icons/EmailConfirm"
import EmailCancel from "../../../../Icons/EmailCancel"
import ForceAdd from "../../../../Icons/ForceAdd"
import DownloadExport from "../../../../Icons/DownloadExport"
import {
    GetParticipantsDocument,
    ParticipantStatus,
    UpdateParticipantsItemInput,
    useGetParticipantsQuery,
    useStatusActionAllOfStatusMutation,
    useUpdateParticipantsMutation
} from "../../../../graphql/graphql"
import { useDispatch, useSelector } from "react-redux"
import { clear } from "../../../../store/table"
import { RootState } from "../../../../store/store"
import { useState } from "react"
import { RegisterParticipant } from "./Modals/RegisterParticipant"
import { Button, useToast } from "@chakra-ui/react"
import { useApolloClient } from "@apollo/client"

export function ButtonArea() {
    const tableChanges = useSelector((state: RootState) => state.table.changes)
    const apollo = useApolloClient()
    const { loading, data } = useGetParticipantsQuery()
    const toast = useToast()
    const dispatch = useDispatch()
    const [updateParticipantsMutation] = useUpdateParticipantsMutation({
        refetchQueries: [
            GetParticipantsDocument
        ]
    })
    const [statusActionAllOfStatus] = useStatusActionAllOfStatusMutation()

    const [registerOpen, setRegisterOpen] = useState(false)


    function onClick() {
        toast({
            title: "Neimplementovaná funkce",
            description: "Tato funkce nebyla zatím implementována",
            status: "error",
            isClosable: true
        })
    }

    const canConfirmPaid = !data?.participants.some(x => x.status === "PAID_UNCONFIRMED")

    async function handleAllOf(status: ParticipantStatus) {
        await statusActionAllOfStatus({ variables: { expectedStatus: status } })
        apollo.refetchQueries({
            include: [GetParticipantsDocument]
        })
    }

    const canCancelLate = !data?.participants.some(x => x.status === "UNPAID_LATE")

    function saveChanges() {
        const entries = Object.entries(tableChanges)
        const updateData: UpdateParticipantsItemInput[] = entries.map(([id, data]) => ({ id: parseInt(id, 10), data }))
        const promise = updateParticipantsMutation({
                variables: { updateParticipants: updateData },
                onCompleted: () => {
                    console.log("done syncing!", entries)
                },
                onError: error => toast({ title: "Problém při ukládání dat", status: "error" })
            }
        )
    }

    async function saveDatasheet() {
        const headers = new Headers()
        headers.append("authorization", `Bearer ${localStorage.getItem("token")}`)
        const query = await fetch("https://localhost:7141/file/table.csv", { headers })
        const blob = await query.blob()

        const dataUrl = window.URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = dataUrl
        anchor.download = "table.csv"
        anchor.click()
        window.URL.revokeObjectURL(dataUrl)
    }

    function discardChanges() {
        dispatch(clear())
    }

    return (
        <>
            <RegisterParticipant setStatus={setRegisterOpen} isOpen={registerOpen} />
            <ButtonAreaEl>
                <ButtonRowEl>
                    <Button color="white" bg="#46BC87" onClick={saveChanges} leftIcon={<Save color="white" />}>
                        Potvrdit změny
                    </Button>
                    <Button color="white" bg="#AC1821" onClick={discardChanges} leftIcon={<Cancel color="white" />}>
                        Zahodit změny
                    </Button>
                    <EditStatusEl>Do ukončení režimu úpravy zbývá 05:16. Úprava zahájena 28.11.2021
                        08:12.</EditStatusEl>
                </ButtonRowEl>
                <ButtonRowEl>
                    <Button color="white" bg="#CBBE4D" onClick={() => handleAllOf(ParticipantStatus.PaidUnconfirmed)}
                            disabled={loading || canConfirmPaid}
                            isLoading={loading}
                            leftIcon={<EmailConfirm color="white" />}>
                        Potvrdit uhrazené
                    </Button>
                    <Button color="white" bg="#AC1821" onClick={() => handleAllOf(ParticipantStatus.UnpaidLate)}
                            disabled={loading || canCancelLate}
                            isLoading={loading}
                            leftIcon={<EmailCancel color="white" />}>
                        Zrušit neuhrazené po termínu
                    </Button>
                    <Button color="white" bg="#46BC87" onClick={() => setRegisterOpen(true)}
                            leftIcon={<ForceAdd color="white" />}>
                        Přidat přihlášku
                    </Button>
                    <Button color="white" bg="#46BC87" onClick={saveDatasheet}
                            leftIcon={<DownloadExport color="white" />}>
                        Stáhnout
                    </Button>
                </ButtonRowEl>
                <div />
            </ButtonAreaEl>
        </>
    )
}

const ButtonAreaEl = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonRowEl = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.5em;
    padding: 8px 3em;
    align-items: center;
    align-content: stretch;
`
const EditStatusEl = styled.div`
    font-weight: 700;
    text-align: center;
    flex-grow: 1;
`
