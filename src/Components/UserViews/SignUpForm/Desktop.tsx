import ShadowBox from "../../Containers/ShadowBox"
import React from "react"
import ContentContainer from "../../Containers/ContentContainer"
import ApplicationCount from "../Reusable/ApplicationCount"
import Form from "./Form"

export default function DForm() {
    return (
        <ContentContainer>
            <ApplicationCount />
            <ShadowBox mx="4em" position="relative" alignContent="center">
                <Form />
            </ShadowBox>
        </ContentContainer>
    )
}
