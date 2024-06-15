import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Comments from "../components/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpRegular,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";

export default function Posts() {
  // const [comments, setComments] = useState([]);
  const url = import.meta.env.VITE_URL_NAME;
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const handleCommentClick = () => {
    setShowCommentBox((prevState) => !prevState);
    console.log("prevState ", showCommentBox);
  };
  useEffect(() => {
    // getComments();
  }, []);
  // const [communityDetails, setCommunityDetails] = useState([]);
  // useEffect(() => {
  //   getCommunityDetails();
  // }, []);

  const idtoken = localStorage.getItem("token");
  // let getComments = async () => {
  //   let response = await fetch(
  //     "http://localhost:8000/post/community?" +
  //       new URLSearchParams({
  //         community_pk: community.name,
  //       }),
  //     {
  //       // mode: 'cors',
  //       // credentials: "include",
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${idtoken}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   let data = await response.json();
  //   // console.log("Community Posts are: "+JSON);
  //   // console.log(data)

  //   setCommunityDetails(data);
  // };

  const location = useLocation();
  const post = location.state;
  const [like, setLike] = useState(post.vote);
  console.log(post);

  const VotePostMutation = useMutation({
    mutationFn: async ({ id, val }) => {
      console.log(id, val, "mutationFn");
      let response = await fetch(`${url}/post/vote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          post: id,
          value: val,
        }),
      });
      let data = JSON.stringify(await response.json());
      console.log(data);
      return data;
    },
    onMutate: async (res) => {
      console.log("onMutate", res);
    },
    onError: async (error, variables, context) => {
      console.log("onError");
      console.log(error, variables, context);
    },
    onSuccess: async (data, variables, context) => {
      console.log("onSuccess");
    },
  });

  let votePost = async (id, val) => {
    let response = await fetch(`${url}/post/vote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        post: id,
        value: val,
      }),
    });
    let data = await response.json();
    console.log(data);
  };
  let commentOnPost = async () => {
    let response = await fetch(`${url}/post/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        post: post.id,
        content: comment,
      }),
    });
    let data = await response.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <>
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          {/* <p className="text-base font-semibold leading-7 text-indigo-600">
          Introducing
        </p> */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          {/* <p className="mt-6 text-xl leading-8">{post.title}</p> */}
          <div className="mt-10 max-w-3xl">
            <p>{post.body}</p>
            {/* <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Data types.
                </strong>{" "}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Loops.</strong>{" "}
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">Events.</strong>{" "}
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                Et magna sit morbi lobortis.
              </span>
            </li>
          </ul> */}
            {/* <p className="mt-8">
            {post.content}
          </p> */}
            {/* <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            From beginner to expert in 3 hours
          </h2>
          <p className="mt-6">
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
            in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
            mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
            tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
            Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
            diam.
          </p> */}
            <figure className="mt-10 border-l border-indigo-600 pl-9">
              <blockquote className="font-semibold text-gray-900">
                <p>“{post.content}”</p>
              </blockquote>
              <figcaption className="mt-6 flex gap-x-4">
                <img
                  className="h-6 w-6 flex-none rounded-full bg-gray-50"
                  src={post.user.picture}
                  alt=""
                />
                <div className="text-sm leading-6">
                  <strong className="font-semibold text-gray-900">
                    {post.user.name}
                  </strong>{" "}
                  {/* – Marketing Manager */}
                </div>
              </figcaption>
            </figure>
            {/* <p className="mt-10">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p> */}
          </div>
          {post.image && (
            <div className="flex justify-center items-center">
              <figure className="mt-16">
                <img
                  className="aspect-video rounded-xl  bg-gray-50 object-cover mb-5"
                  src={post.image}
                  alt=""
                />
              </figure>
            </div>
          )}
          {/* <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Everything you need to get up and running
            </h2>
            <p className="mt-6">
              Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
              varius orci dapibus volutpat cras. In amet eu ridiculus leo
              sodales cursus tristique. Tincidunt sed tempus ut viverra
              ridiculus non molestie. Gravida quis fringilla amet eget dui
              tempor dignissim. Facilisis auctor venenatis varius nunc, congue
              erat ac. Cras fermentum convallis quam.
            </p>
            <p className="mt-8">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div> */}
        </div>
        <div className="grid grid-cols-2">
          <div className="p-5">
            <FontAwesomeIcon
              className="size-7"
              icon={like ? faThumbsUpSolid : faThumbsUpRegular}
              onClick={() => {
                if (post.vote !== null) {
                  VotePostMutation.mutate({ id: post.id, val: 0 });
                } else {
                  VotePostMutation.mutate({ id: post.id, val: 1 });
                }
                setLike((prevState) => !prevState);
              }}
            />
          </div>
          <div className="p-5">
            <FontAwesomeIcon
              className="size-7"
              icon={faCommentDots}
              onClick={handleCommentClick}
            />
          </div>
        </div>
      </div>
      {showCommentBox && (
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="col-span-4">
            <textarea
              id="comment"
              name="comment"
              // rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={commentOnPost}
          >
            Save
          </button>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Comments
        </h2>
        {/* <h2 className="left-0">Comments</h2> */}
        <Comments postid={post.id} parent={null} />
      </div>
    </>
  );
}
