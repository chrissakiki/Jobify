import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* INFO Side */}
        <div className="info">
          <h1>
            Find <span> Your Future</span> Today
          </h1>
          <p>
            We are the most trusted source for job opportunities. Search for
            thousands of jobs, Reach professionals with just the right skills
            and experience. Get great applicants fast. Find jobs in seconds or
            help other to find their future.
          </p>
          <Link to="/register">
            <button className="btn btn-hero">Login/Register</button>
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
