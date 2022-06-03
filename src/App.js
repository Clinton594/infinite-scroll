import React from "react";

export default function App() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <select name="filter">
            <option value="">No Filter</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div className="row grid">
        <div className="col">
          <div className="card">
            <div className="head">
              <span>
                <img src="img/close-circle-f-svgrepo-com.svg" alt="" />{" "}
              </span>
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/38.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="head">
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/3.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="head">
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/38.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="head">
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/3.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="head">
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/3.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="head">
              <div className="figure">
                <img src="https://randomuser.me/api/portraits/med/men/3.jpg" alt="" />
              </div>
            </div>
            <div className="body">
              <h5>Full Name</h5>
              <p>female</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
