package com.example.library_management_utspbold.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.library_management_utspbold.model.Member;
import com.example.library_management_utspbold.service.MemberService;

import java.util.Date;

@Controller
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String listMembers(Model model) {
        model.addAttribute("members", memberService.getAllMembers());
        return "member/list";
    }

    @GetMapping("/add")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String showAddForm(Model model) {
        model.addAttribute("member", new Member());
        return "member/form";
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String showEditForm(@PathVariable Long id, Model model) {
        Member member = memberService.getMemberById(id);
        System.out.println(member);
        model.addAttribute("member", member);
        return "member/form";
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String saveMember(@Validated @ModelAttribute Member member, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            if (member.getMembershipDate() == null) {
                member.setMembershipDate(new Date());
            }
        }

        memberService.saveMember(member);
        return "redirect:/members";
    }

    @GetMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String deleteMember(@PathVariable Long id) {
        memberService.deleteMemberById(id);
        return "redirect:/members";
    }
}