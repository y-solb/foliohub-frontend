/* eslint-disable @next/next/no-img-element */

'use client'

import TextEditor from '@/components/TextEditor'
import Toolbar from '@/components/Toolbar'
import { useState } from 'react'
import GitHubCalendar from 'react-github-calendar'

type UserData = {
  id: number
  name: string
  bio: string
  thumbnail: string
  github: string[]
  title: string[]
  content: string[]
  imageUrl: string[]
}

const USERDATA: UserData = {
  id: 1,
  name: '소르비',
  bio: '❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다. ❤️프론트엔드 개발자입니다.',
  thumbnail: 'https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg',
  github: [],
  title: [],
  content: [],
  imageUrl: [],
}

export default function UserPage({ params }: { params: { userId: string } }) {
  const [data, setData] = useState<UserData>(USERDATA)

  const handleAdd = (name: string, value?: string) => {
    if (name === 'github' && value) {
      setData({ ...data, github: [...data.github, value] })
    } else if (name === 'title') {
      setData({ ...data, title: [...data.title, ''] })
    } else if (name === 'content') {
      setData({ ...data, content: [...data.content, ''] })
    } else if (name === 'imageUrl' && value) {
      setData({ ...data, imageUrl: [...data.imageUrl, value] })
    }
  }

  console.log(params.userId)

  return (
    <div className="relative">
      <Toolbar onAdd={handleAdd} />
      <div className="flex">
        <div className="flex w-full">
          <div className="flex flex-col gap-8 px-8 py-16 w-80">
            <button type="button">
              {data.thumbnail ? (
                <img
                  className="rounded-full w-48 h-48"
                  src={data.thumbnail}
                  alt="프로필 이미지"
                />
              ) : (
                <img
                  className="rounded-full w-48 h-48"
                  src="https://pbs.twimg.com/media/FPOm-o_agAA4xXW.jpg"
                  alt="프로필 이미지"
                />
              )}
            </button>
            <div className="flex flex-col gap-4">
              <h1
                className="break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {data.name}
              </h1>
              <h3
                className="text-gray-500 break-all"
                contentEditable="true"
                suppressContentEditableWarning
              >
                {data.bio}
              </h3>
            </div>
          </div>
          <div className="w-full px-8 py-16">
            {data.github.map((username) => (
              <GitHubCalendar username={username} colorScheme="light" />
            ))}
            {data.title.map((title) => (
              <h2
                className="break-all"
                contentEditable="true"
                title="제목을 입력해주세요."
                suppressContentEditableWarning
              >
                {title}
              </h2>
            ))}
            {data.content.map((content) => (
              <TextEditor content={content} />
            ))}
            {data.imageUrl.map((url) => (
              <img src={url} alt="image_" />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-red-100 h-40"
        onClick={() => console.log(data)}
      >
        저장하기
      </button>
    </div>
  )
}
