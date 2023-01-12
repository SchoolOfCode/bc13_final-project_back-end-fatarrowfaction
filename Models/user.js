import query from "../db/index.js";

export async function getUser(user) {
  try {
    const backendUserReply = await query(
      `SELECT * from users
        WHERE users.uid = $1;`,
      [user.uid]
    );
    if (backendUserReply.rows === 0) {
      //console.log this, does it return null?
      return "error";
    }
  } catch {
    //post a thing and return it;
  } finally {
    return backendUserReply ? backendUserReply : "error";
  }
}
