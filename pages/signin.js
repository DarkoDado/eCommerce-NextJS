import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "../styles/signin.module.scss";
import IconBtn from "@/components/buttons/iconBtn";
import { getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
  const initialValues = {
    login_email: "",
    login_pw: "",
  };
  const [user, setUser] = useState(initialValues);
  const { login_email, login_pw } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required!")
      .email("Please enter a valid emaila ddress"),
    login_pw: Yup.string().required("Please enter a password"),
  });
  return (
    <>
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
                  <button className={styles.socialBtn} onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
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
