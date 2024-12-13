import ExpenseTracker from "./ExpenseTracker";
import { SnackbarProvider } from "notistack"
function App() {
  return (
    <SnackbarProvider>
      <div>
      <ExpenseTracker />
    </div>
    </SnackbarProvider>
  );
}

export default App;
