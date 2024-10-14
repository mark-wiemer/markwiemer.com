import {
  Link,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import useAppStyles from "../../App.styles";
import About from "./About.mdx";

const AboutPage = (): JSX.Element => {
  const appStyles = useAppStyles();

  const navigate = useNavigate();
  return (
    <div className={appStyles.article}>
      <Link
        as="a"
        onClick={() => {
          navigate("/");
        }}
        style={{ textAlign: "center", fontSize: "18px" }}
      >
        Home
      </Link>
      <About />
    </div>
  );
};

export default AboutPage;
