import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validation/validate";
import { useRouter } from "next/router";
import AuthLayout from "@/components/containers/AuthLayout";
import { motion } from "framer-motion";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    }
  }

  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <AuthLayout page={"login"}>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10 py-4">
        <div className="title">
          <motion.h1
            className="text-gray-800 text-4xl font-bold py-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3 }}
          >
            Explore
          </motion.h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`relative flex flex-row justify-center w-full border rounded-md hover:border-blue-400  ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="focus:outline-none border-none w-full py-4 px-6 border rounded-md bg-slate-50;"
              {...formik.getFieldProps("email")}
            />
            <span className="flex items-center px-4 cursor-pointer text-gray-400">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

          <div
            className={`relative flex flex-row justify-center w-full border rounded-md hover:border-blue-400 ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="focus:outline-none border-none w-full py-4 px-6 border rounded-md bg-slate-50;"
              {...formik.getFieldProps("password")}
            />
            <span
              className={
                "flex items-center px-4 cursor-pointer text-gray-400" +
                (show ? " text-blue-400" : "") +
                " hover:text-blue-500 transition-all "
              }
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
          {/* login buttons */}

          <div className="input-button">
            <button
              type="submit"
              className="bg-blue-300 w-full rounded-md h-12 hover:bg-blue-400 transition-all text-white "
            >
              Login
            </button>
          </div>

          <div className=" flex flex-row justify-end items-center gap-4">
            <div className="bg-blue-100 rounded-full p-2">
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="flex flex-row  justify-center items-center"
              >
                <Image src={"/icons/google.svg"} width="20" height={20}></Image>
              </button>
            </div>
            <div className="bg-blue-100 rounded-full p-2">
              <button
                type="button"
                onClick={handleGithubSignin}
                className=" rounded-full flex flex-row  justify-center items-center"
              >
                <Image src={"/icons/github.svg"} width="24" height="24"></Image>
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          don't have an account yet?{" "}
          <Link href={"/register"} legacyBehavior>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
