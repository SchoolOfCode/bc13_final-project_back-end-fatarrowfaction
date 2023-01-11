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
      ON users.id = house_members.user_id
      WHERE users.id = $1`,
		[user_id]
	);
	return allUserFood.rows;
}

// whenever a user posts a new item, we need to first send a get request to get the container ID and then a post request to put the new food item in there
export async function getContainerID(user_id) {
	const containerID = await query(
		`SELECT storage_containers.id 
      FROM storage_containers
      INNER JOIN house
      ON house.id = storage_containers.house_id
      INNER JOIN house_members
      ON house_members.house_id = house.id
      INNER JOIN users
      ON users.id = house_members.user_id
      WHERE users.id = $1;`,
		[user_id]
	);
	return containerID.rows;
}
