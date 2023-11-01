import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../style/detailpage.css';
import HTMLReactParser from 'html-react-parser';

const Detailpage = () => {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [id, setId] = useState("");
    


    //get single notes
 const getSinglenote = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/notes/get-note/${params.slug}`
      );
      setTitle(data.note.title);
      setId(data.note._id);
      setDiscription(data.note.discription);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSinglenote();
    //eslint-disable-next-line
  }, []);

  return (
    <>
       <Layout>
      <div className='formcontainer'>
        <div className="my-card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="my-card-title"> {title}</h5>
          <h6> Description:</h6>
          <p className="card-text"> {HTMLReactParser(discription)} </p>
          <a href="/" className="my-bb btn-primary">Go-back</a>
          <img
                    src={`/api/v1/notes/notes-photo/${id}`}
                    className="card-img-top"
                    alt={title}
                    style={{width: '80%'}}
                  />
        </div>
       </div>
       </div>
      </Layout>
    </>
  )
}

export default Detailpage
