import Container from "../Container/Container.jsx";
import GetStartedBtn from "../GetStartedBtn/GetStartedBtn.jsx";
import Section from "../Section/Section.jsx";

import sprite from "../../images/sprite.svg";
import css from "./HeroSection.module.css";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    document.querySelector("body").style.backgroundColor =
      "var(--background-color-home)";
    return () => {
      document.querySelector("body").removeAttribute("style");
    };
  });

  return (
    <Section className={css.heroSection}>
      <Container className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>
            The road to the{" "}
            <span className={css.accept_colorGreen_styleItalic}>depths</span> of
            the human soul
          </h1>
          <p className={css.text}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <GetStartedBtn />
        </div>
        <div className={css.wrapperImage}>
          <div className={css.wrapperUsersIcon}>
            <svg className={css.usersIcon}>
              <use href={`${sprite}#users-icon`}></use>
            </svg>
          </div>
          <div className={css.wrapperQuestionMarkIcon}>
            <svg className={css.questionMarkIcon}>
              <use href={`${sprite}#question-mark-icon`}></use>
            </svg>
          </div>
          <div className={css.wrapperInfo}>
            <div className={css.wrapperCheckMark}>
              <svg className={css.checkMarkIcon}>
                <use href={`${sprite}#check-mark-icon`}></use>
              </svg>
            </div>
            <div className={css.info}>
              <p className={css.infoText}>Experienced psychologists</p>
              <p className={css.infoCountPsychologists}>15,000</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
