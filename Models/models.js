import query from "../db/index.js";

export async function getUserFood(user_id) {
	const allUserFood = await query(
		`SELECT food.name from food
      INNER JOIN storage_containers
      ON storage_containers.id = food.storage_id
      INNER JOIN house
      ON house.id = storage_containers.house_id
      INNER JOIN house_members
      ON house_members.house_id = house.id
      INNER JOIN users
      ON users.uid = house_members.user_id
      WHERE users.uid = $1`,
		[user_id]
	);
	return allUserFood.rows;
}

// whenever a user posts a new item, we need to first send a get request to get the container ID and then a post request to put the new food item in there
export async function getStorageID(user_id) {
	const storageID = await query(
		`SELECT storage_containers.id 
      FROM storage_containers
      INNER JOIN house
      ON house.id = storage_containers.house_id
      INNER JOIN house_members
      ON house_members.house_id = house.id
      INNER JOIN users
      ON users.uid = house_members.user_id
      WHERE users.uid = $1;`,
		[user_id]
	);
	return storageID.rows;
}

export async function postFood(user_id, food) {
	const storageID = await getStorageID(user_id);
	const foodItem = await query(
		`INSERT INTO food (
   	name,
   	price,
   	storage_id,
   	expires_on,
   	eaten_on,
   	binned_on,
   	donated_on
      )
      VALUES ($1, $2, $3, $4, NULL, NULL, NULL);`,
		[food.name, food.price, storageID[0].id, food.expires_on]
	);
	return foodItem.rows;
}

// gets the user's profile information
export async function getUserProfile(user_id) {
	const userInfo = await query(`SELECT * FROM users WHERE users.uid = $1`, [
		user_id,
	]);
	return userInfo.rows;
}

// make a post with the user's ID from auth and post it into our database
export async function postUsersID(user_id) {
	const userID = await query(
		`INSERT INTO users(uid) VALUES($1) RETURNING * ;`,
		[user_id]
	);
	return userID.rows;
}
