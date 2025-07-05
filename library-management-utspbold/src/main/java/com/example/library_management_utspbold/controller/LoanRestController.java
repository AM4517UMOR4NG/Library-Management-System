package com.example.library_management_utspbold.controller;

import com.example.library_management_utspbold.model.LoanTransaction;
import com.example.library_management_utspbold.model.Book;
import com.example.library_management_utspbold.model.Member;
import com.example.library_management_utspbold.service.LoanTransactionService;
import com.example.library_management_utspbold.service.BookService;
import com.example.library_management_utspbold.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/loans")
public class LoanRestController {
    
    @Autowired
    private LoanTransactionService loanTransactionService;
    
    @Autowired
    private BookService bookService;
    
    @Autowired
    private MemberService memberService;
    
    // DTO for frontend compatibility
    public static class LoanDTO {
        private Long id;
        private Long bookId;
        private Long memberId;
        private String loanDate;
        private String dueDate;
        private String returnDate;
        private Book book;
        private Member member;
        
        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getBookId() { return bookId; }
        public void setBookId(Long bookId) { this.bookId = bookId; }
        public Long getMemberId() { return memberId; }
        public void setMemberId(Long memberId) { this.memberId = memberId; }
        public String getLoanDate() { return loanDate; }
        public void setLoanDate(String loanDate) { this.loanDate = loanDate; }
        public String getDueDate() { return dueDate; }
        public void setDueDate(String dueDate) { this.dueDate = dueDate; }
        public String getReturnDate() { return returnDate; }
        public void setReturnDate(String returnDate) { this.returnDate = returnDate; }
        public Book getBook() { return book; }
        public void setBook(Book book) { this.book = book; }
        public Member getMember() { return member; }
        public void setMember(Member member) { this.member = member; }
    }
    
    @GetMapping
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
        List<LoanTransaction> loans = loanTransactionService.getAllLoanTransactions();
        List<LoanDTO> loanDTOs = loans.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(loanDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoanById(@PathVariable Long id) {
        LoanTransaction loan = loanTransactionService.getLoanTransactionById(id);
        if (loan != null) {
            return ResponseEntity.ok(convertToDTO(loan));
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<LoanDTO> createLoan(@RequestBody LoanDTO loanDTO) {
        try {
            Book book = bookService.getBookById(loanDTO.getBookId());
            Member member = memberService.getMemberById(loanDTO.getMemberId());
            
            if (book == null || member == null) {
                return ResponseEntity.badRequest().build();
            }
            
            LoanTransaction loan = new LoanTransaction();
            loan.setBook(book);
            loan.setMember(member);
            loan.setLoanDate(new Date()); // Set current date as loan date
            loan.setDueDate(new Date()); // You might want to calculate this based on loanDTO.getDueDate()
            loan.setReturnDate(null);
            loan.setReturned(false);
            
            LoanTransaction savedLoan = loanTransactionService.saveLoanTransaction(loan);
            return ResponseEntity.ok(convertToDTO(savedLoan));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LoanDTO> updateLoan(@PathVariable Long id, @RequestBody LoanDTO loanDTO) {
        LoanTransaction existingLoan = loanTransactionService.getLoanTransactionById(id);
        if (existingLoan != null) {
            try {
                // Update fields as needed
                if (loanDTO.getReturnDate() != null) {
                    existingLoan.setReturnDate(new Date()); // You might want to parse the date string
                    existingLoan.setReturned(true);
                }
                
                LoanTransaction updatedLoan = loanTransactionService.saveLoanTransaction(existingLoan);
                return ResponseEntity.ok(convertToDTO(updatedLoan));
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        LoanTransaction existingLoan = loanTransactionService.getLoanTransactionById(id);
        if (existingLoan != null) {
            loanTransactionService.deleteLoanTransactionById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/{id}/return")
    public ResponseEntity<LoanDTO> returnBook(@PathVariable Long id) {
        LoanTransaction loan = loanTransactionService.getLoanTransactionById(id);
        if (loan != null && !loan.isReturned()) {
            loan.setReturned(true);
            loan.setReturnDate(new Date());
            LoanTransaction updatedLoan = loanTransactionService.saveLoanTransaction(loan);
            return ResponseEntity.ok(convertToDTO(updatedLoan));
        }
        return ResponseEntity.notFound().build();
    }
    
    private LoanDTO convertToDTO(LoanTransaction loan) {
        LoanDTO dto = new LoanDTO();
        dto.setId(loan.getId());
        dto.setBookId(loan.getBook().getId());
        dto.setMemberId(loan.getMember().getId());
        dto.setLoanDate(loan.getLoanDate() != null ? loan.getLoanDate().toString() : null);
        dto.setDueDate(loan.getDueDate() != null ? loan.getDueDate().toString() : null);
        dto.setReturnDate(loan.getReturnDate() != null ? loan.getReturnDate().toString() : null);
        dto.setBook(loan.getBook());
        dto.setMember(loan.getMember());
        return dto;
    }
} 