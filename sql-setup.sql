CREATE TABLE users
(
  id int PRIMARY KEY,
  username varchar(40) NOT NULL,
  password varchar(120) NOT NULL,
  active boolean
);

CREATE TABLE roles
(
  id int PRIMARY KEY,
  role varchar(20) NOT NULL
);

CREATE TABLE users_roles
(
  id int PRIMARY KEY,
  users_id int NOT NULL,
  roles_id int NOT NULL,
  CONSTRAINT fk_users
      FOREIGN KEY(users_id)
	  REFERENCES users(id)
	  ON DELETE CASCADE,
  CONSTRAINT fk_roles
	  FOREIGN KEY(roles_id)
	  REFERENCES roles(id)
	  ON DELETE CASCADE
);


CREATE TABLE profile
(
  "id" int PRIMARY KEY,
  users_id int NOT NULL,
  firstName varchar(40) NOT NULL,
  lastName varchar(40) NOT NULL,
  birthday timestamp NOT NULL,
  CONSTRAINT fk_users
 	FOREIGN KEY(users_id)
 	REFERENCES users(id)
 	ON DELETE CASCADE
);


CREATE TABLE addresses
(
  "id" int PRIMARY KEY,
  street varchar(150) NOT NULL,
  city varchar(40) NOT NULL,
  "state" varchar(2) NOT NULL,
  zipCode varchar(9) NOT NULL
);

CREATE TABLE profiles_addresses
(
  "id" int PRIMARY KEY,
  profiles_id int NOT NULL,
  addresses_id int NOT NULL,
  type varchar(40),
  CONSTRAINT fk_profiles2
		FOREIGN KEY(profiles_id)
		REFERENCES profile(id)
		ON DELETE CASCADE,
  CONSTRAINT fk_addresses
		FOREIGN KEY(addresses_id)
		REFERENCES addresses(id)
		ON DELETE CASCADE
);

CREATE TABLE contact_details
(
  id int PRIMARY KEY,
  type varchar(25) NOT NULL,
  contact_detail varchar(50) NOT NULL,
  profiles_id int NOT NULL,
  CONSTRAINT fk_profiles
		FOREIGN KEY(profiles_id)
		REFERENCES profile(id)
		ON DELETE CASCADE
);


CREATE TABLE requests
(
  id int PRIMARY KEY,
  type varchar(50),
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  address_id int NOT NULL,
  contact_id int NOT NULL,
  has_key BOOLEAN,
  has_alarm_code BOOLEAN,
  owner_id int NOT NULL,
  CONSTRAINT fk_users
    FOREIGN KEY(owner_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_profiles
    FOREIGN KEY(contact_id)
    REFERENCES profile(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_addresses
    FOREIGN KEY(address_id)
    REFERENCES addresses(id)
    ON DELETE CASCADE
);
