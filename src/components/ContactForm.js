import "./FormStyles.css";
import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";

const ContactForm = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fm5hpet",
        "template_tf626gb",
        form.current,
        "wTNafF3rV_8qedcdB"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="formDiv" id="contact">
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <h2 className="iletisim">İletişim</h2>
          <label htmlFor="">Ad Soyad</label>
          <input type="text" name="user_name" />
          <label htmlFor="">Email</label>
          <input type="email" name="user_email"></input>
          <label htmlFor="">Konu</label>
          <input type="text" name="user_subject"></input>
          <label htmlFor="">Mesaj</label>
          <textarea
            name="message"
            placeholder="Mesajınızı buraya yazınız"
            rows="6"
          ></textarea>
          <button className="btnContact">Gönder</button>
          {done && (
            <p style={{ textAlign: "center", marginTop: "1.5em" }}>
              Thank you!
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default ContactForm;
