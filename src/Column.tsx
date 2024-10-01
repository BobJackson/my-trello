import {CardContainer, ColumnContainer, ColumnTitle} from "./styles.ts";
import React from "react";

type ColumnProps = {
    text: string
    children?: React.ReactNode
}

export const Column = ({text}: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            <CardContainer>Generate app scaffold</CardContainer>
            <CardContainer>Second Item</CardContainer>
            <CardContainer>Third Item</CardContainer>
        </ColumnContainer>
    )
}