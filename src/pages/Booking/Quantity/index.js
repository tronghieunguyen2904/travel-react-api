import styles from "./Quantity.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

function Quantity({ title, subtitle ,customerInfo,quantity,seat,totalQuantity}) {
  const [quantityAdult, setQuantityAdult] = useState(1);

  const [customers, setCustomer] = useState([
    {
      name_customer: "",
      gender: "",
      date:"",
    },
  ]);

  //lấy số lượng cho component cha xài
  useEffect(()=>{
    quantity(quantityAdult);
  })

  // Xử lý tăng số lương và tăng form
  const handleAddQuantity = () => {
    if(totalQuantity < seat){
    setQuantityAdult((prevQuantity) => prevQuantity + 1);
    setCustomer([...customers, { name_customer: "", gender: "",date:"" }]);
    }
  };

  
  // Xử lý giảm số lương và giảm form
  const handleMinusQuantity = () => {
    if (quantityAdult >= 1) {
      setQuantityAdult((prevQuantity) => prevQuantity - 1);

    }
    setCustomer(customers.slice(0, quantityAdult - 1));
  };

  // Xử lý khi nhập dữ liệu vào input
  const handleCustomerInfoChange = (index, field, value) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][field] = value;
    setCustomer(updatedCustomers);
    customerInfo(updatedCustomers);
  };
  // console.log(customers);
  return (
    <div>
      <div className={cx("quantity-customer-box")}>
        <div className={cx("quantity-customer-title")}>
          <h4>{title}</h4>
          <p>{subtitle} tuổi</p>
        </div>
        <div className={cx("quantity-customer-number")}>
          <span>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={cx("btn-quantity")}
              onClick={handleAddQuantity}
            />
          </span>
          <span className={cx("number-quantity")}>{quantityAdult}</span>
          <span>
            <FontAwesomeIcon
              icon={faCircleMinus}
              className={cx("btn-quantity")}
              onClick={handleMinusQuantity}
            />
          </span>
        </div>
      </div>
      <div className={cx("customer-container")}>
        <div className={cx("heading-form")}> 
            <span>Họ và tên</span>
            <span>Giới tính</span>
            <span>Ngày sinh</span>
        </div>
        {customers.map((customer, index) => (
          <div key={index} className={cx("customer-form")}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
              value={customer.name_customer}
              onChange={(e) =>
                handleCustomerInfoChange(index, "name_customer", e.target.value)
              }
              className={cx("input-info")}
            />
            <TextField
              id="outlined-basic"
              label="Giới tính"
              variant="outlined"
              value={customer.gender}
              onChange={(e) =>
                handleCustomerInfoChange(index, "gender", e.target.value)
              }
              className={cx("input-info")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 220,
                        ".MuiInputBase-input": { height: 15, fontSize: 16 },
                      }}
                      onChange={(newValue) => {
                        const dateString = dayjs(newValue).format("YYYY-MM-DD");
                        handleCustomerInfoChange(index, "date", dateString)
                      }}
                      renderInput={(params) => (
                        <TextField {...params} value={customers[index].date} />
                      )} // thêm đoạn này
                    />
            </LocalizationProvider>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quantity;
