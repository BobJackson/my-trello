import {AppContainer} from "./styles"
import {Column} from "./Column.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";
import {addList} from "./state/actions.ts";

function App() {
    const {lists, dispatch} = useAppState()

  return (
      <AppContainer>
          {lists.map(list => (
              <Column text={list.text} key={list.id} id={list.id}/>
          ))}
          <AddNewItem
              toggleButtonText="+ Add another list"
              onAdd={(text) => dispatch(addList(text))}
          />
    </AppContainer>
  )
}

export default App
