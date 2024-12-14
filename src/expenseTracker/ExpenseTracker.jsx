import {useRef,useState,useEffect} from "react"
import AddIncomeModal from "../Modals/AddIncomeModal"
import AddExpenseModal from "../Modals/AddExpenseModal"
import RecentTransactionList from "../Recent Transactions/RecentTransaction"
import styles from "./expensetracker.module.css"
import BarChartComponent from "../BarChart/BarChart"
import PieCharts from "../PieChart/PieChart"
function ExpenseTracker(){
    const[balance,setBalance] = useState(0)
    const[expense,setExpense] = useState(0)
    const[expenseList,setExpenseList] = useState([])
    const dialogRefIncome = useRef(null)
    const dialogRefExpense = useRef(null)
    const[isMounted,setIsMounted] = useState(false)
    const[categorySpends,setCategorySpends] = useState({
        food:0,
        entertainment:0,
        travel:0
    })
    
    //For the data added by user to be retained; check data in localstorage
    useEffect(()=>{
        const localBalance = localStorage.getItem("balance")
        if(localBalance){
            setBalance(Number(localBalance))
        }else{
            setBalance(5000)
            localStorage.setItem("balance",5000)
        }
        const list = JSON.parse(localStorage.getItem("expenses"))
        setExpenseList(list || [])
        setIsMounted(true)
    },[])


    //for checking the expenses initially
    useEffect(()=>{
        if(expenseList.length > 0 || isMounted){
            localStorage.setItem("expenses",JSON.stringify(expenseList))
        }
        if(expenseList.length > 0){
            setExpense(expenseList.reduce((expenseSum,currentItem) => expenseSum + Number(currentItem.price),0))
        }
        else{
            setExpense(0)
        }
        let foodSpends=0, entertainmentSpends=0, travelSpends=0;
       
        expenseList.forEach((item)=>{
            if(item.category == "food"){
                foodSpends=foodSpends+Number(item.price)
                
            }else if(item.category=="travel"){
                travelSpends=travelSpends+Number(item.price)
                
            }else if(item.category=="entertainment"){
                entertainmentSpends=entertainmentSpends+Number(item.price)
                
            }
        })
        setCategorySpends({
            food:foodSpends,
            entertainment:entertainmentSpends,
            travel:travelSpends
        })
        
        
    },[expenseList])
    
    useEffect(()=> {
        if(isMounted){
            localStorage.setItem("balance",balance)
        }
    },[balance])

    return(
        <div className={styles.container}>
            <h1>
                Expense Tracker
            </h1>
            <div className={styles.cardWrapper}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Wallet Balace: <span className={styles.success}>{balance}</span></h3>
                    <button onClick={() => dialogRefIncome.current?.showModal()} className={styles.successButton}>+Add Income</button>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Expenses: <span className={styles.failure}>{expense}</span></h3>
                    <button onClick={()=> dialogRefExpense.current?.showModal()} className={styles.failureButton}>+Add Expense</button>
                </div>
                <PieCharts data= {[
                    {name:"Food", value:categorySpends.food},
                    {name:"Entertainment", value:categorySpends.entertainment},
                    {name:"Travel",value:categorySpends.travel}
                ]}/>
            </div>
            <AddIncomeModal  ref = {dialogRefIncome} balance= {balance} setBalance={setBalance}/>
            <AddExpenseModal ref= {dialogRefExpense} balance= {balance} setBalance={setBalance} expenseList={expenseList} setExpenseList={setExpenseList}/>
            <div className={styles.expenseListContainer}>
            <RecentTransactionList expenseList={expenseList} setBalance={setBalance} setExpenseList={setExpenseList} balance={balance} setExpense={setExpense}/>
            <BarChartComponent data={[
                {name:"Food",value:categorySpends.food},
                {name:"Entertainment",value:categorySpends.entertainment},
                {name:"Travel",value:categorySpends.travel}
            ]}/>
            </div>
            
        </div>
    )
}
export default ExpenseTracker;