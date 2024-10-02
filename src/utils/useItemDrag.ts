import {DragItem} from "../DragItem.tsx";
import {useAppState} from "../state/AppStateContext.tsx";
import {useDrag} from "react-dnd";
import {setDraggedItem} from "../state/actions.ts";
import {useEffect} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";

export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag, preview] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item))
            return item
        },
        end: () => dispatch(setDraggedItem(null))
    })
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview])
    return {drag}
}