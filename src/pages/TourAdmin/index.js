import styles from "./TourAdmin.module.scss";
import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import images from "~/component/assets/images";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Switch, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
const cx = classNames.bind(styles);
function TourAdmin() {
  const [tour, setTour] = useState({});
  const [showTour, setShowTour] = useState({});
  const fileInputRef = useRef(null);
  const [inputUpdate, setInputUpdate] = useState(false);
  const handleInputUpdate = () => setInputUpdate(true);
  const handleInputAdd = () => setInputUpdate(false);
  useEffect(() => {
    axios.get("https://lav2.cf/api/tour").then((res) => {
      setTour(res.data.data);
    });
  }, []);
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
            handleDelete(params.row.id_tour);
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
            handleUpdate(params.row.id_tour);
            handleInputUpdate();
            handleOpen();
          }}
        >
          Sửa
        </Button>
      ),
    },
    { field: "id_tour", headerName: "ID", width: 150 },
    { field: "name_tour", headerName: "Tên tour", width: 150 },
    { field: "date_back", headerName: "Ngày đi", width: 150 },
    { field: "content_tour", headerName: "Nội dung tour", width: 150 },
    { field: "place_go", headerName: "Nơi khởi hành", width: 150 },
    { field: "child_price", headerName: "Giá trẻ em", width: 150 },
    { field: "adult_price", headerName: "Giá người lớn", width: 150 },
    {
      field: "img_tour",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={images[params.row.img_tour]}
          style={{ objectFit: "cover" }}
          alt="Ảnh"
        />
      ),
    },
    { field: "best_seller", headerName: "Tour giảm giá", width: 150 },
    { field: "hot_tour", headerName: "Tour hot", width: 150 },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleInputAdd();
    resetFrom();
  };
  //thêm tour
  const [id_tour, setIdTour] = useState("");
  const [name_tour, setNameTour] = useState("");
  const [date_back, setDateBack] = useState("");
  const [content_tour, setContentTour] = useState("");
  const [place_go, setPlaceGo] = useState("");
  const [child_price, setChildPrice] = useState("");
  const [adult_price, setAdultPrice] = useState("");
  const [img_tour, setImgTour] = useState("");
  const [best_seller, setBestSeller] = useState(1);
  const [hot_tour, setHotTour] = useState(1);
  const resetFrom = () => {
    setIdTour("");
    setNameTour("");
    setDateBack("");
    setContentTour("");
    setPlaceGo("");
    setChildPrice("");
    setAdultPrice("");
    setImgTour("");
    setBestSeller("");
    setHotTour("");
  };
  const handleAdd = () => {
    // e.preventDefault();
    axios
      .post("https://lav2.cf/api/tour/store", {
        id_tour,
        name_tour,
        date_back,
        content_tour,
        place_go,
        child_price,
        adult_price,
        img_tour,
        best_seller,
        hot_tour,
      })
      .then((response) => {
        console.log(response.data);
        resetFrom();
        toast.success("Tour đã được lưu thành công.");
        setTimeout(() => {
          window.location.href = "/admin/tour";
        }, 3000); // chuyển hướng sau 2 giây
      })
      .catch((error) => {
        console.log(error);
        toast.error("Mã tour đã tồn tại trong hệ thống");
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://lav2.cf/api/tour/delete/${id}`)
      .then(() => {
        // xóa thành công, cập nhật lại danh sách tour
        const updatedTour = tour.filter((t) => t.id_tour !== id);
        setTour(updatedTour);
        toast.success("Tour đã được xóa thành công.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Không thể xóa tour.");
      });
  };
  const handleUpdate = (id) => {
    axios
      .get(`https://lav2.cf/api/tour/show/${id}`)
      .then((response) => {
        setShowTour(response.data);
        setIdTour(response.data.id_tour);
        setNameTour(response.data.name_tour);
        setContentTour(response.data.content_tour);
        setDateBack(response.data.date_back);
        setPlaceGo(response.data.place_go);
        setChildPrice(response.data.child_price);
        setAdultPrice(response.data.adult_price);
        setImgTour(response.data.img_tour);
        setBestSeller(response.data.best_seller);
        setHotTour(response.data.hot_tour);
        console.log(showTour);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateSubmit = (id) => {
    // // e.preventDefault();
    axios
      .put(`https://lav2.cf/api/tour/update/${id}`, {
        name_tour,
        date_back,
        content_tour,
        place_go,
        child_price,
        adult_price,
        img_tour,
        best_seller,
        hot_tour,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Tour đã được cập nhật thành công.");
        setTimeout(() => {
          window.location.href = "/admin/tour";
        }, 3000); // chuyển hướng sau 2 giây
      })
      .catch((error) => {
        console.log(error);
        toast.error("Mã tour đã tồn tại trong hệ thống");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUpdate) {
      handleUpdateSubmit(id_tour);
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
        <h1 style={{ margin: "40px auto" }}>Quản lý tour du lịch</h1>
      <div>
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={handleOpen}
          >
          Thêm tour
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
              {inputUpdate ? "Sửa" : "Thêm"} tour
            </Typography>
            <form
              className={cx("store-input-container")}
              onSubmit={handleSubmit}
            >
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Mã tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Mã tour"
                    id="outlined-size-normal"
                    value={id_tour}
                    onChange={(e) => setIdTour(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tên tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Tên tour"
                    id="outlined-size-normal"
                    value={name_tour}
                    onChange={(e) => setNameTour(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ngày đi: </label>
                </div>
                <div className={cx("input-container")}>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 210,
                        ".MuiInputBase-input": { height: 3, fontSize: 12 },
                      }}
                      onChange={(newValue) => {
                        const dateString = dayjs(newValue).format("DD/MM/YYYY");
                        setDateBack(dateString);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} value={date_back} />
                      )} // thêm đoạn này
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nội dung tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nội dung tour"
                    id="outlined-size-normal"
                    value={content_tour}
                    onChange={(e) => setContentTour(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nơi khởi hành: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nơi khởi hành"
                    id="outlined-size-normal"
                    value={place_go}
                    onChange={(e) => setPlaceGo(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá trẻ em: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá trẻ em"
                    id="outlined-size-normal"
                    value={child_price}
                    onChange={(e) => setChildPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá người lớn: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá người lớn"
                    id="outlined-size-normal"
                    value={adult_price}
                    onChange={(e) => setAdultPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ảnh tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <Button sx={{ width: "210px" }} component="label">
                    <input
                      type="file"
                      onChange={(e) => setImgTour(e.target.files[0].name)}
                      ref={fileInputRef}
                    />
                  </Button>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour giảm giá: </label>
                </div>
                <div className={cx("input-container")}>
                  <Switch
                    checked={best_seller === 1}
                    defaultChecked={best_seller === 1 ? true : undefined}
                    onChange={(e) => setBestSeller(e.target.checked ? 1 : 0)}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour hot: </label>
                </div>
                <div className={cx("input-container")}>
                  <Switch
                    checked={hot_tour === 1}
                    defaultChecked={hot_tour === 1 ? true : undefined}
                    onChange={(e) => setHotTour(e.target.checked ? 1 : 0)}
                  />
                </div>
              </div>
              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                type="submit"
              >
                {inputUpdate ? "Sửa" : "Thêm"} tour
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <DataGrid
        rows={tour}
        columns={columns}
        getRowId={(row) => row.id_tour}
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

export default TourAdmin;
