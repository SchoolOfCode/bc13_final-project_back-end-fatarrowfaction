import query from "../db/index.js";
import { postUsersID } from "./models.js";

export async function getUser(user) {
  console.log("what is the uid in the getUser function?", user);
  console.log("get user function fired");
  try {
    const backendUserReply = await query(
      `SELECT * from users
        WHERE users.uid = $1;`,
      [user]
    );
    console.log("backenduserreply after query", backendUserReply);
    if (backendUserReply.rows.length === 0) {
      console.log("zero length doesn't exist fired");
      const newUser = await postUsersID(user);
      return newUser.rows;
    }
    if (backendUserReply.rows.length > 0) {
      console.log("existed row fired");
      return backendUserReply.rows;
    }
  } catch {
    console.log("catch fired");
    return null;
  }
}
