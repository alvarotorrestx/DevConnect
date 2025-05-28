import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;

export default function Footer() {
  return (
    <div className="bg-base-200 sm:p-1  w-full">
      <div className="min-[400px] sm:min-h-[300px] sm:p-1 mt-2  p-2 flex flex-col sm:items-center sm:justify-center">
        <div className="sm:flex sm:items-center sm:justify-center sm:space-y-2 font-sans sm:gap-[120px]">
          <div className="sm:mt-9 mt-9">
            <h1 className="italic text-[22px] text-base-content sm:text-[27px] font-sans font-[400] pl-1 sm:leading-[35px] leading-[28px]">
             DevConnect <br />
             a platform for developer <br /> community.
            </h1>
          </div>
          <div className="sm:gap-[120px] mt-2  sm:mt-0 flex gap-[70px]">
            <div className="sm:text-[18px]">
              <a href="/">
                <h2 className="mt-2 text-base-content">
                  Home{" "}
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 ml-6 text-base-content text-[15px]"
                  />
                </h2>
              </a>
              <a href="/">
                <h2 className="mt-2 text-base-content">
                  Blog{" "}
                  <FontAwesomeIcon
                    icon={faArrowUp}
                   className="rotate-45 ml-9 text-base-content text-[15px]"
                  />
                </h2>
              </a>
              <a href="/network">
                <h2 className="mt-2 text-base-content">
                  Network{" "}
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 ml-2
                     text-base-content text-[15px]"
                  />
                </h2>
              </a>
              <a href="/">
                <h2 className="mt-2 text-base-content">
                  Jobs{" "}
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 ml-9 text-base-content text-[15px]"
                  />
                </h2>
              </a>
            </div>

            <div>
              <h2 className="flex cursor-pointer items-center mt-2 space-x-4">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <span className="sm:text-[18px] mr-8 text-base-content">Linkedin</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 text-base-content text-[15px]"
                  />
                </a>
              </h2>
              <h2 className="flex cursor-pointer mt-2 items-center space-x-4">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <span className="sm:text-[18px] mr-12 text-base-content">Github</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 text-base-content text-[15px]"
                  />
                </a>
              </h2>
              <h2 className="flex items-center mt-2 space-x-4">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <span className="sm:text-[18px] mr-5 text-base-content">Instagram</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 text-base-content text-[15px]"
                  />
                </a>
              </h2>
              <h2 className="flex flex-row items-center mt-2 space-x-4">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <span className="sm:text-[18px] mr-10 text-base-content">Discord</span>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="rotate-45 text-base-content sm:text-[15px]"
                  />
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:h-[47px] h-[40px] mt-4 sm:mt-0 flex items-center justify-center w-full">
        <div className="w-[94%] sm:text-[15px] text-[12px] h-full flex items-center justify-between sm:px-9 px-2 border-t-2 border-[#9d9d9d]">
          <p className="hover:underline cursor-pointer">© 2025 Copyright by DevConnect</p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="sm:text-xl text-sm mr-2" />
            <a href="mailto:Devconnect@gmail.com" className="hover:underline">
              Email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
