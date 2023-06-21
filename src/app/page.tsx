import Image from "next/image";
import styles from "./page.module.css";
import UserImage from "../../public/images/user.gif";

export default function Home() {
  return (
    <div className={styles.mainWrapper} data-stellar-background-ratio="0.5">
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.displayT}>
          <div className={styles.displayTc} data-animate-effect="fadeIn">
            <Image
              className={styles.profileThumb}
              src={UserImage}
              alt={"user-image"}
              width={100}
              height={100}
              priority
            ></Image>
            <div className={styles.text}>
              <span>- Bibin Maharjan -</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
