import React from "react";

export const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} className={`${props.className} p-2 border rounded`} />
));
