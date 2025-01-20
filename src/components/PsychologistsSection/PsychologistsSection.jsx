import { useEffect } from "react";
import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";
import { database } from "../../../firebaseConfig.js";
import { get, ref } from "firebase/database";

const PsychologistsSection = () => {
  useEffect(() => {
    const rootRef = ref(database);

    get(rootRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("All data fetched:", data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching all data:", error);
      });
  }, []);

  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <FiltersBtn />
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
