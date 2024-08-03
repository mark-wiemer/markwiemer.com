import { useHomeStyles } from "./Home.styles";
import { Link, LargeTitle } from "@fluentui/react-components";
import profile2023 from "../../assets/2023-07-20 profile.png";
import wynonnaRaincoat from "../../assets/2024-04-29 Wynonna rain coat outside.jpg";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const styles = useHomeStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <LargeTitle as="h1" style={{ textAlign: "center" }}>
        mark
        <wbr />
        wiemer
        <wbr />
        .com
      </LargeTitle>
      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: "1em",
          rowGap: "1em",
          alignSelf: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <img src={profile2023} className={styles.headerImage} />
        <img src={wynonnaRaincoat} className={styles.headerImage} />
      </div>
      <div className={styles.card}>
        <p>
          {/* Wrap as string to avoid VS Code yelling at raw HTML `)` */}
          {`Hello, world! If you're reading this, it's because you're a cool
          person. There isn't much here yet, just wanted to show you my little
          corner of the internet. I'll let you know when there's more to see :)`}
        </p>
        <p>
          {`(P.S. I'm the human in the above photos. The cute dog is Wynonna, 
          my Australian shepherd 🥰)`}
        </p>
        <p>
          {`"Smiling face with sunglasses" graphic designed by `}
          <Link href="https://openmoji.org" target="_blank" rel="noreferrer">
            OpenMoji
          </Link>{" "}
          – the open-source emoji and icon project.{" "}
          <Link
            href="https://creativecommons.org/licenses/by-sa/4.0"
            target="_blank"
            rel="noreferrer"
          >
            License: CC BY-SA 4.0
          </Link>
        </p>
        <div
          style={{
            flexDirection: "row",
            columnGap: "1em",
            rowGap: "1em",
            alignSelf: "center",
          }}
        >
          <Link
            as="a"
            onClick={() => {
              navigate("/about");
            }}
            style={{ fontSize: "18px" }}
          >
            About me
          </Link>
          |
          <Link
            href="https://github.com/mark-wiemer/mark-wiemer-com"
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center" }}
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
