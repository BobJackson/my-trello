import {ColumnContainer, ColumnTitle} from "./styles.ts";
import React, {useRef} from "react";
import {Card} from "./Card.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";
import {addTask, moveList} from "./state/actions.ts";
import {useDrop} from "react-dnd";
import {throttle} from "throttle-debounce-ts";
import {useItemDrag} from "./utils/useItemDrag.ts";

type ColumnProps = {
    text: string
    id: string
    children?: React.ReactNode
}

export const Column = ({text, id}: ColumnProps) => {
    const {draggedItem, getTasksByListId, dispatch} = useAppState()

    const tasks = getTasksByListId(id)


    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: "COLUMN",
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            }
        })
    })

    const {drag} = useItemDrag({type: "COLUMN", id, text})

    drag(drop(ref))

    return (
        <ColumnContainer ref={ref}>
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