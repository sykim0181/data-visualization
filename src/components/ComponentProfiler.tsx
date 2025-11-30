"use client";

import { Profiler, ReactNode } from "react";

interface Prop {
  id: string;
  children: ReactNode;
}

const ComponentProfiler = ({ id, children }: Prop) => {
  return (
    <Profiler
      id={id}
      onRender={(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
      ) => {
        console.log(`${id} took ${actualDuration}ms to render`);
      }}
    >
      {children}
    </Profiler>
  );
};

export default ComponentProfiler;
