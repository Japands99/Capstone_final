INSERT INTO rentals (
    id,
    user_id,
    equipment_name,
    location,
    phone_number,
    pick_up_date,
    return_date
  )
VALUES (
    id:integer,
    user_id:integer,
    'equipment_name:character varying',
    'location:character varying',
    'phone_number:character varying',
    'pick_up_date:date',
    'return_date:date'
  );
  INSERT INTO users (
      id,
      firstname,
      lastname,
      email,
      password,
      birthday,
      gender
    )
  VALUES (
      id:integer,
      'firstname:character varying',
      'lastname:character varying',
      'email:character varying',
      'password:character varying',
      'birthday:date',
      'gender:character varying'
    );