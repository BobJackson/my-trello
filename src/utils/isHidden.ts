import {DragItem} from "../DragItem.tsx";

export const isHidden = (
    draggedItem: DragItem | null,
    itemType: string,
    id: string,
    isPreview?: boolean
): boolean => {
    return Boolean(
        !isPreview
        && draggedItem
        && draggedItem.type === itemType
        && draggedItem.id === id
    )
}
