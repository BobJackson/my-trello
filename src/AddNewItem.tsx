import {useState} from "react";
import {AddItemButton} from "./styles.ts";
import {NewItemForm} from "./NewItemForm.tsx";

type AddNewItemProps = {
    onAdd(text: string): void
    toggleButtonText: string
    dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)
    const {onAdd, toggleButtonText, dark} = props

    if (showForm) {
        return (
            <NewItemForm onAdd={(text) => {
                onAdd(text)
                setShowForm(false)
            }}
            />
        )
    }

    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}
