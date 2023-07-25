import React from "react";

const Testpage = () => {
    return <>
        <div className="hero-wrapper">
            <div className="hero-video-wrapper">
                <div className="hero-bg-video-wrapper">
                    <video autoPlay muted loop src="src\assets\hero-video.mp4"></video>
                </div>
                <div className="hero-content-wrapper">
                    <div className="hero-title-content-wrapper">
                        <h1>Discover <br />Most Suitable <br />Property</h1>
                        <div className="hero-subtitle-content-wrapper">
                            Find a variety of properties that suit you very easily,<br /> forget all difficulties in finding a residence for you.
                        </div>
                        <div className="hero-search-wrapper">
                            <input type="text" placeholder="Property Type"/>
                            <input type="text" placeholder="Location"/>
                            <button>Search</button>
                        </div>
                    </div>
                    <div className="hero-sub-image-wrapper">
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Testpage;
