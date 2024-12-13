import { PiPizza, PiGift } from "react-icons/pi"
import { BsSuitcase2 } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"
import styles from "./TransactionListCard.module.css"
import { MdOutlineModeEdit } from "react-icons/md"
const TransactionListCard = ({expensedata, handleDelete, handleEdit}) => {
    return <div className={styles.card}>
        <div className={styles.cardInner}>
            <div className={styles.cardIcon}>
                {expensedata.category === "food" && <PiPizza />}
                {expensedata.category === "travel" && <BsSuitcase2/>}
                {expensedata.category === "entertainment" && <PiGift />}
            </div>
            <div>
                <h5>{expensedata.title}</h5>
                <p>{expensedata.date}</p>
            </div>
        </div>
        <div className={styles.cardInner}>
            <p className={styles.cardprice}>{`₹${expensedata.price}`}</p>
            <div className={styles.cardButtonWrapper}>
                <button className={styles.cardDelete} onClick={handleDelete}>
                    <IoMdCloseCircleOutline />
                </button>
                <button className={styles.cardEdit} onClick={handleEdit}>
                    <MdOutlineModeEdit />
                </button>
            </div>
        </div>
    </div>
}
export default TransactionListCard