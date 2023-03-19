import { GetServerSideProps } from "next";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: `/workspaces/${ctx.params?.workspaceId}/posts`,
      permanent: false,
    },
  };
};
