import styles from "./UserAdmin.module.scss";
import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import images from "~/component/assets/images";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const cx = classNames.bind(styles)
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

function UserAdmin() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [inputUpdate, setInputUpdate] = useState(false);
  const handleInputUpdate = () => setInputUpdate(true);
  const handleInputAdd = () => setInputUpdate(false);
  const fileInputRef = useRef(null);

  const resetFrom = () =>{
    setCustomerName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setPhone("");
    setImg("");
    setGender("");
    setDateOfBirth("");
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user").then((res) => {
      setUser(res.data.data);
    });
  }, []);

  const handleAdd = () =>{
    axios
    .post("http://127.0.0.1:8000/api/user/store", {
        customer_name,
        email,
        password,
        address,
        phone,
        img,
        gender,
        date_of_birth
    })
    .then((response) => {
      console.log(response.data);
      resetFrom();
      toast.success("Khách hàng đã được lưu thành công.");
      setTimeout(() => {
        window.location.href = "/admin/user";
      }, 3000); // chuyển hướng sau 2 giây
    })
    .catch((error) => {
      console.log(error);
      toast.error("Mã khách hàng đã tồn tại trong hệ thống");
    });
  }
  const handleDelete = (id)=>{
    axios
      .delete(`http://127.0.0.1:8000/api/user/delete/${id}`)
      .then(() => {
        // xóa thành công, cập nhật lại danh sách tour
        const updatedUser = user.filter((t) => t.id !== id);
        setUser(updatedUser);
        toast.success("Khách hàng đã được xóa thành công.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Không thể xóa khách hàng.");
      });

  };
  const handleUpdate = (id)=>{
    axios
    .get(`http://127.0.0.1:8000/api/user/show/${id}`)
    .then((response) => {
        setId(response.data.id)
        setCustomerName(response.data.customer_name);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setImg(response.data.img);
        setGender(response.data.gender);
        setDateOfBirth(response.data.date_of_birth);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const handleUpdateSubmit = (id)=>{
    axios
    .put(`http://127.0.0.1:8000/api/user/update/${id}`, {
        customer_name,
        email,
        password,
        address,
        phone,
        img,
        gender,
        date_of_birth
    })
    .then((response) => {
      console.log(response.data);
      toast.success("Khách hàng đã được cập nhật thành công.");
      setTimeout(() => {
        window.location.href = "/admin/user";
      }, 3000); // chuyển hướng sau 2 giây
    })
    .catch((error) => {
      console.log(error);
      toast.error("Mã tour đã tồn tại trong hệ thống");
    });
  }
  const handleOpen = ()=>{
        setOpen(true)
  };
  const handleClose = ()=>{
    setOpen(false)
    handleInputAdd();
    resetFrom();
  }

  const columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleDelete(params.row.id);
          }}
        >
          Xóa
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Sửa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleUpdate(params.row.id);
            handleInputUpdate();
            handleOpen();
          }}
        >
          Sửa
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "customer_name", headerName: "Tên khách hàng", width: 150 },
    { field: "email", headerName: "Email khách hàng", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "phone", headerName: "SĐT khách hàng", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 150 },
    { field: "date_of_birth", headerName: "Ngày sinh", width: 150 },
    {
      field: "img",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={images[params.row.img]}
          style={{ objectFit: "cover" }}
          alt="Ảnh"
        />
      ),
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUpdate) {
      handleUpdateSubmit(id);
    } else {
      handleAdd();
    }
  };
  return (
    <div
      style={{
        height: 1000,
        width: "1120px",
        display: "flex",
        flexDirection: "column",
        margin: "50px auto",
      }}
    >
    <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ margin: "40px auto" }}>Quản lý khách hàng</h1>
      <div>
        <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={handleOpen}
          >
          Thêm khách hàng
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "26px" }}
            >
              {inputUpdate ? "Sửa" : "Thêm"} khách hàng
            </Typography>
            <form
              className={cx("store-input-container")}
              onSubmit={handleSubmit}
            >
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tên khách hàng: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Tên khách hàng"
                    id="outlined-size-normal"
                    value={customer_name}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Email: </label>
                </div>
                <div className={cx("input-container")}>
                <TextField
                    label="Email"
                    id="outlined-size-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Password: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Password"
                    id="outlined-size-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Địa chỉ: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nơi khởi hành"
                    id="outlined-size-normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>SĐT: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="SĐT"
                    id="outlined-size-normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giới tính: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá người lớn"
                    id="outlined-size-normal"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ảnh khách hàng: </label>
                </div>
                <div className={cx("input-container")}>
                  <Button sx={{ width: "210px" }} component="label">
                    <input
                      type="file"
                      onChange={(e) => setImg(e.target.files[0].name)}
                      ref={fileInputRef}
                    />
                  </Button>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ngày sinh: </label>
                </div>
                <div className={cx("input-container")}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 210,
                        ".MuiInputBase-input": { height: 3, fontSize: 12 },
                      }}
                      onChange={(newValue) => {
                        const dateString = dayjs(newValue).format("DD/MM/YYYY");
                        setDateOfBirth(dateString);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} value={date_of_birth} />
                      )} 
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                type="submit"
              >
                {inputUpdate ? "Sửa" : "Thêm"} khách hàng
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <DataGrid
        rows={user}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        rowHeight={150}
        sx={{
          "& .MuiDataGrid-colCell": {
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell, & .MuiDataGrid-colCellTitle, ": {
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

export default UserAdmin;