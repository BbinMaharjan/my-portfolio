"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { BsLinkedin, BsGithub } from "react-icons/bs";

import UserImage from "../../public/images/user.gif";
import CoverImage from "../../public/images/cover_bg_3.jpg";
import { ContainerWrapper } from "./page.styled";

export default function Home() {
  return (
    <ContainerWrapper>
      <Image
        className="mainWrapper"
        src={CoverImage}
        alt="Cover background"
        fill
        priority
      />

      <div className="overlay">
        <div className="container">
          <div className="displayT">
            <motion.div
              className="displayTc"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  className="profile-image"
                  src={UserImage}
                  alt="Bibin Maharjan"
                  width={120}
                  height={120}
                  priority
                />
              </motion.div>

              {/* Name */}
              <h1 className="name-text">Bibin Maharjan</h1>

              {/* Animated Roles */}
              <h2 className="role-text">
                <TypeAnimation
                  sequence={[
                    "Frontend Engineer",
                    2000,
                    "React & Next.js Specialist",
                    2000,
                    "Enterprise Banking Systems Developer",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h2>

              {/* Summary */}
              <p>
                Frontend Engineer with <strong>4+ years of experience</strong>{" "}
                building scalable banking platforms, CMS systems, and advanced
                3D web applications using React, Next.js, TypeScript, Redux, and
                React Query.
              </p>

              {/* Social */}
              <div className="social-icons" style={{ marginTop: "20px" }}>
                <Link
                  href="https://www.linkedin.com/in/bbinmaharjan"
                  target="_blank"
                >
                  <BsLinkedin size={22} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
}
