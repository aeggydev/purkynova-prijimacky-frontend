import spsLogo from "./icons/sspbrno.png";
import "./styles/output.css";

function Header() {
  return (
    <a
      href="http://sspbrno.cz"
      target="_blank"
      rel="noreferrer"
      className="text-white w-full h-14 md:h-32 bg-[#333A42] items-center flex flex-row px-2 md:px-36"
    >
      <img
        src={spsLogo}
        alt="Logo školy"
        className="h-auto w-auto max-h-10 md:max-h-20"
      />
      <div className="ml-12 flex flex-col">
        <span className="md:text-xl md:mb-0.5 hidden md:block">
          Střední průmyslová škola Brno, Purkyňova, příspěvková organizace
        </span>
        <span className="text-lg md:text-2xl">PŘÍJMAČKY NANEČISTO</span>
      </div>
    </a>
  );
}

export default Header;
