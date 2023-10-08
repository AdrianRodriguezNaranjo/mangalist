package com.adri.manga.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adri.manga.entity.dao.IMangaDaoMangas;
import com.adri.manga.entity.dao.IMangaDaoUsers;
import com.adri.manga.entity.models.Manga;
import com.adri.manga.entity.models.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Service
public class MangaServiceMangasImpl implements IMangaServiceMangas {

	@Autowired
	private IMangaDaoMangas mangasDao;

	@Autowired
	private IMangaDaoUsers userDao;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Manga> getAll() {
		return (List<Manga>) mangasDao.findAll();
	}

	@Override
	public List<Manga> getAllMangasInUser(long id) {
		String jpql = "SELECT DISTINCT m FROM mangas m JOIN m.usersWhereToFindThisManga u WHERE u.id = :userId";
		TypedQuery<Manga> query = entityManager.createQuery(jpql, Manga.class);
		query.setParameter("userId", id);
		return query.getResultList();
	}

	@Override
	public void post(Manga manga, long userId) {
		User user = userDao.findById(userId).orElse(null);
		if (user != null) {
			user.getMangasInUser().add(manga);
			manga.getUsersWhereTofindThisManga().add(user);
			mangasDao.save(manga);
		}
	}

	@Override
	public void put(Manga manga, long userId, long mangaId) {
		User user = userDao.findById(userId).orElse(null);
		if (user != null) {
			Manga existingManga = mangasDao.findById(mangaId).orElse(null);
			if (existingManga != null) {
				if (existingManga.getUsersWhereTofindThisManga().contains(user)) {
					manga.setId(mangaId);
					manga.getUsersWhereTofindThisManga().add(user);
					mangasDao.save(manga);
				}
			}
		}
	}

	@Override
	public void delete(long userId, long mangaId) {
		User user = userDao.findById(userId).orElse(null);
		if (user != null) {
			Manga manga = mangasDao.findById(mangaId).orElse(null);
			if (manga != null) {
				user.getMangasInUser().remove(manga);
				manga.getUsersWhereTofindThisManga().remove(user);
				mangasDao.save(manga);
			}
		}
	}
}
