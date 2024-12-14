import TransactionListCard from "../TransactionListCard/TransactionListCard"
import AddExpenseModal from "../Modals/AddExpenseModal"
import styles from "./RecentTransactions.module.css"
import {useRef,useState,useEffect} from "react"
import Pagination from "../Pagination/pagination"

const RecentTransactionList = ({expenseList,setBalance,setExpenseList,balance,setExpense}) => {
    const dialogRefExpense = useRef(null)
    const[editedObj,setEditedObj] = useState(null)
    const[editFlag,setEditFlag] = useState(false)
    const maximumRecords = 3;
    const[currentPage,setCurrentPage] = useState(1)
    const[recentTransactions,setRecentTransactions] = useState([])
    const[lastPage,setLastPage] = useState(0)
    useEffect(()=> {
        //As and when expenseList is incremented the index for pagination is calculated as we only require to place the first 3 objects in the first page
        const startIndex = currentPage*maximumRecords - maximumRecords
        const endIndex =  Math.min(currentPage*maximumRecords,expenseList.length)
        //show 3 transactions at first page
        //can not directly edit the expense list
        setRecentTransactions([...expenseList].slice(startIndex,endIndex))
        //setting the value of last page which is total pages
        setLastPage(Math.ceil(expenseList.length/maximumRecords))
    },[currentPage,expenseList])

    //Case when there is a change in the value of a lastpage or total pages i.e. when the expenseList is decremented by deletion from the recent transactions list
    useEffect(() => {
        //when the transactions are getting deleted then update the current page
        if(lastPage < currentPage && currentPage > 1){
            //simply go back
            setCurrentPage(prev => prev-1)
        }
    },[lastPage])

    const handleDelete = (id) => {
        const itemToBeDeleted = expenseList.find((item)=> item.id === id)
        const price = Number(itemToBeDeleted.price)
        setBalance((prev) => prev+price)
        setExpenseList((prev)=>prev.filter((item)=>item.id !== id))
        setExpense(prev=>prev-price)
    }
    const handleEdit =(transObj) => {
        //simply pass the object of which the edit option is clicked
        setEditedObj(transObj)
        //this is required for a significant change to run the useEffect
        setEditFlag(true)
        //when the edit option is clicked then the modal is opened
        dialogRefExpense.current?.showModal()
    }
     return <div className={styles.transactionWrapper}>
        <h2>Recent Transactions</h2>
        { expenseList.length > 0 ? 
        <div className={styles.list}>
            <div>
                {recentTransactions.map((transaction)=>(
                    <TransactionListCard expensedata={transaction} key={transaction.id} handleDelete = { () => handleDelete(transaction.id)} handleEdit ={ ()=> handleEdit(transaction)}/>
                ))}
            </div>
            {lastPage > 1 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage}/>}
        </div> :(
            <div className={styles.emptyTransactionWrapper}>
                <p>No Transactions!</p>
            </div>
        )} 
        <AddExpenseModal ref={dialogRefExpense}  setEditedObject={setEditedObj} editedObject={editedObj} setEditFlag={setEditFlag} editFlag={editFlag} expenseList={expenseList} setExpenseList={setExpenseList} balance={balance} setBalance={setBalance} setExpense={setExpense}/> 
     </div>
     
}
export default RecentTransactionList