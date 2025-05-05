import React from "react";

export interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    loading && (
      <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
        <div className="w-12 h-12 absolute border-4 border-indigo-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default Loader;
