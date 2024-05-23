import React from "react";

export default function Loading({ hidden }: { hidden?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        opacity: hidden ? 0 : 100,
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
}
