import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { IoMdClose } from "react-icons/io";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { toast } from "react-hot-toast";

const Auth = () => {
  const { setShowAuth, axios, setIsLoggedIn, setUserData } = useAppContext();
  const [isSignIn, setIsSignIn] = useState(true);
  const fileInputRef = useRef(null);

  //States for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  //API call loaidng state
  const [loading, setLoading] = useState(false);

  // Triggers hidden input:file when button clicked
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  //Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  //Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignIn) {
        // SignIn Logic
        const { data } = await axios.post("/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          setUserData(data.userData);
        } else {
          toast.error(data.message);
        }
      } else {
        //SignUp Logic
        const formData = new FormData(); //Creating a formData to add all fields at once
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", imageFile);
        const { data } = await axios.post("/api/auth/register", formData);
        if (data.success) {
          toast.success(data.message)
          setIsLoggedIn(true);
          setUserData(data.userData);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setShowAuth(false);
    }
  };

  return (
    <div
      id="login-popup"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowAuth(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full p-1 cursor-pointer"
          aria-label="Close popup"
        >
          <IoMdClose className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-slate-900 mb-1">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h3>
          <p className="text-sm text-slate-600">
            {isSignIn ? "Sign In to your account" : "Create your account"}
          </p>
        </div>

        {/* Email/Password Form */}
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {/* Name only when sign up  */}
          {!isSignIn && (
            <div>
              <label htmlFor="email" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
              />
            </div>
          )}
          {/* Email  */}
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
          />
          {/* Password  */}
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
          />
          {/* ProfileAvatar only when signUp  */}
          {!isSignIn && (
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="password" className="text-gray-500 py-1">
                Profile Photo
              </label>
              <button
                type="button"
                onClick={handleFileUpload}
                className="
                  flex items-center gap-3
                  px-6 py-3
                  bg-orange-500 text-white
                  text-xs font-semibold uppercase
                  rounded-lg
                  shadow-md
                  hover:shadow-lg
                  focus:opacity-90 focus:shadow-none
                  transition duration-600 ease-in-out
                  select-none
                  border-none
                  cursor-pointer
                "
              >
                <HiOutlineDocumentAdd className="w-5 h-5" />
                {/* Hidden input file which triggers on button click  */}
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                />
                ADD FILE
              </button>
              {preview && <img src={preview} alt="preview" className="w-20 h-20 rounded-full" />}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className={`w-full rounded-md  py-3 text-white font-medium  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition disabled:bg-gray-400 cursor-pointer ${
              loading ? "bg-gray-500" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {isSignIn ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-md text-slate-600">
          {isSignIn ? "Don't have an account?" : "Already have an Acount?"}
          <p
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-medium text-orange-600 hover:text-orange-500 cursor-pointer"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
