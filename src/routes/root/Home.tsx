import { useHomeStyles } from "./Home.styles";
import { Link } from "@fluentui/react-components";

const Home = (): JSX.Element => {
  const styles = useHomeStyles();

  return (
    <div className={styles.container}>
      <h1>markwiemer.com</h1>
      <div className={styles.card}>
        <p>
          {/* Wrap as string to avoid VS Code yelling at raw HTML `)` */}
          {`Hello, world! If you're reading this, it's because you're a cool
          person. There isn't much here yet, just wanted to show you my little
          corner of the internet. I'll let you know when there's more to see :)`}
        </p>
        <p>
          <Link href="https://github.com/mark-wiemer/mark-wiemer-com">
            View on GitHub
          </Link>
        </p>
        <p>
          {`"Smiling face with sunglasses" graphic designed by `}
          <Link href="https://openmoji.org">OpenMoji</Link> – the open-source
          emoji and icon project.{" "}
          <Link href="https://creativecommons.org/licenses/by-sa/4.0">
            License: CC BY-SA 4.0
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
