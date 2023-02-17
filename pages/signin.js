import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "../components/inputs/loginInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "../styles/signin.module.scss";
import IconBtn from "@/components/buttons/iconBtn";
import { getProviders, signIn } from "next-auth/react";
import axios from "axios";
import LoaderSpinner from "../components/loaders/LoaderSpinner/index";

export default function signin({ providers }) {
  const initialValues = {
    login_email: "",
    login_pw: "",
    name: "",
    email: "",
    password: "",
    success: "",
    error: "",
  };
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_pw,
    name,
    email,
    password,
    confirm_password,
    success,
    error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required!")
      .email("Please enter a valid emaila ddress"),
    login_pw: Yup.string().required("Please enter a password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Your name?")
      .min(2, "First name must be between 2 and 10characters.")
      .max(10, "First name must be between 2 and 10characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters aren't allowed!"),
    email: Yup.string().required("Enter your valid address."),
    password: Yup.string()
      .required("Enter your password")
      .min(6, "Password must be atleast 6 characters")
      .max(15, "Password can't be more than 15characters."),
    confirm_password: Yup.string()
      .required("Confirm your password!")
      .oneOf([Yup.ref("password")], "Passwords must match!"),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };
  return (
    <>
    {
      loading && <LoaderSpinner loading={loading}/>
    }
      <Header country="Serbia" />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign in</h1>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_pw,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    name="login_email"
                    type="text"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    name="login_pw"
                    type="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <IconBtn type="submit" text="Sign in" />
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login_socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login_socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button
                      className={styles.socialBtn}
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <h1>Sign up</h1>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confirm_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    name="name"
                    type="text"
                    icon="user"
                    placeholder="Full name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    name="email"
                    type="text"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    name="password"
                    type="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    name="confirm_password"
                    type="password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <IconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>{success && <span>{success}</span>}</div>
            <div>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
