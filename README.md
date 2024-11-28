# User Management System

## Frontend not finished yet

only can login

1. Run backend. Refer to [Prerequisite](##backend-prerequisite)

```
cd backend
npm run
```

2. Run frontend

```
cd frontend
npm run
```

## Backend Prerequisite

1. create `.env` files at `/backend`. I use Postgre 16.

```
DB_USER=""
DB_PASS=""
DB_HOST=""
DB_PORT=5432
PORT=3000
DB_NAME=""
JWT_SECRET=
```

2. Install dependencies

```
npm install express sequelize pg pg-hstore dotenv pdfkit cors
npm install --save-dev nodemon
```

3. (Optional) for running Seeder

```
npm install --save-dev sequelize-cli
```

## API Endpoints

#### User Endpoints

- Register:

  - URL: `/api/auth/register`
  - Method: `POST`
  - Body:

  ```json
  {
    "nip": "IT-32435",
    "name": "James IT",
    "email": "james@example.com",
    "password": "securepassword",
    "profile_pic": "https://www.example.com/image.jpg",
    "isAdmin": false
  }
  ```

  - **Expected output**:

  ```json
  {
    "message": "Registration successful",
    "user": {
      "id": 6,
      "employee_id": 8,
      "email": "james@example.com",
      "password": <PASSWORD>,
      "profile_pic": "https://www.example.com/image.jpg",
      "isAdmin": false,
      "updatedAt": "2024-11-28T13:49:56.167Z",
      "createdAt": "2024-11-28T13:49:56.167Z"
    }
  }
  ```

- Login:

  - URL: `/api/auth/login`
  - Method: `POST`
  - Body:

  ```json
  {
    "email": "robertadmin@example.com",
    "password": "securepassword"
  }
  ```

  - **Expected output**:

  ```json
  {
    "message": "Login successful",
    "token": <TOKEN>
  }
  ```

---

#### Admin Endpoints

- Get all users:

  - URL: `/api/admin/employees`
  - Method: `GET`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  -
  ```

  - **Expected output**:

  ```json
  [
    {
      "id": 7,
      "nip": "123456",
      "name": "richardtesting",
      "birth_place": "Bandung",
      "address": "Jl. Example",
      "birth_date": "1990-01-01T00:00:00.000Z",
      "gender_id": 1,
      "grade_id": 1,
      "echelon_id": 1,
      "position_id": 1,
      "job_placement_id": 1,
      "religion_id": 1,
      "unit_id": 1,
      "phone": "081234567890",
      "npwp": "1234567890",
      "createdAt": "2024-11-28T07:40:15.541Z",
      "updatedAt": "2024-11-28T07:40:15.541Z"
    },
    {
      "id": 8,
      "nip": "IT-32435",
      "name": "James IT",
      "birth_place": null,
      "address": null,
      "birth_date": null,
      "gender_id": null,
      "grade_id": null,
      "echelon_id": null,
      "position_id": null,
      "job_placement_id": null,
      "religion_id": null,
      "unit_id": null,
      "phone": null,
      "npwp": null,
      "createdAt": "2024-11-28T13:49:56.086Z",
      "updatedAt": "2024-11-28T13:49:56.086Z"
    }
  ]
  ```

- Find user:

  - URL: `/api/admin/employees/search?query=Jessica Marketing`
  - Method: `GET`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  -
  ```

  - **Expected output**:

  ```json
  [
    {
      "id": 3,
      "nip": "MKRT-294475",
      "name": "Jessica Marketing",
      "birth_place": null,
      "address": null,
      "birth_date": null,
      "gender_id": null,
      "grade_id": null,
      "echelon_id": null,
      "position_id": null,
      "job_placement_id": null,
      "religion_id": null,
      "unit_id": null,
      "phone": null,
      "npwp": null,
      "createdAt": "2024-11-28T07:05:18.469Z",
      "updatedAt": "2024-11-28T07:05:18.469Z"
    }
  ]
  ```

- Add user:

  - URL: `/api/admin/employees`
  - Method: `POST`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  {
    "nip": "5469985",
    "name": "carlostesting",
    "birth_place": "Bandung",
    "address": "Jl. Example",
    "birth_date": "2000-11-23",
    "gender_id": 1,
    "grade_id": 1,
    "echelon_id": 1,
    "position_id": 1,
    "job_placement_id": 1,
    "religion_id": 1,
    "unit_id": 1,
    "phone": "0812345267890",
    "npwp": "12345367890"
  }
  ```

  - **Expected output**:

  ```json
  {
    "message": "Employee added successfully",
    "newEmployee": {
      "id": 9,
      "nip": "5469985",
      "name": "carlostesting",
      "birth_place": "Bandung",
      "address": "Jl. Example",
      "birth_date": "2000-11-23T00:00:00.000Z",
      "gender_id": 1,
      "grade_id": 1,
      "echelon_id": 1,
      "position_id": 1,
      "job_placement_id": 1,
      "religion_id": 1,
      "unit_id": 1,
      "phone": "0812345267890",
      "npwp": "12345367890",
      "updatedAt": "2024-11-28T13:54:12.140Z",
      "createdAt": "2024-11-28T13:54:12.140Z"
    }
  }
  ```

- Put user:

  - URL: `/api/admin/employees/<id>`
  - Method: `PUT`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  {
    "nip": "EDIT-5469985",
    "name": "carlostesting_edited",
    "birth_place": "Bandung",
    "address": "Jl. Example No. 12312312",
    "birth_date": "1998-12-30",
    "gender_id": 1,
    "grade_id": 1,
    "echelon_id": 1,
    "position_id": 1,
    "job_placement_id": 1,
    "religion_id": 1,
    "unit_id": 1,
    "phone": "83837474",
    "npwp": "453243242"
  }
  ```

  - **Expected output**:

  ```json
  {
    "message": "Employee updated successfully",
    "employee": {
      "id": 9,
      "nip": "EDIT-5469985",
      "name": "carlostesting_edited",
      "birth_place": "Bandung",
      "address": "Jl. Example No. 12312312",
      "birth_date": "1998-12-30T00:00:00.000Z",
      "gender_id": 1,
      "grade_id": 1,
      "echelon_id": 1,
      "position_id": 1,
      "job_placement_id": 1,
      "religion_id": 1,
      "unit_id": 1,
      "phone": "83837474",
      "npwp": "453243242",
      "createdAt": "2024-11-28T13:54:12.140Z",
      "updatedAt": "2024-11-28T13:56:11.047Z"
    }
  }
  ```

- Delete user:

  - URL: `/api/admin/employees/<id>`
  - Method: `DELETE`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  -
  ```

  - **Expected output**:

  ```json
  {
    "message": "Employee deleted successfully"
  }
  ```

- Print to PDF:

  - URL: `/api/admin/employees/print`
  - Method: `GET`
  - **Headers**: Authorization: Bearer <token>
  - Body:

  ```json
  -
  ```

  - **Expected output**:

  ```json
    PDF FILE
  ```
