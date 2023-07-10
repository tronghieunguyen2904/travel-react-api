import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Container } from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DetailNews.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { detailNews } from "~/GlobalFunction/Api";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
const cx = classNames.bind(styles);

function DetailNews() {
  
    const { id } = useParams();
    const [detailNew, setDetailNew] = useState({});
      //Load api của chi tiết tin tức
      useEffect(() => {
          async function detailData() {
            const data = await detailNews(id);
            setDetailNew(data);
          }
          detailData();
        }, [id]);
        console.log(detailNew.content_news);
        const htmlString = detailNew.content_news;
        const htmlContent = React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlString } });
    return (
        <Container>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />}>

                <Link to="/" style={{ fontSize: "13px" }}>
                    Trang Chủ
                </Link>
                <Link to="/news" style={{ fontSize: "13px" }}>
                    Tin Tức
                </Link>
                <Link style={{ fontSize: "13px" }}>
                    {detailNew.title_news}
                </Link>
            </Breadcrumbs>
            <h1>   {detailNew.title_news}</h1>
          <Link  to="/news" style={{ fontSize: "16px" , textDecoration:"none" }}> Tin tức du lịch </Link> <span  style={{ fontSize: "13px" , marginLeft: "10px", color:"#6c757d" }}>    {detailNew.date}</span>
         
          <div>
          <img src={detailNew.img_news} alt="hinhanh"/> 
            <div>
            {htmlContent}
            </div>
                            
        </div>
        </Container>

    );
}

export default DetailNews;