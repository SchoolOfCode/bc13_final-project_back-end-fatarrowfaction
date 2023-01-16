import query from '../db/index.js';
//gets food that hasnt been eaten/donated/binned
export async function getUserFood(user_id) {
  const allUserFood = await query(
    `SELECT * from food
      INNER JOIN storage_containers
      ON storage_containers.id = food.storage_id
      INNER JOIN house
      ON house.id = storage_containers.house_id
      INNER JOIN house_owners
      ON house_owners.house_id = house.id
      INNER JOIN users
      ON users.uid = house_owners.user_id
      WHERE users.uid = $1
	  AND food.eaten_on IS NULL
      AND food.binned_on IS NULL
      AND food.donated_on IS NULL`,
    [user_id]
  );
  return allUserFood.rows;
}

//gets all food for one user...
export async function getAllUserFood(user_id) {
  const allUserFood = await query(
    `SELECT * from food
		INNER JOIN storage_containers
		ON storage_containers.id = food.storage_id
		INNER JOIN house
		ON house.id = storage_containers.house_id
		INNER JOIN house_owners
		ON house_owners.house_id = house.id
		INNER JOIN users
		ON users.uid = house_owners.user_id
		WHERE users.uid = $1`,
    [user_id]
  );
  return allUserFood.rows;
}

//gets wasted food for last week for a user
export async function getLastWeeksWastedFood(user_id) {
  const weekFood = await query(
    `SELECT * from food
	INNER JOIN storage_containers
	ON storage_containers.id = food.storage_id
	INNER JOIN house
	ON house.id = storage_containers.house_id
	INNER JOIN house_owners
	ON house_owners.house_id = house.id
	INNER JOIN users
	ON users.uid = house_owners.user_id
	WHERE users.uid = $1
	AND food.binned_on >= current_date - interval '1 week'
	AND food.binned_on <= current_date
;`,
    [user_id]
  );
  return weekFood.rows;
}

//gets eaten food for last week for a user
export async function getLastWeeksEatenFood(user_id) {
  const weekFood = await query(
    `SELECT * from food
	INNER JOIN storage_containers
	ON storage_containers.id = food.storage_id
	INNER JOIN house
	ON house.id = storage_containers.house_id
	INNER JOIN house_owners
	ON house_owners.house_id = house.id
	INNER JOIN users
	ON users.uid = house_owners.user_id
	WHERE users.uid = $1
	AND food.eaten_on >= current_date - interval '1 week'
	AND food.eaten_on <= current_date
;`,
    [user_id]
  );
  return weekFood.rows;
}

//gets all of a users wasted food
export async function getAllUserWastedFood(user_id) {
  const wastedFood = await query(
    `SELECT * from food
	INNER JOIN storage_containers
	ON storage_containers.id = food.storage_id
	INNER JOIN house
	ON house.id = storage_containers.house_id
	INNER JOIN house_owners
	ON house_owners.house_id = house.id
	INNER JOIN users
	ON users.uid = house_owners.user_id
	WHERE users.uid = $1
	AND food.binned_on <= current_date
;`,
    [user_id]
  );
  return wastedFood.rows;
}

//gets all of a users eaten food
export async function getAllUserEatenFood(user_id) {
  const eatenFood = await query(
    `SELECT * from food
	INNER JOIN storage_containers
	ON storage_containers.id = food.storage_id
	INNER JOIN house
	ON house.id = storage_containers.house_id
	INNER JOIN house_owners
	ON house_owners.house_id = house.id
	INNER JOIN users
	ON users.uid = house_owners.user_id
	WHERE users.uid = $1
	AND food.eaten_on <= current_date
;`,
    [user_id]
  );
  return eatenFood.rows;
}

// whenever a user posts a new item, we need to first send a get request to get the container ID and then a post request to put the new food item in there
export async function getStorageID(user_id) {
  const storageID = await query(
    `SELECT storage_containers.id 
      FROM storage_containers
      INNER JOIN house
      ON house.id = storage_containers.house_id
      INNER JOIN house_owners
      ON house_owners.house_id = house.id
      INNER JOIN users
      ON users.id = house_owners.user_id
      WHERE users.id = $1;`,
    [user_id]
  );
  return storageID.rows;
}
//calls above function first to get correct container, then posts food item in it. this is currently only set up for users with only 1 container 
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
  const userInfo = await query(`SELECT * FROM users WHERE users.id = $1`, [
    user_id,
  ]);
  return userInfo.rows;
}

//updates date eaten/binned/donated
export async function patchEatenDate(id) {
  const date_eaten = await query(
    `UPDATE food SET eaten_on = current_timestamp WHERE id = $1 RETURNING *`,
    [id]
  );
  return date_eaten.rows;
}
// updates date thrown away
export async function patchBinnedDate(id) {
  const date_binned = await query(
    `UPDATE food SET binned_on = current_timestamp WHERE id = $1 RETURNING *`,
    [id]
  );
  return date_binned.rows;
}
//updates date donated
export async function patchFoodDonatedDate(id) {
  const date_donated = await query(
    `UPDATE food SET donated_on = current_timestamp WHERE id = $1 RETURNING *`,
    [id]
  );
  return date_donated.rows;
}

// posts a new user and along with it opens a house_owner, house and storage_container for that user
//this the returning value of each tier must be checked to see if the correct information is being inserted in the next tier
export async function postNewUser(id) {
  const newUser = await query(
    `INSERT INTO users (
      uid
      )
      VALUES (
        $1
        )
        RETURNING users.uid;`,
        [id]
        );
  const newHouse = await query(
    `INSERT INTO house (name)
    VALUES ('My house')
    RETURNING house.id`
  );

  const newHouseOwner = await query(
    `INSERT INTO house_owners
    (user_id, house_id)
    VALUES ($1, $2)`,
    [id, newHouse.rows[0].id]
  );

  const newStorageContainer = await query(
    `INSERT INTO storage_containers
    (house_id, name)
    VALUES ($1, 'Fridge')`, [newHouse.rows[0].id]
  );
  return [
    newUser.rows,
    newHouse.rows,
    newHouseOwner.rows,
    newStorageContainer.rows,
  ];

}

