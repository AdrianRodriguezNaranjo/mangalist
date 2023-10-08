package com.adri.manga.entity.dao;

import org.springframework.data.repository.CrudRepository;

import com.adri.manga.entity.models.Manga;

public interface IMangaDaoMangas extends CrudRepository<Manga, Long>  {

}
