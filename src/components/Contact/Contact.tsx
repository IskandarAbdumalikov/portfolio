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
        <a className="contact__item" href="mailto:muhammadyusufwork1@gmail.com">
          <img src={emailIcon} alt="Email" />
          <p>Email.com</p>
        </a>
        <a className="contact__item" href="tel:+998930383347">
          <img src={phoneIcon} alt="Phone No" />
          <p>Phone</p>
        </a>
      </div>
      <Form></Form>
    </Container>
  );
}
