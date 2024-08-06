import { Openmoji } from "@svgmoji/openmoji";
import data from "svgmoji/emoji.json";

// todo move openmoji object to some global state
// keeping singleton here to de-dupe for now
// #premature-optimization
const openmoji = new Openmoji({ data: data as Openmoji["data"], type: "all" });

export const Emoji = (props: { emoji: string }): JSX.Element => {
  return (
    <span>
      <img
        width="27px" // text line height
        src={openmoji.url(props.emoji)}
        style={{ verticalAlign: "text-bottom" }}
      />
    </span>
  );
};
