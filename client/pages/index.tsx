import { Fragment } from "react";

// components
import { Header } from "@modules/home/components/Header";
import { ExampleIcons } from "@modules/home/components/ExampleIcons";
import { SupportedLibraries } from "@modules/home/components/SupportedLibraries";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <ExampleIcons />
      <SupportedLibraries />
    </Fragment>
  );
}
