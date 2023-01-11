import query from '../db/index.js';

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
