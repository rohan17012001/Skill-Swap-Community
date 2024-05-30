import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import CommunityPage from "../pages/CommunityPage";
import { format, parseISO } from "date-fns";

function Community({ community }) {
  function parseDate(datestr) {
    const dateObj = new Date(datestr);

    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].split(".")[0];
    return { date, time };
  }
  return (
    <div className="flex flex-row gap-x-6">
      {community.profile_image && (
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 ">
          <img
            src={community.profile_image}
            alt=""
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <article
        //   key={post.id}
        className="flex max-w-xl flex-col items-start justify-between"
      >
        {/* {console.log(post)} */}
        <div className="flex items-center gap-x-4 text-xs">
          {/* <time dateTime={"2020-03-16"} className="text-gray-500">
          {parseDate(post.created_at).date}
        </time> */}
          <Link
            to="/community"
            state={community}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {community.skill.name}
          </Link>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link to="/community" state={community}>
              <span className="absolute inset-0" />
              {community.name}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {community.description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          {/* <img
          src={post.user.picture}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        /> */}
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href={"#"}>
                <span className="absolute inset-0" />
                {/* {post.author.name} */}
                Members: {community.members.length}
              </a>
            </p>
            {/* <p className="text-gray-600">
                Reader
              </p> */}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="p-5">
            {community.is_member ? (
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Joined
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Join
              </button>
            )}
          </div>
          {/* <div className="p-5">
            <FontAwesomeIcon className="size-7" icon={faCommentDots} />
          </div> */}
        </div>
      </article>
    </div>
  );
}

export default Community;
