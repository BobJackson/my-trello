import React, {createContext, Dispatch, useContext, useEffect} from "react";
import {AppState, appStateReducer, List, Task} from "./appStateReducer.ts";
import {Action} from "./actions.ts";
import {useImmerReducer} from "use-immer";
import {DragItem} from "../DragItem.tsx";
import {save} from "../api.ts";
import {withInitialState} from "../withInitialState.tsx";

type AppStateContextProps = {
    draggedItem: DragItem | null
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
)

interface AppStateProviderProps {
    children?: React.ReactNode
    initialState: AppState
}

export const AppStateProvider =
    withInitialState<AppStateProviderProps>(
        ({children, initialState}) => {
            const [state, dispatch] = useImmerReducer(appStateReducer, initialState)

            useEffect(() => {
                save(state)
            }, [state])

            const {draggedItem, lists} = state
            const getTasksByListId = (id: string) => {
                return lists.find(list => list.id === id)?.tasks || []
            }

            return (
                <AppStateContext.Provider value={{draggedItem, lists, getTasksByListId, dispatch}}>
                    {children}
                </AppStateContext.Provider>
            )
        }
    )

export const useAppState = () => {
    return useContext(AppStateContext)
}
