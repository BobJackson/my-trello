import {DragItem} from "../DragItem.tsx";
import {useAppState} from "../state/AppStateContext.tsx";
import {useDrag} from "react-dnd";
import {setDraggedItem} from "../state/actions.ts";

export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item))
            return item
        },
        end: () => dispatch(setDraggedItem(null))
    })

    return {drag}
}