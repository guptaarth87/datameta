import React from 'react'
import Heroimg from '../assets/heroimg.jpg';

export default function Hero() {
  return (
    <>
    <div className="container">
        <div className="row m-2">
            <div className="col-lg-6 col-md-5 col-sm-11">
                <br></br>
                <br></br>
                <br></br>
               <h2 className='text-primary highlight '>Power Datamate</h2>
               <h4 className=''>Unlocking Relationships: Discover Primary Keys and Foreign Keys Effortlessly!</h4>
               <br></br>
               <h4>Get started by choosing files.</h4>

            </div>
            <div className="col-1"></div>
            <div className="col-lg-5 col-md-5 col-sm-11">
            <img src={Heroimg} className="animated col-10" />
           
            
            </div>
           
        </div>
    </div>
    </>
  )
}
