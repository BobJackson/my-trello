type Item = {
    id: string
}

export const findItemIndexById = <T extends Item>(
    items: T[],
    id: string
) => {
    return items.findIndex(item => item.id === id)
}

function removeItemAtIndex<T extends Item>(
    from: T[],
    index: number
) {
    return [
        ...from.slice(0, index),
        ...from.slice(index + 1)
    ]
}

function insertItemAtIndex<T extends Item>(
    list: T[],
    item: T,
    index: number
) {
    return [
        ...list.slice(0, index),
        item,
        ...list.slice(index)
    ]
}

export function moveItem<T extends Item>(
    list: T[],
    from: number,
    to: number
) {
    const item = list[from]
    return insertItemAtIndex(
        removeItemAtIndex(list, from),
        item,
        to
    )
}

