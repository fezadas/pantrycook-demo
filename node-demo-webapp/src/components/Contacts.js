import React from 'react'
import Style from './../pantrycook-features'

const image = Style.image

const Contacts = () => {
    return (
        <div>
        <div className="dropdown-divider"/>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-4 font-weight-normal">
                    Pantry Cook
                </h1>
                <br/>
                <img style= {image.small} src="/images/cooker.svg" alt=""></img> 
                <br/>
                <p className="lead font-weight-small">
                    Developed for academic purposes by
                </p>
                <a href="https://github.com/InesMG"className="btn btn-outline-secondary">
                    <span><i className="fab fa-github"></i> InesMG </span>
                </a>
                <span> </span>
                <a href="https://github.com/fezadas"className="btn btn-outline-secondary">
                    <span><i className="fab fa-github"></i> fezadas </span>
                </a>
                <p className="lead font-weight-normal">Credits to TheMealDB API.</p>
                <a href="https://www.themealdb.com"className="btn btn-outline-secondary">
                    <span><i className="fas fa-cloud-meatball"></i> TheMealDB</span>
                </a>
                <p className="lead font-weight-normal">Our GitHub Repository.</p>
                <a href="https://github.com/fezadas/ps-2018-19"className="btn btn-outline-secondary">
                    GitHub Repo
                </a>
                <p className="lead font-weight-normal">Check our Android APP.</p>
                <a href="https://www.themealdb.com"className="btn btn-outline-secondary">
                    <span><i className=" fab fa-android"></i> Android</span>
                </a>
            </div>
        </div>
        </div>
    )
}

export default Contacts