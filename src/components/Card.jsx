import React from "react";

export default function Card({ profile, removeProfile, showModal, index }) {
  return (
    <div className="card">
      <div className="head">
        <span onClick={() => removeProfile(index)}>
          <img src="img/circle-close-f-svgrepo-com.svg" alt="" />{" "}
        </span>
        <div className="figure">
          <img src={profile.picture.large && profile.picture.large} alt={profile.name.first && profile.name.first} />
        </div>
      </div>
      <div className="body">
        <h5>
          {profile.name.first && profile.name.first} {profile.name.last && profile.name.last}
        </h5>
        <p>{profile.gender && profile.gender}</p>
        <button onClick={() => showModal(index)}>Connect</button>
      </div>
    </div>
  );
}
