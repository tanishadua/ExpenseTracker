import {forwardRef, useState} from "react"
import { useSnackbar } from "notistack"
import styles from "./IncomeModal.module.css"
const AddIncomeModal = forwardRef((props,ref) => {
    const[incomeAmt,setIncomeAmt] = useState("")
    const { enqueueSnackbar } = useSnackbar()
    const handleAddBalance = (e)=>{
        e.preventDefault()
        if(Number(incomeAmt) < 0){
            enqueueSnackbar("Enter income greater than 0",{ variant:"warning"})
            ref.current?.close()
            setIncomeAmt("")
            return
        }
        props.setBalance(prev => prev+Number(incomeAmt))
        ref.current?.close()
        setIncomeAmt("")
    }
    return <div>
        <dialog ref={ref} className={styles.formWrapper}>
            <h3>Add Balance</h3>
            <form onSubmit={handleAddBalance}>
                <input type="text" placeholder="Income Amount" value ={incomeAmt} onChange={e => setIncomeAmt(e.target.value)} required/>
                <button type="submit" style={{background:"#f4bb4a", color:"#ffffff"}}>Add Balance</button>
                <button type="button" style={{width:"fit-content",fontWeight:"400"}} onClick={()=>{
                ref.current?.close()
                setIncomeAmt("")
            }}>Cancel</button>
            </form>
        </dialog>
    </div>

} )
export default AddIncomeModal