package com.OneToMany.pos_System.repository;

import com.OneToMany.pos_System.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository                                                                  // Tells spring this is a repository (database access layer)
public interface OrderRepository extends JpaRepository<Order, Long> {
    
}


/*

## **How They Work Together**

Here's the full flow when someone makes a request:
```
1. CLIENT makes request
   ↓
   curl http://localhost:8080/api/orders

2. SPRING BOOT receives request
   ↓
   "Someone wants GET /api/orders"

3. CONTROLLER handles it
   ↓
   OrderController.getAllOrders() is called

4. CONTROLLER asks REPOSITORY
   ↓
   orderRepository.findAll()

5. REPOSITORY asks DATABASE
   ↓
   SELECT * FROM orders

6. DATABASE returns rows
   ↓
   [Row 1: id=1, table=F7, ...]

7. REPOSITORY converts to Java objects
   ↓
   List<Order> with Order objects

8. CONTROLLER returns to SPRING
   ↓
   Returns List<Order>

9. SPRING converts to JSON
   ↓
   [{"orderId": 1, "tableNumber": "F7", ...}]

10. CLIENT receives JSON response

*/