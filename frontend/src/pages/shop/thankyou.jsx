import React from 'react';
import './thankyou.css';
import { Link } from 'react-router-dom';

const Thankyou = () => {
  return (
    <div className="content3">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1 id="ty">Thank you for ordering !</h1>
          <p>Thanks for ordering from our website.</p>
          <p>You should receive a confirmation email soon.</p>
          <Link to='/'><button className="go-home">
            go home
          </button>
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default Thankyou;
