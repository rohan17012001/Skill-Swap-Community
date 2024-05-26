import Posts from "./Post";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
// import { useUser } from "../../context/authContext/index.jsx";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../components/Post.jsx";
import { useUser } from "../../context/authContext/index.jsx";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

function parseDate(datestr){
  const dateObj = new Date(datestr);

  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toISOString().split('T')[1].split('.')[0];
  return { date, time }
}

export default function Fyp() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getposts();
  }, []);
  const idtoken = localStorage.getItem("token");
  // console.log(idtoken)
  let getposts = async () => {
    let response = await fetch("http://localhost:8000/post/", {
      mode: 'cors',
      // credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Token ${idtoken}`,
        "Content-Type": "application/json",
      },
    });
    // let response = await axios.get("http://localhost:8000/post/", {
    //   headers: {
    //     Authorization: `Token ${idtoken}`,
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true, // If you need to send cookies
    // });
    let data = await response.json();
    console.log(data);
    setPosts(data);
  };
  // console.log(idtoken);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            For You
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Here is all we have in store for you !
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={"2020-03-16"} className="text-gray-500">
                    {parseDate(post.created_at).date}
                  </time>
                  <Link
                    to="/post"
                    state={post}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.community}
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
                    src={
                      post.user.picture
                    }
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </div>
                  <div className="p-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react'
// import { Link } from 'react-router-dom'
// import Posts from './Post'
// import { useState, useEffect } from 'react'

// const posts = [
//     {
//       id: 1,
//       title: 'Boost your conversion rate',
//       href: '#',
//       description:
//         'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//       date: 'Mar 16, 2020',
//       datetime: '2020-03-16',
//       category: { title: 'Marketing', href: '#' },
//       author: {
//         name: 'Michael Foster',
//         role: 'Co-Founder / CTO',
//         href: '#',
//         imageUrl:
//           'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       },
//     },
//     // More posts...
//   ]

//   export default function Fyp() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//         getposts()
//     }, [])
//     let getposts = async () => {
//         let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//             // mode: 'cors',
//             credentials: 'include',
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         let data = await response.json()
//         console.log(data)
//         setPosts(data)
//     }
//     return (
//       <div className="bg-white py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">For You</h2>
//             <p className="mt-2 text-lg leading-8 text-gray-600">
//               Here is all we have in store for you !
//             </p>
//           </div>
//           <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {posts.map((post) => (
//                 <>
//               <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
//                 <div className="flex items-center gap-x-4 text-xs">
//                   <time dateTime={'2020-03-16'} className="text-gray-500">
//                     {'Mar 16, 2020'}
//                   </time>
//                   <Link to="/post" state={post}
//                     className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                   >
//                     r/{post.title}
//                   </Link>
//                 </div>
//                 <div className="group relative">
//                   <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                     <Link to="/post" state={post}>
//                       <span className="absolute inset-0" />
//                       {post.title}
//                     </Link>
//                   </h3>
//                   <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.body}</p>
//                 </div>
//                 <div className="relative mt-8 flex items-center gap-x-4">
//                   <img src={'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
//                   <div className="text-sm leading-6">
//                     <p className="font-semibold text-gray-900">
//                       <a href={'#'}>
//                         <span className="absolute inset-0" />
//                         {'Rohan'}
//                       </a>
//                     </p>
//                     <p className="text-gray-600">{'reader'}</p>
//                   </div>
//                 </div>
//               </article>
//               </>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }
