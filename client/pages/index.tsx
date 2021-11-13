import { Fragment } from "react";
import { GetStaticProps } from "next";

// utils
import { api } from "@modules/common/utils/api";

// types
import { Stats as StatsType } from "@modules/common/utils/types";

// components
import { Header } from "@modules/home/components/Header";
import { Stats } from "@modules/home/components/Stats";
import { Features } from "@modules/home/components/Features";
import { ExampleIcons } from "@modules/home/components/ExampleIcons";
import { SupportedLibraries } from "@modules/home/components/SupportedLibraries";

type Props = StatsType

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data: stats } = await api.getStats();

    return {
      revalidate: false,
      props: { ...stats },
    };
  } catch (err) {
    console.log("Error on Home page | getStaticProps", err);
  }
};

export default function Home({ totalIcons, totalLibraries, totalStyles }: Props) {
  return (
    <Fragment>
      <Header />
      <ExampleIcons />
      <SupportedLibraries />
      <Features />
      <Stats totalIcons={totalIcons} totalLibraries={totalLibraries} totalStyles={totalStyles}/>
    </Fragment>
  );
}
