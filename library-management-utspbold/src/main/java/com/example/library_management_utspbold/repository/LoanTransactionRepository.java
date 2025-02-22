package com.example.library_management_utspbold.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_management_utspbold.model.LoanTransaction;

public interface LoanTransactionRepository extends JpaRepository<LoanTransaction, Long> {

}
