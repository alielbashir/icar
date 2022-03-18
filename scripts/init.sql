CREATE DATABASE icar;
\c icar;


create table users
(
    id       integer generated always as identity
        primary key,
    username varchar not null,
    password varchar not null
);

alter table users
    owner to postgres;

create table cars
(
    user_id integer
        constraint cars_users_id_fk
            references users,
    car_id  integer
);

alter table cars
    owner to postgres;

create table dates
(
    user_id   integer
        constraint dates_users_id_fk
            references users,
    timestamp timestamp with time zone not null
);

alter table dates
    owner to postgres;

