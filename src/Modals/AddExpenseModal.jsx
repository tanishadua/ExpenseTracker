import styles from "./ExpenseModal.module.css"
import { useSnackbar } from "notistack";
import { forwardRef } from "react";
import { useState,useEffect } from "react";
const AddExpenseModal = forwardRef((props, ref) => {
    console.log(props.expenseList)
  function getTodayDate(){
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear()
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    return `${yyyy}-${mm}-${dd}`
  }
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormdata] = useState({
    title: "",
    category: "",
    price: "",
    date: getTodayDate()
  });
  const handleChange = (e) => {
    const name = e.target.name;
    setFormdata((prev) => ({ ...prev, [name]: e.target.value }));
  };

  //I should have all the details pre-filled
  useEffect(()=>{
    if(props.editFlag && props.editedObject){
        setFormdata(props.editedObject)
    }
  },[props.editedObject,props.editFlag])

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (props.balance < Number(formData.price)) {
      enqueueSnackbar("Enter price lesser than wallet balance", {
        variant: "warning",
      });

      setFormdata({
        title: "",
        category: "",
        price: "",
        date: getTodayDate(),
      });
      ref?.current.close();
      return;
    }
    props.setBalance((prev) => prev - Number(formData.price));
    const lastId = props.expenseList.length > 0 ? props.expenseList[0].id : 0
    props.setExpenseList((prev => [{...formData, id: lastId+1 }, ...prev]))
    setFormdata({
      title: "",
      category: "",
      price: "",
      date: getTodayDate(),
    });
    ref.current?.close();
  };
  const handleEditExpense = (e) => {
    e.preventDefault()
    const editId = props.editedObject.id
    const updated = props.expenseList.map((item)=> {
        if(item.id === editId){
            const priceDiff = item.price-formData.price
            if(priceDiff < 0 && formData.price > props.balance){
                enqueueSnackbar("Please make expenses lesser than the available wallet balance",{variant:"warning"})
                return { ...item}
            }
            props.setBalance(props.balance+priceDiff)
            return {...formData, id:editId}
        }
        else{
            return item
        }
    })
    props.setExpenseList(updated)
    ref.current?.close()
  }
  
  return (
    <dialog ref={ref} className={styles.formWrapper}>
      <h3>{ props.editedObject ? "Edit Expense"  : "Add Expenses" }</h3>
      <form onSubmit={ props.editedObject? handleEditExpense :handleAddExpense  }>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={formData.price}
          required
        />
        <select
          name="category"
          onChange={handleChange}
          value={formData.category}
          required
        >
          <option value="">Select Category</option>
          <option value="entertainment">Entertainment</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
        </select>
        <input
          name="date"
          type="date"
          placeholder="dd/mm/yyyy"
          onChange={handleChange}
          value={formData.date}
          required
        />
        <button type="submit" style={{background:"#f4bb4a", color:"#ffffff"}}>{props.editedObject? "Edit Expense" : "Add Expense"}</button>
        <button
          type="button"
          style={{fontWeight:"400",width:"fit-content"}}
          onClick={() => {
            ref.current?.close();
            if(props.editFlag){
                props.setEditFlag(false);
                props.setEditedObject(null)
            }
            setFormdata({
              title: "",
              category: "",
              price: "",
              date: getTodayDate(),
            });
          }}
        >
          Cancel
        </button>
      </form>
    </dialog>
  );
});
export default AddExpenseModal;
