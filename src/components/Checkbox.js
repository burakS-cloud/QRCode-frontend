import React from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  // console.log("ref:", ref);
  // console.log("resolvedRef:", resolvedRef);
  // console.log("indeterminate", indeterminate);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <span>Select to print</span>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    </>
  );
});
