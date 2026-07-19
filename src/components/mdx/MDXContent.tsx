"use client";

import * as runtime from "react/jsx-runtime";
import Callout from "./Callout";
import MetricCard from "./MetricCard";

const sharedComponents = {
  Callout,
  MetricCard,
};

export default function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}) {
  const fn = new Function(code);
  const Module = fn({ ...runtime });
  const Component = Module.default;
  return <Component components={{ ...sharedComponents, ...components }} />;
}
