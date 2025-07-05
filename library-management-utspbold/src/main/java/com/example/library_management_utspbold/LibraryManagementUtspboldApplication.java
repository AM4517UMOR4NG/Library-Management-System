package com.example.library_management_utspbold;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.example.library_management_utspbold.model.*;
import com.example.library_management_utspbold.service.*;
import java.util.Date;
import java.util.Calendar;

@SpringBootApplication
public class LibraryManagementUtspboldApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementUtspboldApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner demoData(BookService bookService, MemberService memberService, LoanTransactionService loanService, UserService userService) {
        return args -> {
            // Seed default users first
            userService.seedDefaultUsers();
            
            // Add sample books
            Book book1 = new Book("Bersyukur Kepada TUHAN :)", "H. White. M", "978-0732883565", 2024, 5);
            Book book2 = new Book("Footbal Manager", "M.Lion", "978-5654310789", 2023, 3);
            bookService.saveBook(book1);
            bookService.saveBook(book2);
            
            // Add sample members
            Member member1 = new Member("Alogo", "ask@gmail.com", "+1234567890", "123 Main St", new Date());
            Member member2 = new Member("Lionel", "iduB@gmail.com", "+0987654321", "456 Oak Ave", new Date());
            memberService.saveMember(member1);
            memberService.saveMember(member2);
            
            // Add sample loan transactions
            Calendar cal = Calendar.getInstance();
            Date loanDate = cal.getTime();
            
            cal.add(Calendar.DATE, 14); // Due date is 14 days from loan date
            Date dueDate = cal.getTime();
            
            LoanTransaction loan1 = new LoanTransaction(book1, member1, loanDate, dueDate, null);
            LoanTransaction loan2 = new LoanTransaction(book2, member2, loanDate, dueDate, null);
            loanService.saveLoanTransaction(loan1);
            loanService.saveLoanTransaction(loan2);
        };
    }
}