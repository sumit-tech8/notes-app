import React, { useState, useEffect } from "react";
import Layout from './../components/layout/layout'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../style/homepage.css"
import {BiSolidAddToQueue,BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import HTMLReactParser from "html-react-parser";


const Homepage = () => {
 
  const [notes, setnotes] = useState([]);
  const navigate = useNavigate();
  
//getall notes
const getAllnotes = async () => {
  try {
    const { data } = await axios.get("/api/v1/notes/get-notes");
    setnotes(data.notes);
  } catch (error) {
    console.log(error);
    toast.error("Someething Went Wrong");
  }
};

//lifecycle method
useEffect(() => {
  getAllnotes();
}, []);


 //delete a product
 const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/notes/delete-note/${pId}`
    ); window.location.reload()
    toast.success("note Deleted Succfully");
  } catch (error) {
    console.log(error);
    toast.error("Something weeent wrong"); 
  }
};


  return (
    <Layout>
       
       <div className="d-flexs flex-wrap " >
            {notes?.map((n) => (
                <div className="card m-3 " style={{ width: "" ,height: "6rem",backgroundColor:n.Color}} >
                 <Link
                key={n._id}
                to={`/notes/${n.slug}`}
                className="product-link"
                style={{ textDecoration:'none' }} >
                 <h4 className="card-title">{n.title.substring(0, 30)}... </h4 >
                  <div className="card-body" >
                  
                    <p className="card-text" style={{overflow:"hidden" }}>{HTMLReactParser(n.discription.substring(0, 60))}</p>
                    
                  </div>
                  </Link> 
                  <BiEdit className="text-success me-3 ms-auto"onClick={() => {
            navigate("/note/" + n.slug);
          }} ></BiEdit>  
                   <MdDelete className="text-danger m-3 ms-auto" onClick={() => {
                              handleDelete(n._id);
                            }}></MdDelete>
                            
                </div>
               
               ))}
               
              </div>

          
            {/* add notes button at corner */}

         <Link to="newnotes" >
             <div id="top"> 
               <BiSolidAddToQueue/>
             </div> 
         </Link>

    </Layout>
  )
}

export default Homepage
