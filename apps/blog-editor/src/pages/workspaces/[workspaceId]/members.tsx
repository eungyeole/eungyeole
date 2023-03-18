import Members from "src/components/worksapce/members";
import { NextPageWithAuth } from "src/types";

const MembersPage: NextPageWithAuth = () => {
  return <Members />;
};

MembersPage.requireAuth = true;

export default MembersPage;
