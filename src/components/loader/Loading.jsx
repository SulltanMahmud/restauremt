import React from 'react';
import '../loader/Loading.css';
import LoaderImg  from '../../assets/loading-loading-forever.gif';
// import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className='fp-container'>
        <img src={LoaderImg} alt="Loader" className="fp-loader" />
        {/* <BeatLoader className='fp-loader' color='#E6683C'/> */}
    </div>
  )
}
