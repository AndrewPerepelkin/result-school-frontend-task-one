import React from "react";
const Qualitie = (props) => {
  const qualities = props.qualities;
  return (
    <>
      {qualities.map(qualitie => 
        (<span 
          key={qualitie._id} 
          className={`badge m-1 bg-${qualitie.color}`}>
          {qualitie.name}
        </span>))}
    </> 
  )
};
export default Qualitie;