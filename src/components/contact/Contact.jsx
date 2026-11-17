import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section page-shell" id="contact">
      <div className="contact-copy">
        <p className="section-kicker">Have a project in mind?</p>
        <h2>Let’s Create<br />Something Meaningful.</h2>
        <p className="contact-description">
          I’m open to connecting, learning about interesting opportunities and
          collaborating on meaningful technology projects.
        </p>
        <div className="contact-links">
          <a href="mailto:quintawsusan@gmail.com">quintawsusan@gmail.com</a>
          <a href="https://www.linkedin.com/in/quinta-susan" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/quintawsusan" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <div className="contact-actions">
          <a className="button-primary" href="mailto:quintawsusan@gmail.com">Say hello</a>
          <a className="button-quiet" href="/documents/quinta-susan-cv.pdf" download>Download CV</a>
        </div>
      </div>
      <div className="contact-art" aria-hidden="true"><span>✳</span><span>✳</span></div>
    </section>
  );
}
