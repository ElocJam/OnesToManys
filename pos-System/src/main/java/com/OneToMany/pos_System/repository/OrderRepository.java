package com.OneToMany.pos_System.repository;

import com.OneToMany.pos_System.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository                                                                  // Tells spring this is a repository (database access layer)
public interface OrderRepository extends JpaRepository<Order, Long> {
    
}