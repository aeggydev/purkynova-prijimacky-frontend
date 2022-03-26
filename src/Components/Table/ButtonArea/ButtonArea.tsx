import styled from "styled-components"
import { Button } from "./Button"
import Save from "../../../Icons/Save"
import Cancel from "../../../Icons/Cancel"
import EmailConfirm from "../../../Icons/EmailConfirm"
import EmailCancel from "../../../Icons/EmailCancel"
import ForceAdd from "../../../Icons/ForceAdd"
import DownloadExport from "../../../Icons/DownloadExport"
import {
    GetParticipantsDocument,
    UpdateParticipantsItemInput,
    useUpdateParticipantsMutation
} from "../../../graphql/graphql"
import { useDispatch, useSelector } from "react-redux"
import { clear } from "../../../store/table"
import { RootState } from "../../../store/store"

export function ButtonArea() {
    const tableChanges = useSelector((state: RootState) => state.table.changes)
    const dispatch = useDispatch()
    const [updateParticipantsMutation] = useUpdateParticipantsMutation({
        refetchQueries: [
            GetParticipantsDocument
        ]
    })

    function onClick() {
        alert("Error: function is not implemented")
    }

    function saveChanges() {
        const entries = Object.entries(tableChanges)
        const updateData: UpdateParticipantsItemInput[] = entries.map(([id, data]) => ({ id: parseInt(id, 10), data }))
        const promise = updateParticipantsMutation({
            variables: { updateParticipants: updateData },
            onCompleted: () => {
                console.log("done syncing!", entries)
            }
        })
    }

    function discardChanges() {
        dispatch(clear())
    }

    return (
        <ButtonAreaEl>
            <ButtonRowEl>
                <Button text="Potvrdit změny" bg="#46BC87" click={saveChanges} icon={<Save color="white" />} />
                <Button text="Zahodit změny" bg="#AC1821" click={discardChanges} icon={<Cancel color="white" />} />
                <EditStatusEl>Do ukončení režimu úpravy zbývá 05:16. Úprava zahájena 28.11.2021 08:12.</EditStatusEl>
            </ButtonRowEl>
            <ButtonRowEl>
                <Button text="Potvrdit uhrazené" bg="#CBBE4D" click={onClick} icon={<EmailConfirm color="white" />} />
                <Button text="Zrušit neuhrazené po termínu" bg="#AC1821" click={onClick}
                        icon={<EmailCancel color="white" />} />
                <Button text="Přidat přihlášku" bg="#46BC87" click={onClick} icon={<ForceAdd color="white" />} />
                <Button text="Stáhnout" bg="#46BC87" click={onClick} icon={<DownloadExport color="white" />} />
            </ButtonRowEl>
            <div />
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
