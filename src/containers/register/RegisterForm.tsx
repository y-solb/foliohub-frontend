'use client'

import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/hooks/queries/auth'
import Checkbox from '@/components/common/Checkbox'
import Button from '@/components/common/Button'
import Link from 'next/link'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import { AxiosError } from 'axios'

interface Form {
  displayName: string
  username: string
  isAgreement: boolean
}

function RegisterForm() {
  const router = useRouter()
  const { mutate } = useRegisterMutation()
  const { openAlert } = useOpenAlertModal()

  const schema = z.object({
    displayName: z
      .string()
      .min(2, '최소 2자 이상 입력해 주세요.')
      .max(10, '최대 10자 이하 입력해 주세요.')
      .regex(
        /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/,
        '한글, 영문 그리고 숫자만 가능해요.',
      ),
    username: z
      .string()
      .min(2, '최소 2자 이상 입력해 주세요.')
      .max(10, '최대 10자 이하 입력해 주세요.')
      .regex(/^[a-z|A-Z|0-9]+$/, '영문 그리고 숫자만 가능해요.'),
    isAgreement: z
      .boolean()
      .refine(
        (value) => value === true,
        '개인정보 처리방침과 이용약관에 동의가 필요해요.',
      ),
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: '',
      username: '',
      isAgreement: false,
    },
  })

  const onSubmit = (data: Form) => {
    const { displayName, username } = data

    mutate(
      {
        displayName,
        username,
      },
      {
        onSuccess: (_, variables) => {
          router.replace(`/edit/${variables.username}`)
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            openAlert('문제가 발생했어요.', error.response?.data.errorMessage)
          }
          router.replace(`/`)
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full"
    >
      <div className="flex flex-col w-full mb-4">
        <div
          className={`flex items-center rounded-full border bg-white overflow-hidden w-full h-12 px-4 py-2 ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
        >
          <input
            type="text"
            className="body1 w-full"
            placeholder="이름"
            {...register('displayName')}
          />
        </div>
        {errors.displayName && (
          <p className="text-red-500 mt-1 pl-1">
            {errors.displayName?.message}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mb-4">
        <div
          className={`flex items-center rounded-full border bg-white overflow-hidden w-full h-12 px-4 py-2 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
        >
          <p className="body1">www.foliohub.me/</p>
          <input
            type="text"
            className="body1 w-full"
            placeholder="ID"
            {...register('username')}
          />
        </div>
        {errors.username && (
          <p className="text-red-500 mt-1 pl-1">{errors.username?.message}</p>
        )}
      </div>
      <div className="mb-8">
        <div className="flex">
          <Controller
            name="isAgreement"
            control={control}
            render={({ field }) => (
              <Checkbox id="agreement" {...field}>
                <p className="body2">
                  <Link
                    href="/policy/privacy"
                    className="text-gray-400 underline decoration-gray-400 underline-offset-4"
                    target="_blank"
                  >
                    개인정보 처리방침
                  </Link>
                  과
                  <Link
                    href="/policy/term"
                    className="text-gray-400 underline decoration-gray-400 underline-offset-4 ml-1"
                    target="_blank"
                  >
                    이용약관
                  </Link>
                  에 동의해요.
                </p>
              </Checkbox>
            )}
          />
        </div>
        {errors.isAgreement && (
          <p className="text-red-500 mt-1 pl-1">
            {errors.isAgreement?.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        회원가입
      </Button>
    </form>
  )
}

export default RegisterForm
