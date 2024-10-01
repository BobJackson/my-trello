import {ColumnContainer, ColumnTitle} from "./styles.ts";
import React from "react";
import {Card} from "./Card.tsx";
import {AddNewItem} from "./AddNewItem.tsx";

type ColumnProps = {
    text: string
    children?: React.ReactNode
}

export const Column = ({text}: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            <Card text="Generate app scaffold"/>
            <Card text="Learn TypeScript"/>
            <Card text="Third Item"/>
            <AddNewItem onAdd={console.log} toggleButtonText="+ Add another card" dark/>
        </ColumnContainer>
    )
}