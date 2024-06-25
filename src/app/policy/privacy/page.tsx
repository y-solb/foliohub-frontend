/* eslint-disable react/no-unescaped-entities */
import BaseLayout from '@/components/layout/BaseLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보 처리방침 | FolioHub',
}

export default function PrivacyPage() {
  return (
    <BaseLayout>
      <div className="max-w-3xl mx-auto my-8">
        <h1 className="mb-4">개인정보 처리방침</h1>

        <h2 className="my-2">1. 개인정보의 수집 및 이용 목적</h2>
        <p>
          폴리오허브(이하 "회사")는 수집한 개인정보를 다음의 목적을 위해
          활용합니다.
        </p>
        <p>- 회원관리</p>
        <p>- 서비스 제공</p>

        <h2 className="my-2">2. 개인정보의 보유 및 이용기간</h2>
        <h3>소비자의 불만 또는 분쟁처리에 관한 기록</h3>
        <p>
          보존 이유: 전자상거래 등에서의 소비자보호에 관한 법룔 제6조 및 시행령
          제6조 보존 기간: 3년
        </p>
        <h3>본인확인에 관한 기록</h3>
        <p>
          보존 이유: 정보통신망 이용촉진 및 정보보호에 관한 법률 제 44조의5 및
          시행령 제 29조 보존 기간: 6개월
        </p>
        <h3>접속에 관한 기록</h3>
        <p>
          보존 이유: 통신비밀보호법 제15조의2 및 시행령 제41조- 보존 기간: 3개월
        </p>

        <h2 className="my-2">3. 수집하는 개인정보의 항목</h2>
        <p>
          회사는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고
          있습니다.
        </p>
        <p>1. 수집항목</p>
        <p>사용자 입력</p>
        <p>이메일 또는 소셜 미디어 서비스 ID: 사용자의 구분</p>
        <p>자동 수집항목 : 쿠키, 접속 기록 등</p>
        <p>2. 개인정보 수집방법: 홈페이지(회원 가입)</p>

        <h2 className="my-2">4. 개인정보의 파기절차 및 방법</h2>
        <p>
          이용자는 로그인 후 마이 페이지에서 계정을 탈퇴할 수 있습니다. 또는,
          가입한 계정의 이메일을 사용하여 개인정보 관리 책임자(7조 참고)에게
          이메일을 발송하여 탈퇴 요청을 할 수 있습니다.
        </p>
        <p>파기절차</p>
        <p>
          탈퇴처리가 진행되면 DB에 있는 계정정보와, 해당 계정으로 작성된 모든
          게시글과 댓글이 삭제됩니다.
        </p>

        <h2 className="my-2">5. 개인정보 제공</h2>
        <p>
          회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만,
          아래의 경우에는 예외로 합니다.
        </p>
        <p>- 이용자들이 사전에 동의한 경우</p>
        <p>
          - 법령의 규정에 의거하거나, 수사 목적으로 사회사의 요구가 있는 경우
        </p>

        <h2 className="my-2">6. 개인정보 제공</h2>
        <p>1) 해킹 등에 대비한 대책</p>
        <p>2) 취급 직원의 최소화 및 교육</p>

        <h2 className="my-2">7. 개인정보 관리 책임자 및 담당자</h2>
        <p>성명: 윤솔비</p>
        <p>이메일: ysolb99@gmail.com</p>
        <p>
          기타 개인정보침해에 대한 신고나 상담이 필요한 경우에는 아래 회사에
          문의하시기 바랍니다.
        </p>
        <p>개인정보침해신고센터 (www.118.or.kr / 118)</p>

        <h2 className="my-2">8. 개인정보 취급방침 변경에 관한 사항</h2>
        <p>
          이 개인정보 취급방침은 2024년 6월 25일부터 적용됩니다. 변경이전의
          "정보보안 처리방침"을 과거이력 기록
        </p>
      </div>
    </BaseLayout>
  )
}
