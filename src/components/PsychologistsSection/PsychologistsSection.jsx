// import { useEffect } from "react";
import Container from "../Container/Container.jsx";
import FiltersBtn from "../FiltersBtn/FiltersBtn.jsx";
import Section from "../Section/Section.jsx";

import css from "./PsychologistsSection.module.css";
// import { database } from "../../../firebaseConfig.js";
// import { get, limitToFirst, query, ref } from "firebase/database";
import data from "../../../temp/data.json";

const PsychologistsSection = () => {
  // useEffect(() => {
  //   const queryPsychologists = query(
  //     ref(database, "psychologists"),
  //     limitToFirst(3)
  //   );

  //   get(queryPsychologists)
  //     .then((response) => {
  //       if (response.exists()) {
  //         const data = response.val();
  //         console.log("All data fetched:", data);
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching all data:", error);
  //     });
  // }, []);

  console.log(data);

  return (
    <Section className={css.psychologistsSection}>
      <Container>
        <FiltersBtn />
      </Container>
    </Section>
  );
};

export default PsychologistsSection;
