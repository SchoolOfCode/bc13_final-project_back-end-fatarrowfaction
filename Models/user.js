import query from "../db/index.js";
import { postNewUser } from "./models.js";

// the following function takes in a user's uid, and then queries the DB to see if
// that user exists. If the user does exist, it returns it. If the user does not
// exist, the function instead calls a post request function, adds it to the db, and then returns that.
export async function getUser(user) {
  try {
    const backendUserReply = await query(
      `SELECT * from users
        WHERE users.uid = $1;`,
      [user]
    );
    if (backendUserReply.rows.length === 0) {
      const newUser = await postNewUser(user);
      return newUser.rows;
    }
    if (backendUserReply.rows.length > 0) {
      return backendUserReply.rows;
    }
  } catch {
    return null;
  }
}
