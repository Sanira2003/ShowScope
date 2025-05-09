import React from "react";
import { Loader } from "lucide-react";
import "../css/Loading.css";

const Loading = () => {
  return (
    <div className="loader-body">
      <Loader className="loader" />
    </div>
  );
};

export default Loading;
