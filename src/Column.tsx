import {ColumnContainer, ColumnTitle} from "./styles.ts";
import React, {useRef} from "react";
import {Card} from "./Card.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";
import {addTask, moveList, moveTask, setDraggedItem} from "./state/actions.ts";
import {useDrop} from "react-dnd";
import {throttle} from "throttle-debounce-ts";
import {useItemDrag} from "./utils/useItemDrag.ts";
import {isHidden} from "./utils/isHidden.ts";

type ColumnProps = {
    text: string
    id: string
    children?: React.ReactNode,
    isPreview?: boolean
}

export const Column = ({text, id, isPreview}: ColumnProps) => {
    const {draggedItem, getTasksByListId, dispatch} = useAppState()

    const tasks = getTasksByListId(id)


    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            } else {
                if (draggedItem.columnId === id) {
                    return
                }
                if (tasks.length) {
                    return;
                }
                dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
                dispatch(setDraggedItem({...draggedItem, columnId: id}))
            }
        })
    })

    const {drag} = useItemDrag({type: "COLUMN", id, text})

    drag(drop(ref))

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => (
                <Card columnId={id} key={task.id} text={task.text} id={task.id}/>
            ))}
            <AddNewItem
                onAdd={(text) => dispatch(addTask(text, id))}
                toggleButtonText="+ Add another card"
                dark/>
        </ColumnContainer>
    )
}