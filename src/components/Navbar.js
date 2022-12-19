// import React, { useState } from "react";
// import NavbarCSS from "./Navbar.module.css";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
//   const [menuClicked, setMenuClicked] = useState(false);

//   const navbarLinks = [
//     { url: "#", title: "Home" },
//     { url: "#", title: "Trips" },
//     { url: "#", title: "Rewards" },
//   ];

//   let navbarcss_list_class = NavbarCSS.navbar__list;
//   let navbarcss_list_class_active = NavbarCSS.navbar__list__active;

//   const toggleMenuClick = () => {
//     setMenuClicked(!menuClicked);
//   };

//   return (
//     <nav className={NavbarCSS.navbar}>
//       <span className={NavbarCSS.navbar__logo}>travell</span>
//       {menuClicked ? (
//         <FiX
//           size={25}
//           className={NavbarCSS.navbar__menu}
//           onClick={toggleMenuClick}
//         />
//       ) : (
//         <FiMenu
//           size={25}
//           className={NavbarCSS.navbar__menu}
//           onClick={toggleMenuClick}
//         />
//       )}
//       <ul
//         className={
//           menuClicked
//             ? navbarcss_list_class && navbarcss_list_class_active
//             : NavbarCSS.navbar__list
//         }
//       >
//         {navbarLinks.map((item, index) => {
//           return (
//             <li className={NavbarCSS.navbar__item} key={index}>
//               <a className={NavbarCSS.navbar__link} href={item.url}>
//                 {item.title}
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);

  const navbarLinks = [
    { url: "#", title: "Home" },
    { url: "#usage", title: "Nasıl Kullanılır?" },
    { url: "#contact", title: "İletişim" },
  ];

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <nav className="navbar">
      <span className="navbar__logo">Smartcode</span>
      {menuClicked ? (
        <FiX size={25} className={"navbar__menu"} onClick={toggleMenuClick} />
      ) : (
        <FiMenu
          size={25}
          className={"navbar__menu"}
          onClick={toggleMenuClick}
        />
      )}
      <ul
        className={
          menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
        }
      >
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <Link smooth className="navbar__link" to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
