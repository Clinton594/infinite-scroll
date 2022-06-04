import React, { useEffect, useState } from "react";

export default function Modal({ setDisplay, profile }) {
  const [animate, setAnimate] = useState("");

  useEffect(() => {
    setAnimate("show");
  }, []);

  return (
    <div className={`modal ${animate}`}>
      <div
        className="overlay"
        onClick={() => {
          setDisplay(false);
        }}
      ></div>
      <div className="modal-dialog">
        <div className="modal-body">
          <h5 style={{ marginTop: "2em" }}>
            {profile.name.first && profile.name.first} {profile.name.last && profile.name.last}
          </h5>
          <p>
            <strong>Email : </strong>
            {profile.email}
          </p>
          <p>
            <strong>Phone : </strong>
            {profile.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
