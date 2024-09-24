import appleJar from '../assets/apple_jar.png';

/** Render a single emoji in a consistent font on any device */
export const Emoji = (props: { emoji: string }): JSX.Element => {
  if (props.emoji === '🫙') {
    return <img src={appleJar} width={'24px'} height={'24px'}/>;
  }
  return (
    <span
      style={{
        fontFamily: "Noto Color Emoji, sans-serif",
        fontWeight: 400,
        fontStyle: "normal",
      }}
    >
      {props.emoji}
    </span>
  );
};
