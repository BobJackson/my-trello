import {AppContainer} from "./styles"
import {Column} from "./Column.tsx";
import {AddNewItem} from "./AddNewItem.tsx";
import {useAppState} from "./state/AppStateContext.tsx";

function App() {
    const {lists} = useAppState()

  return (
      <AppContainer>
          {lists.map(list => (
              <Column text={list.text} key={list.id} id={list.id}/>
          ))}
          <AddNewItem
              toggleButtonText="+ Add another list"
              onAdd={console.log}
          />
    </AppContainer>
  )
}

export default App
