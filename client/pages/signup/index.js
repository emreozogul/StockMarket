"use client";

import AuthLayout from "@/components/containers/AuthLayout";
import Link from "next/link";
import Head from "next/head";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { Formik } from "formik";
import { RegistrationSchema } from "@/utils/RegistrationSchema";
import { useState } from "react";
import { useRouter } from "next/router";

const initialValues = {
  email: "",
  password: "",
  cpassword: "",
};

export default function Signup() {
  const [show, setShow] = useState({
    password: false,
    cpassword: false,
  });
  const router = useRouter();

  return (
    <AuthLayout page={"signup"}>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10 py-4">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
        </div>
        <Formik
          initialValues={{ initialValues }}
          validationSchema={RegistrationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password } = values;

            const res = fetch("/api/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            console.log(res);

            if (res.status === 200) {
              alert("Success");
            }
            setSubmitting(false);

            router.push("/login");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div
                className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg `}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 focus:outline-none rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <span className="icon flex items-center px-4">
                  <HiAtSymbol size={25} />
                </span>
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>

              <div
                className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg`}
              >
                <input
                  type={show.password ? `text` : `password`}
                  name="password"
                  placeholder="password"
                  className={
                    "w-full px-4 py-2 focus:outline-none rounded-lg" +
                    (show.password ? " text-blue-400" : "")
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span
                  className={`icon flex items-center px-4 `}
                  onClick={() => setShow({ ...show, password: !show.password })}
                >
                  <HiFingerPrint size={25} />
                </span>
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>

              <div
                className={`flex flex-row border border-gray-300 w-full justify-between rounded-lg`}
              >
                <input
                  type={show.cpassword ? `text` : `password`}
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 focus:outline-none rounded-lg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpassword}
                />
                <span
                  className="icon flex items-center px-4"
                  onClick={() =>
                    setShow({ ...show, cpassword: !show.cpassword })
                  }
                >
                  <HiFingerPrint size={25} />
                </span>
                {errors.cpassword && touched.cpassword && (
                  <div className="input-feedback">{errors.cpassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-300 w-full text-white py-2 rounded-md hover:bg-blue-400 "
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </form>
          )}
        </Formik>

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
