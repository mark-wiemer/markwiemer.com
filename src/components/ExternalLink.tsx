import { Link, makeStyles } from "@fluentui/react-components";
import { ArrowExitRegular } from "@fluentui/react-icons";

const useExternalLinkStyles = makeStyles({
  link: {
    ":hover": {
      outline: "2px solid #fff",
    },
  },
});

export const ExternalLink = (props: {
  href: string;
  children: JSX.Element[] | JSX.Element | string;
}): JSX.Element => {
  const styles = useExternalLinkStyles();
  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={styles.link}
    >
      {props.children}
      <span
        style={{
          display: "inline-block",
          textDecoration: "none",
          lineHeight: "normal",
        }}
      >
        &nbsp;
      </span>
      <ArrowExitRegular style={{ verticalAlign: "-3px" }} />
    </Link>
  );
};
