import {CardContainer} from "./styles.ts";
import {useAppState} from "./state/AppStateContext.tsx";
import {useRef} from "react";
import {isHidden} from "./utils/isHidden.ts";
import {useItemDrag} from "./utils/useItemDrag.ts";
import {useDrop} from "react-dnd";
import {throttle} from "throttle-debounce-ts";
import {moveTask, setDraggedItem} from "./state/actions.ts";


type CardProps = {
    text: string
    id: string
    columnId: string
    isPreview?: boolean
}

export const Card = ({text, id, columnId, isPreview}: CardProps) => {
    const {draggedItem, dispatch} = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const {drag} = useItemDrag({type: "CARD", id, text, columnId})
    const [, drop] = useDrop({
        accept: "CARD",
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type !== "CARD") {
                return
            }
            if (draggedItem.id === id) {
                return
            }
            dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
            dispatch(setDraggedItem({...draggedItem, columnId}))
        })
    })
    drag(drop(ref))

    return (
        <CardContainer
            isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
            isPreview={isPreview}
            ref={ref}
        >
            {text}
        </CardContainer>
    )
}