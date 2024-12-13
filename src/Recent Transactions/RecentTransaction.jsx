import TransactionListCard from "../TransactionListCard/TransactionListCard"
import AddExpenseModal from "../Modals/AddExpenseModal"
import styles from "./RecentTransactions.module.css"
import {useRef,useState,useEffect} from "react"
import Pagination from "../Pagination/pagination"

const RecentTransactionList = ({expenseList,setBalance,setExpenseList,balance}) => {
    const dialogRefExpense = useRef(null)
    const[editedObj,setEditedObj] = useState(null)
    const[editFlag,setEditFlag] = useState(false)
    const maximumRecords = 3;
    const[currentPage,setCurrentPage] = useState(1)
    const[recentTransactions,setResetTransactions] = useState([])

    const handleDelete = (id) => {
        const itemToBeDeleted = expenseList.find((item)=> item.id === id)
        const price = Number(itemToBeDeleted.price)
        setBalance((prev) => prev+price)
        setExpenseList((prev)=>prev.filter((item)=>item.id !== id))
    }
    const handleEdit =(transObj) => {
        //simply pass the object of which the edit option is clicked
        setEditedObj(transObj)
        //this is required for a significant change to run the useEffect
        setEditFlag(true)
        //when the edit option is clicked then the modal is opened
        dialogRefExpense.current?.showModal()
    }
     return <div>
        <h2>Recent Transactions</h2>
        { expenseList.length > 0 ? 
        <div>
            <div>
                {expenseList.map((transaction)=>(
                    <TransactionListCard expensedata={transaction} key={transaction.id} handleDelete = { () => handleDelete(transaction.id)} handleEdit ={ ()=> handleEdit(transaction)}/>
                ))}
            </div>
            <Pagination currentPage={currentPage}/>
        </div> :(
            <div className={styles.emptyTransactionWrapper}>
                <p>No Transactions!</p>
            </div>
        )} 
        <AddExpenseModal ref={dialogRefExpense}  setEditedObject={setEditedObj} editedObject={editedObj} setEditFlag={setEditFlag} editFlag={editFlag} expenseList={expenseList} setExpenseList={setExpenseList} balance={balance} setBalance={setBalance} /> 
     </div>
     
}
export default RecentTransactionList