# Hotel Booking App Backend url

## USER's

> all user routes. baseurl `{{Backend_url}}/api/v1/users`

| Method | URL                              | Description                                                                                                     |
| ------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/`                              | get all users                                                                                                   |
| POST   | `/`                              | Create a new user                                                                                               |
| GET    | `/{id}`                          | get user by id                                                                                                  |
| PATCH  | `/{id}`                          | Update a user by id                                                                                             |
| DELETE | `/{id}`                          | Delete a user by id                                                                                             |
| PATCH  | `/verify-user-account/{id}`      | verify user account                                                                                             |
| GET    | `/manager-with-detail`           | get manager and cashier with hotel with detail                                                                  |
| POST   | `/complete-onboarding`           | to complete the onboarding process and to verify your account                                                   |
| GET    | `/user-with-bookings?id=some_id` | get user with booking detail, the query id is not required admins use it to get the booking details of the user |
| GET    | `/current-user`                  | get the currently logged in user                                                                                |
| GET    | `/onboarding-users`              | get all onboarding users                                                                                        |

| GET | `/verification-requests` | get all users that sent a identity verification request |
| PATCH | `/request-identity-verification` | request identity verification |
| PATCH | `/decline-verification-request/{id}` | decline identity verification |

## HOTEL's

> all hotel routes. baseurl `{{Backend_url}}/api/v1/hotels`

| Method | URL                | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/`                | get all hotels                       |
| POST   | `/`                | Create a new hotel                   |
| GET    | `/{id}`            | get hotel by id                      |
| PATCH  | `/{id}`            | Update a hotel by id                 |
| DELETE | `/{id}`            | Delete a hotel by id                 |
| GET    | `/with-rooms/{id}` | get hotel with all rooms by hotel id |

## ROOM's

> all room routes. baseurl `{{Backend_url}}/api/v1/rooms`

| Method | URL     | Description         |
| ------ | ------- | ------------------- |
| GET    | `/`     | get all rooms       |
| GET    | `/{id}` | get room by id      |
| POST   | `/`     | Create a new room   |
| PATCH  | `/{id}` | Update a room by id |
| DELETE | `/{id}` | Delete a room by id |

## BOOKING's

> all booking routes. baseurl `{{Backend_url}}/api/v1/bookings`

| Method | URL                                          | Description                                        |
| ------ | -------------------------------------------- | -------------------------------------------------- |
| GET    | `/`                                          | get all bookings                                   |
| POST   | `/`                                          | Create a new booking                               |
| GET    | `/{id}`                                      | get booking by id                                  |
| PATCH  | `/{id}`                                      | Update a booking by id                             |
| DELETE | `/{id}`                                      | Delete a booking by id                             |
| GET    | `/booking-with-room-user-hotel-detail/{id}`  | get booking with detail by id                      |
| GET    | `/all-bookings-with-room-user-hotel-detail`  | get all bookings with user, role, and hotel detail |
| GET    | `/all-bookings-of-a-hotel/{hotelId}`         | get all bookings of a hotel                        |
| GET    | `/all-bookings-of-a-room/{roomId}`           | get all bookings of a room                         |
| GET    | `/all-bookings-of-a-user/{userId}`           | get all bookings of a user                         |
| PATCH  | `/{bookingId}/reject-user-booking/{userId}`  | reject user booking                                |
| PATCH  | `/cancel-my-booking`                         | cancel your own booking                            |
| PATCH  | `/{bookingId}/confirm-user-booking/{userId}` | confirm user booking                               |

## REVIEWS

> all review routes. baseurl `{{Backend_url}}/api/v1/reviews`

| Method | URL                | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/`                | get all reviews            |
| POST   | `/`                | Create a new review        |
| GET    | `/{id}`            | get review by id           |
| PATCH  | `/{id}`            | Update a review by id      |
| DELETE | `/{id}`            | Delete a review by id      |
| GET    | `/hotel/{hotelId}` | get all reviews of a hotel |

## FAVORITE's

> all favorite routes. baseurl `{{Backend_url}}/api/v1/favorites`

| Method | URL     | Description                         |
| ------ | ------- | ----------------------------------- |
| GET    | `/`     | get all favorites                   |
| POST   | `/`     | Create a new favorite               |
| GET    | `/{id}` | get favorite by id                  |
| PATCH  | `/{id}` | Update a favorite by id             |
| DELETE | `/{id}` | Delete a favorite by id             |
| GET    | `/user` | get favorites of the logged in user |

## PAYMENT's

> all payment routes. baseurl `{{Backend_url}}/api/v1/payments`

| Method | URL                                         | Description                                     |
| ------ | ------------------------------------------- | ----------------------------------------------- |
| GET    | `/chapa/accept-booking-payment/{bookingId}` | initiate payment with chapa payment integration |
| GET    | `/chapa/verify-booking-payment/{trx_ref}`   | verify payment                                  |
| GET    | `/`                                         | get all payments                                |
| POST   | `/`                                         | create payment                                  |
| GET    | `/{id}`                                     | get payment by id                               |
| PATCH  | `/{id}`                                     | update payment                                  |
| DELETE | `/{id}`                                     | delete payment                                  |

## NOTIFICATION's

> all notification routes. baseurl `{{Backend_url}}/api/v1/notifications`

| Method | URL | Description |
| ------ | --- | ----------- |
