import {ColumnContainer, ColumnTitle} from "./styles.ts";
import React from "react";
import {Card} from "./Card.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";

type ColumnProps = {
    text: string
    id: string
    children?: React.ReactNode
}

export const Column = ({text, id}: ColumnProps) => {
    const {getTasksByListId} = useAppState()

    const tasks = getTasksByListId(id)

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => (
                <Card key={task.id} text={task.text} id={task.id}/>
            ))}
            <AddNewItem
                onAdd={console.log}
                toggleButtonText="+ Add another card"
                dark/>
        </ColumnContainer>
    )
}