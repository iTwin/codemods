import React from "react";

interface NumberedBubbleProps {
  dataTestId?: string;
  displayedText: string;
  color?: string;
  offset: number;
  names?: string;
}

const NumberedBubble: React.SFC<NumberedBubbleProps> = (props) => {
  return (
    <span
      data-testid={props.dataTestId}
      className="bwc-user-icons-medium"
      style={{ left: props.offset }}
      data-for="continueSessionUsersTip"
      data-tip={props.names}
    >
      <span
        data-testid={props.dataTestId + "-content"}
        style={
          props.color
            ? {
                backgroundColor: props.color,
                border: "1.5px solid rgba(0,0,0,0.15)",
              }
            : { border: "1.5px solid rgba(0,0,0,0.15)" }
        }
      >
        {props.displayedText}
      </span>
    </span>
  );
};

export default NumberedBubble;
