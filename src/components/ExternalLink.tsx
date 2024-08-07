import { Link } from "@fluentui/react-components";
import { ArrowExitRegular } from "@fluentui/react-icons";

export const ExternalLink = (props: {
  href: string;
  children: JSX.Element[] | JSX.Element | string;
}): JSX.Element => {
  return (
    <Link href={props.href} target="_blank" rel="noreferrer">
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
