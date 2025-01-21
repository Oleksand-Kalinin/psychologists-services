import PsychologistsListItem from "../PsychologistsListItem/PsychologistsListItem.jsx";

import css from "./PsychologistsList.module.css";

import data from "../../../temp/data.json";
console.log(data);

const PsychologistsList = () => {
  return (
    <ul className={css.list}>
      {data.map((item) => (
        <PsychologistsListItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default PsychologistsList;
