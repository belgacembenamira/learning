/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 28/08/2023 - 13:44:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
/**
 * @description      : Contact component
 * @Author           : belgacem
 * @created          : 22/04/2023 - 19:29:23
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 22/04/2023
 * - Author          : belgacem
 * - Modification    :
 **/

import "./contact.css";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const subject = formData.get("subject");
    const email = formData.get("email");
    const message = formData.get("message");

    const body = `name: ${name}\nSubject: ${subject}\nEmail: ${email}\nMessage: ${message}`;

    const mailtoLink = `mailto:benamierabelgacem@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);

    navigate("/");
  };

  return (
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="bi bi-house-fill"></i>
                Address
              </div>
              <p className="contact-item-text">Tunisie</p>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="bi bi-telephone-fill"></i>
                Phone
              </div>
              <p className="contact-item-text">93287025</p>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="bi bi-envelope-fill"></i>
                Email
              </div>
              <p className="contact-item-text">benamierabelgace@gmail.com</p>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="contact-form">
              <h2 className="contact-form-title">Contact Us Form</h2>
              <div className="contact-input-wrapper">
                <input type="text" placeholder="Name *" name="name" required />
                <input type="text" placeholder="Subject *" name="subject" required />
                <input type="email" placeholder="Email *" name="email" required />
              </div>
              <textarea
                placeholder="Your Message *"
                className="contact-textarea"
                rows={5}
                name="message"
                required
              ></textarea>
              <button className="btn btn-primary text-center w-100" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
