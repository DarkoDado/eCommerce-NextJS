import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import IconBtn from "@/components/buttons/iconBtn";
import LoginInput from "@/components/inputs/loginInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import LoaderSpinner from "@/components/loaders/LoaderSpinner";
export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Enter your valid address.")
      .email("Please enter a valid emaila ddress"),
  });
  const forgotHandler = async () => {;
  try {
    setLoading(true)
    const {data} = await axios.post("/api/auth/forgot", {
      email,
    })
    setError("")
    setSuccess(data.message)
    setLoading(false)
    setEmail("")
  } catch (error) {
    setLoading(false)
    setSuccess("")
    setError(error.response.data.message)
  }
}
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
              Forgot your password ?<Link href="/">Login instead</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  name="email"
                  type="text"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <IconBtn type="submit" text="Send link" />
                <div style={{marginTop: "10px"}}>
                {error && <span className={styles.error}>{error}</span>}
                {success && <span className={styles.success}>{success}</span>}
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
