// import React from "react";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useUser } from "../hooks/useUser";
// import { faCommentDots, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Post from '../components/Post.jsx';

// export default function Fyp() {
//   const [posts, setPosts] = useState([]);
//   const { currentUser } = useUser();
//   useEffect(() => {
//     getposts();
//   }, []);
//   let getposts = async () => {
//     let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       // mode: 'cors',
//       credentials: "include",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     let data = await response.json();
//     console.log(data);
//     setPosts(data);
//   };
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             For You
//           </h2>
//           <p className="mt-2 text-lg leading-8 text-gray-600">
//             Here is all we have in store for you !
//           </p>
//           <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
//             {posts.map((post,index) => (
//               <Post key={index} post={post} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
