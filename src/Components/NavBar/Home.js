import React from "react";
import './Home.css'

const Home = () => {

    return (<div>
        <div className="home-page">
            <div className="title">
                <h2>Pastebin clone</h2>
            </div>
            <div className="text">
                <p>
                    This is my project and 
                    <br></br>
                    you will find a link to
                    <br></br>
                   the original website <a href="https://pastebin.com/"> here </a>.
                </p>
            </div>
        </div>
    </div>
    );
}

export default Home;