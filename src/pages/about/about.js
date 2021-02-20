import React from "react";
import "./about.css";

export default function AboutPage() {
  return (
    <section className="about-section">
      <div>
        <div>
          <strong className="about-text">
            <p>
              Welcome to BlogIt! Your number one source for online messaging. We
              are dedicated to giving you the freedom to express yourself
              freely.
            </p>
            <br />
            <p>
              Founded in 2015 by Juan M. Avero, BlogIt! It has come a long way
              since its inception in Rosario. When Juan began his passion for
              freedom, he wanted to start his own business, where we all have
              the same freedoms.
            </p>
            <br />
            <p>
              {" "}
              We hope you enjoy our service as much as we enjoy offering it to
              you. If you have any questions or comments, feel free to contact
              us.
            </p>
            <br />
            <p>Sincerely, BlogIt! team</p>
          </strong>{" "}
        </div>
      </div>
    </section>
  );
}
