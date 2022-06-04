import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";

export default function App() {
  let [feed, updateFeed] = useState([]);
  const [profile, setProfile] = useState({});
  const [filter, setFilter] = useState("");
  const [displayModal, setDisplay] = useState(false);
  const [loader, setLoad] = useState({ results: 0, page: 0, loading: false });

  const fetchData = async () => {
    // Start Loader
    setLoad({ ...loader, loading: true });

    // Query the API, extract data and info
    const { results: data, info } = await (
      await fetch(
        `https://randomuser.me/api/?page=${loader.page}&results=20&seed=abc&inc=name,gender,email,phone,picture`
      )
    ).json();

    // Extract and update the query response into the state
    const { page, results } = info;
    setLoad({ ...loader, loading: false, page, results });

    // Add new feed to array
    updateFeed([...feed, ...data]);
  };

  // Fetch the first page on page load
  useEffect(() => {
    fetchData();
  }, []);

  // Control Open modal
  const showModal = (index) => {
    setDisplay(true);
    setProfile(feed[index]);
  };

  // Delete Profile
  const removeProfile = (index) => {
    const copy = [...feed];
    copy.splice(index, 1);
    updateFeed(copy);
  };

  const updateField = (e) => {
    setFilter(e.target.value);
  };
  if (filter) {
    feed = feed.filter((x) => x.gender === filter);
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <select name="filter" onChange={updateField}>
            <option value="">No Filter</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div className="row grid">
        {feed.length > 0 &&
          feed.map((profile, index) => (
            <div className="col" key={`${profile.email}-${index}`}>
              <div className="card">
                <div className="head">
                  <span onClick={() => removeProfile(index)}>
                    <img src="img/circle-close-f-svgrepo-com.svg" alt="" />{" "}
                  </span>
                  <div className="figure">
                    <img
                      src={profile.picture.large && profile.picture.large}
                      alt={profile.name.first && profile.name.first}
                    />
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
            </div>
          ))}
      </div>
      {/* Spinner Section */}
      {loader.loading && (
        <div className="row grid">
          <div className="col center">
            <i className="spinner"></i>
          </div>
        </div>
      )}
      {/* Conditional Rendering of Modal */}
      {displayModal && <Modal profile={profile} setDisplay={setDisplay} />}
    </div>
  );
}
