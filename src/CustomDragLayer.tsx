import {useAppState} from "./state/AppStateContext.tsx";
import {useDragLayer} from "react-dnd";
import {CustomDragLayerContainer, DragPreviewWrapper} from "./styles.ts";
import {Column} from "./Column.tsx";

export const CustomDragLayer = () => {
    const {draggedItem} = useAppState()
    const {currentOffset} = useDragLayer(monitor => ({
        currentOffset: monitor.getSourceClientOffset()
    }))

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                <Column text={draggedItem.text} id={draggedItem.id}/>
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null
}