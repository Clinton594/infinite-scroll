import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";

const limit = 20;

const debounce = (method, delay) => {
  clearTimeout(method._tId);
  method._tId = setTimeout(function () {
    method();
  }, delay);
};

export default function App() {
  let [feed, updateFeed] = useState([]);
  const [profile, setProfile] = useState({});
  const [filter, setFilter] = useState("");
  const [displayModal, setDisplay] = useState(false);
  const [loader, setLoader] = useState({ nextPage: 1, loading: false });

  const fetchData = async () => {
    // Start Loader
    setLoader({ ...loader, loading: true });

    // Query the API, extract data and info
    const { results: data, info } = await (
      await fetch(
        `https://randomuser.me/api/?page=${loader.nextPage}&results=${limit}&seed=abc&inc=name,gender,email,phone,picture`
      )
    ).json();

    // Extract and update the query response into the state
    let { page, results } = info;
    if (results >= limit) page++;
    setLoader({ ...loader, loading: false, nextPage: page, results });

    // Add new feed to array
    console.log(data);
    updateFeed(feed.concat(data));
  };

  // Fetch the first page on page load
  useEffect(() => {
    fetchData();

    window.onscroll = function () {
      debounce(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          if (!loader.loading) fetchData();
          console.log("bottom");
        }
      }, 200);
    };
    // window.onscroll = function () {
    //   debounce(() => {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    //       // if (!loader.loading) fetchData();
    //       console.log("bottom");
    //     }
    //   }, 2000);
    // };
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
