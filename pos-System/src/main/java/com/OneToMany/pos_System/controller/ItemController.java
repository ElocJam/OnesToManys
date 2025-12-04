package com.OneToMany.pos_System.controller;

import com.OneToMany.pos_System.model.Item;
import com.OneToMany.pos_System.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Item not found with id: " + id
            )); 
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }
}