import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io"
import styles from "./pagination.module.css"
const Pagination = ({currentPage,setCurrentPage,lastPage}) => {
    const handlePrev = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev-1)
        }
    }
    const handleNext = () => {
        if(currentPage < lastPage){
            setCurrentPage(prev=>prev+1)
        }
    }
    return <div className={styles.paginationWrapper}>
        <button onClick={handlePrev} disabled={currentPage===1}><IoIosArrowRoundBack /></button>
        <p>{currentPage}</p>
        <button onClick={handleNext} disabled={currentPage===lastPage}><IoIosArrowRoundForward /></button>
    </div>
}
export default Pagination