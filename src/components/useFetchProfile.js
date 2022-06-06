import { useEffect, useState } from "react";

export default function useFetchProfile(page, updateFeed) {
  const [limit] = useState(20);

  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoader(true);
    const url = `https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc&inc=name,gender,email,phone,picture`;

    (async () => {
      const { results, info } = await (await fetch(url)).json();
      updateFeed((prevState) => prevState.concat(results));
      setHasMore(info.results >= limit);
      setLoader(false);
    })();
  }, [page, limit, updateFeed]);
  return { loader, hasMore };
}
