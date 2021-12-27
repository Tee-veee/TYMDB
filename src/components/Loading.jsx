// LIB
import { Puff } from "svg-loaders-react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-screen bg-black min-w-[160px] md:min-w-[300px] md:h-[500px]">
      <Puff width="300px" height="100px" stroke="skyblue" />
    </div>
  );
}

export default Loading;
