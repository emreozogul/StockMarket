import AuthLayout from "@/components/containers/AuthLayout";
import Link from "next/link";
import Head from "next/head";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useFormik } from "formik";
import { useState } from "react";
import registerValidate from "@/lib/validation/validate";
import { motion } from "framer-motion";

import { useRouter } from "next/router";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    console.log(values);
    await fetch("http://localhost:3000/api/auth/signUp", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000/login");
      });
  }

  return (
    <AuthLayout page={"register"}>
      <title>Register</title>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10 py-4">
        <div className="title">
          <motion.h1
            className="text-gray-800 text-4xl font-bold py-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3 }}
          >
            Register
          </motion.h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg  ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="text"
              name="Username"
              placeholder="Username"
              className=" w-full px-4 py-2 focus:outline-none rounded-lg"
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
          <div
            className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 focus:outline-none rounded-lg"
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
          <div
            className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="w-full px-4 py-2 focus:outline-none rounded-lg"
              {...formik.getFieldProps("password")}
            />
            <span
              className={`icon flex items-center px-4 ${
                show.password ? "text-blue-500" : ""
              }`}
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

          <div
            className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 focus:outline-none rounded-lg"
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

          {/* login buttons */}
          <div className="">
            <button
              type="submit"
              className="bg-blue-300 w-full text-white py-2 rounded-md hover:bg-blue-400 "
              onClick={formik.handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account?{" "}
          <Link href={"/login"} legacyBehavior>
            <a className="text-blue-700">Sign In</a>
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
