import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 이미지 URL을 받아와 원 모양 이미지로 변환
 * @param {string} imageUrl - 변환할 이미지의 URL
 * @returns {string} 변환된 이미지 URL
 */
export const transformImageToCircle = (imageUrl: string) => {
  const params = 'w_100,h_100,c_thumb,f_auto,g_face,r_max'
  return imageUrl.replace(/\/upload\/.*?\//, `/upload/${params}/`)
}

/**
 * HTML 문자열에서 모든 &nbsp;를 제거
 * @param {string} str - 변환할 HTML 문자열
 * @returns {string} 변환된 HTML 문자열
 */
export const trimHTML = (str: string) => {
  return str.replace(/&nbsp;/g, '').trim()
}

/**
 * HTML 태그를 제거
 * @param {string} str - HTML 태그가 포함된 문자열
 * @returns {string} HTML 태그가 제거된 순수한 텍스트
 */
export const removeTagsText = (str: string) => {
  return str.replace(/<[^>]+>/g, '')
}

/**
 * 클래스 이름을 결합하고 병합
 * @param inputs 클래스 이름 값들의 배열
 * @returns 병합된 클래스 이름 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
