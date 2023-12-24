import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const returnBack = () => {
        navigate('/')
    }
    return(<>
    page not found 404 
    <div onClick={returnBack}>go to auth page</div>
    </>)

}

export default NotFound