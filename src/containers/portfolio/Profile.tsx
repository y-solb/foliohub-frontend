import { UserData } from '@/types'

interface ProfileProps {
  portfolio: UserData
  onProfileChange: (name: string, value: string) => void
}

function Profile({ portfolio, onProfileChange }: ProfileProps) {
  const handleChange = (event: React.ChangeEvent<HTMLHeadingElement>) => {
    const {
      dataset: { name },
      innerText,
    } = event.target
    if (!name || !innerText) return
    onProfileChange(name, innerText)
  }
  return (
    <div className="flex flex-col gap-8 px-8 py-16 w-80">
      <button type="button">
        {portfolio.thumbnail ? (
          <img
            className="rounded-full w-48 h-48"
            src={portfolio.thumbnail}
            alt="프로필 이미지"
          />
        ) : (
          <img
            className="rounded-full w-48 h-48"
            src="https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg"
            alt="프로필 이미지_기본"
          />
        )}
      </button>
      <div className="flex flex-col gap-4">
        <h1
          data-name="displayName"
          className="break-all"
          contentEditable="true"
          suppressContentEditableWarning
          onInput={handleChange}
        >
          {portfolio.displayName}
        </h1>
        <h3
          data-name="shortBio"
          className="text-gray-500 break-all"
          contentEditable="true"
          suppressContentEditableWarning
          onInput={handleChange}
        >
          {portfolio.shortBio}
        </h3>
      </div>
    </div>
  )
}

export default Profile
