import Image from "next/image";
import UserImage from "../../public/images/user.gif";
import { ContainerWrapper } from "./page.styled";
import CoverImage from "../../public/images/cover_bg_3.jpg";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";

export default function Home() {
  return (
    <ContainerWrapper>
      <Image
        className="mainWrapper"
        data-stellar-background-ratio="0.5"
        src={CoverImage}
        alt={"user-image"}
        width={1200}
        height={800}
        priority
      />
      <div className="overlay">
        <div className="container">
          <div className="displayT">
            <div className="displayTc" data-animate-effect="fadeIn">
              <Image
                className="profile-image"
                src={UserImage}
                alt={"user-image"}
                width={100}
                height={100}
                priority
              />
              <div className="name-text">
                <span>~ Bibin Maharjan ~</span>
              </div>
              <div className="role-text">
                <span>Software Engineer</span>
              </div>
              <div className="social-icons">
                <Link
                  as="link"
                  href="https://www.linkedin.com/in/bbinmaharjan"
                  target="_blank"
                >
                  <BsLinkedin size={"20px"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
}
