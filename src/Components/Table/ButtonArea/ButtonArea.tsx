import styled from "styled-components"
import { Button } from "./Button"
import Save from "../../../Icons/Save"
import Cancel from "../../../Icons/Cancel"
import EmailConfirm from "../../../Icons/EmailConfirm"
import EmailCancel from "../../../Icons/EmailCancel"
import ForceAdd from "../../../Icons/ForceAdd"
import DownloadExport from "../../../Icons/DownloadExport"
import { useContext } from "react"
import { TableContext } from "../../Views/Dashboard"
import { GetParticipantsDocument, useUpdateParticipantMutation } from "../../../graphql/graphql"

export function ButtonArea() {
    const table = useContext(TableContext)
    const [updateParticipantMutation, _] = useUpdateParticipantMutation({
        refetchQueries: [
            GetParticipantsDocument
        ]
    })

    function onClick() {
    }

    function saveChanges() {
        const entries = Object.entries(table.changes)
        const promises = entries.map(entry => {
            return updateParticipantMutation({ variables: { id: parseInt(entry[0], 10), updateParticipant: entry[1] } })
        })
        Promise.all(promises).then(() => console.log("done syncing!", entries))
    }

    return (
        <ButtonAreaEl>
            <ButtonRowEl>
                <Button text="Potvrdit změny" bg="#46BC87" click={saveChanges} icon={<Save color="white" />} />
                <Button text="Zahodit změny" bg="#AC1821" click={onClick} icon={<Cancel color="white" />} />
                <EditStatusEl>Do ukončení režimu úpravy zbývá 05:16. Úprava zahájena 28.11.2021 08:12.</EditStatusEl>
            </ButtonRowEl>
            <ButtonRowEl>
                <Button text="Potvrdit uhrazené" bg="#CBBE4D" click={onClick} icon={<EmailConfirm color="white" />} />
                <Button text="Zrušit neuhrazené po termínu" bg="#AC1821" click={onClick}
                        icon={<EmailCancel color="white" />} />
                <Button text="Přidat přihlášku" bg="#46BC87" click={onClick} icon={<ForceAdd color="white" />} />
                <Button text="Stáhnout" bg="#46BC87" click={onClick} icon={<DownloadExport color="white" />} />
            </ButtonRowEl>
            <div></div>
        </ButtonAreaEl>
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
