package com.example.library_management_utspbold.controller;

import com.example.library_management_utspbold.model.Member;
import com.example.library_management_utspbold.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberRestController {
    
    @Autowired
    private MemberService memberService;
    
    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        Member member = memberService.getMemberById(id);
        if (member != null) {
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        memberService.saveMember(member);
        return ResponseEntity.ok(member);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member member) {
        Member existingMember = memberService.getMemberById(id);
        if (existingMember != null) {
            member.setId(id);
            memberService.saveMember(member);
            return ResponseEntity.ok(member);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        Member existingMember = memberService.getMemberById(id);
        if (existingMember != null) {
            memberService.deleteMemberById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 