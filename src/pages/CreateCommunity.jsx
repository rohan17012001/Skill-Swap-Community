/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/authContext";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Createcommunity() {
  const location = useLocation();
  //   const community = location.state;
  const url=import.meta.env.VITE_URL_NAME
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const idtoken = localStorage.getItem("token");
  console.log(idtoken)
  const navigate = useNavigate();
  function handleProfileImageChange(event) {
    // console.log("putting image")
    console.log(event.target.files[0]);
    setProfileImage(event.target.files[0]);
    console.log(profileImage);
  }
  function handleBannerImageChange(event) {
    // console.log("putting image")
    console.log(event.target.files[0]);
    setBannerImage(event.target.files[0]);
    console.log(bannerImage);
  }
  let handleCreateCommunity = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("community", community.name);
    formData.append("name", title);
    formData.append("description", content);
    formData.append("skill", skill);
    formData.append("profile_image", profileImage);
    formData.append("banner", bannerImage);
    let response = await fetch(`${url}/community/`, {
      mode: "cors",
      // credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Token ${idtoken}`,
        // "Content-Type": "application/json",
      },
      body: formData,
    });
    let data = await response.json();
    console.log(data);
    redirect("/community");
    navigate(-1);
  };
  useEffect(() => {
    let getSkills = async () => {
      let response = await fetch(`${url}/community/skills/`, {
        method: "GET",
        headers: { 
          Authorization: `Token ${idtoken}`,
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      setAllSkills(data);
    }
    getSkills();
  }, []);
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create a community
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Create a community where you can share your thoughts and ideas with
            others, and others can do the same with you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title here..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              {/* </div> */}
              <div className="">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Skill Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Title Here/</span> */}
                    <select 
                      name="skills"
                      id="skills"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => setSkill(e.target.value)}
                    >
                      {allSkills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                          </option>
                      ))}
                      </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content Here
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
            </div>

            {/* <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div> */}

            <div className="col-span-full my-2">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="dp-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="dp-upload"
                        name="dp-upload"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        className="sr-only"
                        onChange={handleProfileImageChange}
                      />
                    </label>
                    <p className="pl-1">{profileImage.name}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full my-2">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Banner Picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="cover-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="cover-upload"
                        name="cover-upload"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        className="sr-only"
                        onChange={handleBannerImageChange}
                      />
                    </label>
                    <p className="pl-1">{bannerImage.name}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCreateCommunity}
        >
          Save
        </button>
      </div>
    </form>
  );
}
