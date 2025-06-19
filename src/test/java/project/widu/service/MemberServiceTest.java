package project.widu.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import project.widu.domain.Member;
import project.widu.repository.MemberRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Autowired PasswordEncoder passwordEncoder;

    @Test
    public void 회원가입() throws Exception {
        //given
        Member member = new Member();
        member.setId("id");
        member.setPassword("pw");

        //when
        Member joinMember = memberService.join(member);

        //then
        assertNotNull(joinMember);
        assertEquals(member.getId(), joinMember.getId()); //아이디 일치 확인
        assertTrue(passwordEncoder.matches("pw", joinMember.getPassword())); //암호화된 비밀번호 확인
    }

    @Test
    public void 로그인_성공() {
        // given
        Member member = new Member();
        member.setId("id");
        member.setPassword("pw");

        memberService.join(member);

        // when
        Member loginMember = memberService.login("id", "pw");

        // then
        assertNotNull(loginMember);
        assertEquals("id", loginMember.getId());
        assertTrue(passwordEncoder.matches("pw", loginMember.getPassword()));
    }
}
