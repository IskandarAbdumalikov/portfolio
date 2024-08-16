import { Container, ContainerSucces } from "./styles";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import validator from "validator";

const BOT_TOKEN = "7177289161:AAHsDSL97FVQ4fn-YiMr9oWa9udUems4nvU";
const CHAT_ID = "-1002195368941";

export function Form() {
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function verifyEmail(email: string) {
    if (validator.isEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  function verifyPhone(phone: string) {
    const cleanedPhone = phone.replace(/\D/g, "");
    if (validator.isMobilePhone(cleanedPhone, "uz-UZ")) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 12) value = value.slice(0, 12);
    const formattedPhone = value.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "+$1 $2 $3 $4 $5"
    );
    setPhone(formattedPhone);
    verifyPhone(formattedPhone);
  }

  async function sendToTelegram(
    email: string,
    phone: string,
    message: string,
    telegramLink: string
  ) {
    const text = `Email: ${email}\nPhone: ${phone}\nTelegram: ${telegramLink}\nMessage: ${message}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(
      text
    )}`;

    try {
      await fetch(url);
      toast.success("Message sent to Telegram!", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: "telegram",
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      toast.error("Failed to send message to Telegram.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: "telegram-error",
      });
    }
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const phone = event.currentTarget.phone.value;
    const message = event.currentTarget.message.value;
    const telegramLink = event.currentTarget.telegram.value;

    sendToTelegram(email, phone, message, telegramLink);
  }

  if (submitted) {
    return (
      <ContainerSucces>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to the top
        </button>
        <ToastContainer />
      </ContainerSucces>
    );
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            verifyEmail(e.target.value);
          }}
          required
        />

        <input
          placeholder="Phone (+998 99 123 45 67)"
          id="phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
        />

        <input
          placeholder="Telegram Link"
          id="telegram"
          type="text"
          name="telegram"
          onChange={(e) => {
            setTelegramLink(e.target.value);
          }}
        />

        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button type="submit" disabled={!validEmail || !validPhone || !message}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </Container>
  );
}
