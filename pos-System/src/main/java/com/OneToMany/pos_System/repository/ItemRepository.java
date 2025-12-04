package com.OneToMany.pos_System.repository;

import com.OneToMany.pos_System.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository                                                                 // Tells spring this is a repository (database access layer)
public interface ItemRepository extends JpaRepository<Item, Long> {         // extends JpaRepository to get automatic database methods // <Item, Long> means: work with item entities, and their ID is a long

}