create table vikendica(
	imevikendice varchar(50) not null,
	mesto varchar(50) not null,
    cena int not null, 
    telefon varchar(50) not null, 
    usluge varchar(1000) not null, 
    linkdomape varchar(1000) not null, 
    imevlasnika varchar(50) not null,
    FOREIGN KEY fk_vlasnik (imevlasnika) REFERENCES korisnici(kor_ime),
    primary key (imevikendice)
);
drop table vikendica, galerija_slika;
create table galerija_slika(
	slikavikendice varchar(500) not null primary key,
    imevik varchar(50) not null,
    foreign key fk_vikendica (imevik) references vikendica(imevikendice)
);

create table recenzije (
	imevikendice varchar(50) not null, 
    vlasnik varchar(50) not null,
    komentar varchar(1000), 
    ocena int,
    foreign key fk_vlasnik (vlasnik) references korisnici(kor_ime),
    foreign key fk_vikendica (imevikendice) references vikendica(imevikendice)
);

select * from korisnici;
delete from korisnici where kor_ime='default_korisnik'; 
update korisnici set odobren=1 where kor_ime='default_korisnik';
update korisnici
set profilna_slika='default_profile_picture.png'
where kor_ime='pera_turista';
update vikendica set linkdomape='!1m14!1m8!1m3!1d159385.11006187802!2d19.6007789!3d43.693955!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47582f212e7b3d17%3A0x6849d7f99f042bd8!2sFamily%20House%20Zlatibor!5e1!3m2!1ssr!2srs!4v1760908322989!5m2!1ssr!2srs' where imevikendice='Moja vikendica 1';
insert into vikendica values (
'Moja vikendica 1', 'Zlatibor', 9000, '011 5265 323', 'kod nas mozete jesti i spavati i skijati se za male pare', 'https://maps.app.goo.gl/4jj8RiHxvpc4VdA4A', 'ana_vlasnik'
);
insert into vikendica values (
'Moja vikendica 2', 'Kopaonik', 123400, '011 1111 323', 'kod nas mozete jesti i spavati i skijati se za prevelike pare', 'https://maps.app.goo.gl/ve6LqaXrdAxbMcZ59', 'ana_vlasnik'
);

insert into galerija_slika values 
( 'mv2-1.png', 'Moja vikendica 2'),
('mv2-2.png', 'Moja vikendica 2'),
('mv2-3.png', 'Moja vikendica 2');

select * from galerija_slika where imevik='Moja vikendica 2';
select * from rezervacije where korisnik='pera_turista';
delete from rezervacije where idP is null;
delete from rezervacije;
-- vlasnik u recenzijama je "vlasnik" komentara odnosno osoba koja ostavlja komentar

insert into recenzije (imevikendice, vlasnik, komentar, ocena) values (
'Moja vikendica 1', 'pera_turista', 'ufff bas je lepo iskr', 4
), 
(
'Moja vikendica 2', 'pera_turista', 'preskupo', 2
), 
(
'Moja vikendica 1', 'milica_tur', 'nije nesto', 3
), (
'Moja vikendica 1', 'default_korisnik', 'ja sam default komentar', 5
);

select * from recenzije;