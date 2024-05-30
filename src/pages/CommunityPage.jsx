import React from "react";
import { Link, useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Posts from "./Post";
import axios from "axios";

function parseDate(datestr) {
  const dateObj = new Date(datestr);

  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj.toISOString().split("T")[1].split(".")[0];
  return { date, time };
}

const CommunityPage = () => {
  const location = useLocation();
  const community = location.state;
  console.log(community);
  const [communityDetails, setCommunityDetails] = useState([]);
  const [isMember, setIsMember] = useState(community.is_member);
  useEffect(() => {
    getCommunityDetails();
  }, []);
  const idtoken = localStorage.getItem("token");
  let getCommunityDetails = async () => {
    let response = await fetch(
      "http://localhost:8000/post/community?" +
        new URLSearchParams({
          community_pk: community.name,
        }),
      {
        // mode: 'cors',
        // credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Token ${idtoken}`,
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    // console.log("Community Posts are: "+JSON);
    // console.log(data)

    setCommunityDetails(data);
  };
  let handleJoinCommunity = async () => {
    let response = await fetch("http://localhost:8000/community/members/",{
      method: "POST",
      headers: {
        Authorization: `Token ${idtoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        community: community.name,
      }),
    });
    let data=await response.json();
    if(response.data.success){
      setIsMember(true);
    } 
  };
  console.log(communityDetails);
  return (
    // <div>
    //   <div className="bg-white px-6 py-32 lg:px-8">
    //     <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 back">
    //       <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //         {community.name}
    //       </h1>

    //     </div>
    //   </div>
    // </div>

    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="h-20 w-full" style={{ backgroundImage: `url(${community.banner})` }}>
          <h2 className="text-3xl align-text-bottom font-bold tracking-tight text-white sm:text-4xl">
            {community.name}
          </h2>
          </div>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {community.description}
          </p>
          {communityDetails.length === 0 && (
            <h1 className="mt-10">
              Hmmmm..... Seems like this is a new community. Create a post to
              see some content here !{" "}
            </h1>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
          <button
            type="submit"
            onClick={handleJoinCommunity}
            className="rounded-md mt-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isMember}
          >
            {isMember ? "Joined" : "Join"}
          </button>
          </div>
          <Link to={"/create"} state={community}>
            <button
              type="submit"
              className="rounded-md mt-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Post
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {communityDetails.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={
                  post.image
                    ? post.image
                    : "https://www.arteoral.com.br/wp-content/uploads/2016/04/dummy-post-square-1-768x768.jpg"
                }
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.datetime} className="mr-8">
                  {parseDate(post.created_at).date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img
                      src={post.user.picture}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-white/10"
                    />
                    {post.user.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link to="/post" state={post}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
    // <></>
  );
};

export default CommunityPage;
