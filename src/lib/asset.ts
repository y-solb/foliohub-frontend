export const getGridTemplate = (width: number, height: number) => ({
  gridTemplateColumns: width > height ? `${height}fr ${width - height}fr` : '',
  gridTemplateRows:
    // eslint-disable-next-line no-nested-ternary
    width < height
      ? `${height}fr ${height - width}fr`
      : width === height
        ? '1fr 1fr'
        : '',
})
