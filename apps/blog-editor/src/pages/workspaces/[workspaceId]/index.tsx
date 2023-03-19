import { GetServerSideProps } from "next";
import { NextPageWithAuth } from "src/types";

// Todo - Dashboard

const Home: NextPageWithAuth = () => {
  return <></>;
};

export default Home;

Home.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: `/workspaces/${ctx.params?.workspaceId}/posts`,
      permanent: false,
    },
  };
};
