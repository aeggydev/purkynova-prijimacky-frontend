// @ts-ignore
import spsLogo from "url:./icons/sspbrno.png";
import React from "react"

function Header() {
  return (
    <a
      href="http://sspbrno.cz"
      target="_blank"
      rel="noreferrer"
      style={{color: "white", width: "100%", height: "8rem", background: "#333A42",
        alignItems: "center", display: "flex", flexDirection: "row", padding: "0 9rem"}}
    >
      <img
        src={spsLogo}
        alt="Logo školy"
        style={{height: "auto", width: "auto", maxHeight: "5rem"}}
      />
      <div style={{marginLeft: "3rem", display: "flex", flexDirection: "column"}}>
        <span style={{fontSize: "1.25rem", lineHeight: "1.75rem", marginBottom: "0.125rem", display: "block"}}>
          Střední průmyslová škola Brno, Purkyňova, příspěvková organizace
        </span>
        <span style={{fontSize: "1.5rem", lineHeight: "2rem"}}>PŘÍJMAČKY NANEČISTO</span>
      </div>
    </a>
  );
}

export default Header;
