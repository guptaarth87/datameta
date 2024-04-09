import React from 'react'
import { Link} from 'react-router-dom'
export default function Navbar() {
  return (
   <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navigation</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Check_PK</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/checkforeinkey">Check_FK</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
   </>
  )
}
