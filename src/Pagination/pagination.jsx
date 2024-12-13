import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io"
import styles from "./pagination.module.css"
const Pagination = ({currentPage}) => {
    return <div className={styles.paginationWrapper}>
        <button><IoIosArrowRoundBack /></button>
        <p>{currentPage}</p>
        <button><IoIosArrowRoundForward /></button>
    </div>
}
export default Pagination