import { Fragment } from "react";

// components
import { Header } from "@modules/home/components/Header";
import { Features } from "@modules/home/components/Features";
import { ExampleIcons } from "@modules/home/components/ExampleIcons";
import { SupportedLibraries } from "@modules/home/components/SupportedLibraries";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <ExampleIcons />
      <SupportedLibraries />
      <Features />
    </Fragment>
  );
}
