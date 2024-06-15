import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpRegular, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";

function Post({ post }) {
  const url=import.meta.env.VITE_URL_NAME
  function parseDate(datestr) {
    const dateObj = new Date(datestr);

    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].split(".")[0];
    return { date, time };
  }
  return (
    <div className="flex flex-row gap-x-6">
      {post.image && (
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 ">
        <img
          src={post.image}
          alt=""
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      )}
    <article
      key={post.id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      {/* {console.log(post)} */}
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={"2020-03-16"} className="text-gray-500">
          {parseDate(post.created_at).date}
        </time>
        <Link
          to="/post"
          state={post}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {post.community.name}
        </Link>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link to="/post" state={post}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.content}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={post.user.picture}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href={"#"}>
              <span className="absolute inset-0" />
              {/* {post.author.name} */}
              {post.user.name}
            </a>
          </p>
          {/* <p className="text-gray-600">
                Reader
              </p> */}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="p-5">
          <FontAwesomeIcon className="size-7" icon={post.vote ? faThumbsUpSolid : faThumbsUpRegular} />
        </div>
        <div className="p-5">
          <FontAwesomeIcon className="size-7" icon={faCommentDots} />
        </div>
      </div>
    </article>
    </div>
  );
}

export default Post;
