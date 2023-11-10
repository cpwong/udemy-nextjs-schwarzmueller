import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage(params) {
  return (
    <>
      <Head>
        <title>📝Contact me!</title>
      </Head>
      <ContactForm />
    </>
  )
};
