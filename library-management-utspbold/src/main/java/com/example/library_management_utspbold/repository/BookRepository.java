package com.example.library_management_utspbold.repository;

import com.example.library_management_utspbold.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
