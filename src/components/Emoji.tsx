/** Render a single emoji in a consistent font on any device */
export const Emoji = (props: { emoji: string }): JSX.Element => {
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
