import { AccountPage } from "@/components/pages/Account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha conta",
};

const Account = () => <AccountPage />;

export default Account;
