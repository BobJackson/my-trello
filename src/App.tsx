import {AppContainer} from "./styles"
import {Column} from "./Column.tsx";
import {AddNewItem} from "./AddNewItem.tsx";

function App() {
  return (
    <AppContainer>
        <Column text="Todo:"/>
        <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log}/>
    </AppContainer>
  )
}

export default App
