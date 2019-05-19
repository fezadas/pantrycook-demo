import React from 'react'

const Constacts = () => {
    return (
        <div>
        <div className="dropdown-divider"/>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-4 font-weight-normal">
                    Pantry Cook
                </h1>
                <p className="lead font-weight-small">
                    Developed for academic purposes by
                </p>
                <p className="lead font-weight-normal"><span><i className="fab fa-github"></i> InesMG </span></p>
                <p className="lead font-weight-normal"><span> <i className="fab fa-github"></i> fezadas </span></p>
                <p className="lead font-weight-normal">Credits to TheMealDB API.</p>
                <p className="lead font-weight-normal"></p>
                <a className="btn btn-outline-secondary" href="#">Coming soon</a>
            </div>
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
        </div>
    )
}

export default Constacts