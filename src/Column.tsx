import {ColumnContainer, ColumnTitle} from "./styles.ts";
import React from "react";
import {Card} from "./Card.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";
import {addTask} from "./state/actions.ts";

type ColumnProps = {
    text: string
    id: string
    children?: React.ReactNode
}

export const Column = ({text, id}: ColumnProps) => {
    const {getTasksByListId, dispatch} = useAppState()

    const tasks = getTasksByListId(id)

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => (
                <Card key={task.id} text={task.text} id={task.id}/>
            ))}
            <AddNewItem
                onAdd={(text) => dispatch(addTask(text, id))}
                toggleButtonText="+ Add another card"
                dark/>
        </ColumnContainer>
    )
}