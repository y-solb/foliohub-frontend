// eslint-disable-next-line import/prefer-default-export
export const transformImageToCircle = (imageUrl: string) => {
  const params = 'w_100,h_100,c_thumb,f_auto,g_face,r_max'
  return imageUrl.replace(/\/upload\/.*?\//, `/upload/${params}/`)
}
