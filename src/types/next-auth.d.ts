import "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  interface CustomUser extends User {
    id: string;
  }

  interface Session {
    user: CustomUser;
  }
}
