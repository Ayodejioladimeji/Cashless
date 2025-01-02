import React from "react";
import { Oval } from "react-loader-spinner";

type LoadingProps = {
  height: string;
  width: string;
  color?: string;
  // secondaryColor: string;
};

const Loading = ({ height, width, color }: LoadingProps) => {
  return (
    <Oval
      height={height}
      width={width}
      color={color || "#fff"}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={color || "#fff"}
      strokeWidth={5}
      strokeWidthSecondary={5}
    />
  );
};

export default Loading;
