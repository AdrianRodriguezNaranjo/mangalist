drop table users;
create table users(
	id int not null auto_increment,
    name varchar(20) not null,
    password varchar(20) not null,
    email varchar(20) not null,
    CONSTRAINT users_pk PRIMARY KEY(id_user),
    CONSTRAINT users_uk unique KEY(name)
);
drop table mangas;
create table mangas(
	id int not null auto_increment,
    name varchar(20) not null,
    synopsis varchar(50),   
    chapter int,
    CONSTRAINT mangas_pk PRIMARY KEY(id_manga)
);
drop table my_mangas;
create table my_mangas(
	id_user int not null,
    id_manga int not null,
    CONSTRAINT my_mangas_pk PRIMARY KEY(id_user,id_manga),
    CONSTRAINT my_manga_fk1 FOREIGN KEY(id_user)
    REFERENCES users(id) ON DELETE CASCADE ON update CASCADE,
    CONSTRAINT my_manga_fk2 FOREIGN KEY(id_manga)
    REFERENCES mangas(id) ON DELETE CASCADE ON update CASCADE
);
