import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { Form } from "../Form/Form";

export function Contact() {
  return (
    <Container id="contact">
      <header>
        <h2>Contact</h2>
        <p>Ready to get started on your project? </p>
        <p>Contact me now for a Free consultation.</p>
      </header>
      <div className="contacts">
        <a
          className="contact__item"
          href="mailto:abdumalikoviskandar600@gmail.com"
        >
          <img src={emailIcon} alt="Email" />
          <a
            style={{ color: "black" }}
            href="mailto:abdumalikoviskandar600@gmail.com"
          >
            My email
          </a>
        </a>
        <a className="contact__item" href="tel:+998882784041">
          <img src={phoneIcon} alt="Phone No" />
          <a style={{ color: "black" }} href="tel:+998882784041">
            Phone
          </a>
        </a>
      </div>
      <Form></Form>
    </Container>
  );
}
