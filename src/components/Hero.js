// import React from "react";
// import HeroCSS from "./Hero.module.css";

// const Hero = ({ imageSrc }) => {
//   return (
//     <div className={HeroCSS.hero}>
//       <img src={imageSrc} alt="Travel" className={HeroCSS.hero__image} />
//       <h1 className={HeroCSS.hero__title}>Travel made simple.</h1>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import "./Hero.css";

const Hero = ({ imageSrc }) => {
  return (
    <div className="hero">
      <img src={imageSrc} alt="Travel" className="hero__image" />
      <h1 className="hero__title">
        Sevdiklerinizi mutlu etmenin en güzel yolu.
      </h1>
    </div>
  );
};

export default Hero;
