package project.widu.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.widu.domain.Member;
import project.widu.repository.MemberRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화

    //회원 가입
    @Transactional
    public Member join(Member member) {
        validateDuplicateId(member); //중복 아이디 검증
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword); // 비밀번호 암호화
        memberRepository.save(member);
        return member;
    }

    // 로그인 - 아이디, 비밀번호 검증
    public Member login(String id, String password) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }
        return member;
    }

    private void validateDuplicateId(Member member) {
        Member existingId = memberRepository.findById(member.getId());
        if (existingId != null) {
            throw new IllegalStateException("이미 존재하는 아이디입니다.");
        }
    }
}
