import {useRef,useState} from "react"
import AddIncomeModal from "./Modals/AddIncomeModal"
import AddExpenseModal from "./Modals/AddExpenseModal"
import RecentTransactionList from "./Recent Transactions/RecentTransaction"
function ExpenseTracker(){
    const[balance,setBalance] = useState(5000)
    const[expenseList,setExpenseList] = useState([])
    const dialogRefIncome = useRef(null)
    const dialogRefExpense = useRef(null)
    return(
        <div>
            <header>
                Expense Tracker
            </header>
            <div>
                <div>
                    <p>Wallet Balace: {balance}</p>
                    <button onClick={() => dialogRefIncome.current?.showModal()}>+Add Income</button>
                </div>
                <div>
                    <p>Expenses: </p>
                    <button onClick={()=> dialogRefExpense.current?.showModal()}>+Add Expense</button>
                </div>
            </div>
            <AddIncomeModal  ref = {dialogRefIncome} balance= {balance} setBalance={setBalance}/>
            <AddExpenseModal ref= {dialogRefExpense} balance= {balance} setBalance={setBalance} expenseList={expenseList} setExpenseList={setExpenseList} />
            <RecentTransactionList expenseList={expenseList} setBalance={setBalance} setExpenseList={setExpenseList} balance={balance}/>
        </div>
    )
}
export default ExpenseTracker;