import Footer from "../../../components/footer";
import Header from "../../../components/header";
import styles from "../../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import IconBtn from "../../../components/buttons/iconBtn";
import LoginInput from "../../../components/inputs/loginInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import LoaderSpinner from "../../../components/loaders/LoaderSpinner";
import jwt from "jsonwebtoken";
import { getSession, signIn } from "next-auth/react";
import { Router } from "next/router";

export default function reset({ user_id }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Enter your new password!")
      .min(6, "Password must be atleast 6 characters")
      .max(15, "Password can't be more than 15characters."),
    confirm_password: Yup.string()
      .required("Confirm your password!")
      .oneOf([Yup.ref("password")], "Passwords must match!"),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true)
      Router.push('/')
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <LoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password ?<Link href="/">Login instead</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              password,
              confirmPassword,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  name="password"
                  type="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  name="confirmPassword"
                  type="password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <IconBtn type="submit" text="Change password" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                 
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({req})
  if(session) {
    return {
        redirect: {
            destination: '/'
        }
    }
  }
  const token = query.token;
//   const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
    //   user_id: user_id.id,
    },
  };
}
