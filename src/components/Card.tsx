import clsx from "clsx";
import React from "react";

export const CardV2 = React.forwardRef(function CardV2(props: any, ref: any) {
    return (
      <div
        ref={ref}
        className={clsx(
          props.className,
          "flex flex-auto rounded-lg py-2"
        )}
      >
        {props.children}
      </div>
    );
  });
  