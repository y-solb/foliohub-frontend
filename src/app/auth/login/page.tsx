export default function LoginPage() {
  return (
    <div>
      <a href={`${process.env.NEXT_PUBLIC_API_HOST}/v1/auth/redirect/google`}>
        Google 로그인
      </a>
    </div>
  )
}
