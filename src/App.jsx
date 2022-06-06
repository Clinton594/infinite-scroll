import React, { useState, useRef, useCallback } from "react";
import useFetchProfile from "./components/useFetchProfile";
import Modal from "./components/Modal";
import Card from "./components/Card";

export default function Appp() {
  const [page, setPage] = useState(1);
  let [feed, updateFeed] = useState([]);
  let { loader, hasMore } = useFetchProfile(page, updateFeed);
  const [profile, setProfile] = useState({});
  const [filter, setFilter] = useState("");
  const [displayModal, setDisplay] = useState(false);

  const observer = useRef();
  const lastprofileRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((last) => last + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loader, hasMore]
  );

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
          feed.map((profile, index) => {
            if (feed.length === index + 1) {
              return (
                <div ref={lastprofileRef} className="col" key={`${profile.email}-${index}`}>
                  <Card profile={profile} index={index} removeProfile={removeProfile} showModal={showModal} />
                </div>
              );
            } else {
              return (
                <div className="col" key={`${profile.email}-${index}`}>
                  <Card profile={profile} index={index} removeProfile={removeProfile} showModal={showModal} />
                </div>
              );
            }
          })}
      </div>
      {/* Spinner Section */}
      {loader && (
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
