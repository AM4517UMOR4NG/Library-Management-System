package com.example.library_management_utspbold.controller;

import com.example.library_management_utspbold.model.LoanTransaction;
import com.example.library_management_utspbold.service.LoanTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanRestController {
    
    @Autowired
    private LoanTransactionService loanTransactionService;
    
    @GetMapping
    public ResponseEntity<List<LoanTransaction>> getAllLoans() {
        return ResponseEntity.ok(loanTransactionService.getAllLoanTransactions());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LoanTransaction> getLoanById(@PathVariable Long id) {
        LoanTransaction loan = loanTransactionService.getLoanTransactionById(id);
        if (loan != null) {
            return ResponseEntity.ok(loan);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<LoanTransaction> createLoan(@RequestBody LoanTransaction loan) {
        if (loan.getBorrowDate() == null) {
            loan.setBorrowDate(new Date());
        }
        LoanTransaction savedLoan = loanTransactionService.saveLoanTransaction(loan);
        return ResponseEntity.ok(savedLoan);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LoanTransaction> updateLoan(@PathVariable Long id, @RequestBody LoanTransaction loan) {
        LoanTransaction existingLoan = loanTransactionService.getLoanTransactionById(id);
        if (existingLoan != null) {
            loan.setId(id);
            LoanTransaction updatedLoan = loanTransactionService.saveLoanTransaction(loan);
            return ResponseEntity.ok(updatedLoan);
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
    public ResponseEntity<LoanTransaction> returnBook(@PathVariable Long id) {
        LoanTransaction loan = loanTransactionService.getLoanTransactionById(id);
        if (loan != null && !loan.isReturned()) {
            loan.setReturned(true);
            loan.setReturnDate(new Date());
            LoanTransaction updatedLoan = loanTransactionService.saveLoanTransaction(loan);
            return ResponseEntity.ok(updatedLoan);
        }
        return ResponseEntity.notFound().build();
    }
} 