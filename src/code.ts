figma.showUI(__html__, { width: 480, height: 480 })
function getSelectionStyle() {
  const selection = figma.currentPage.selection
  const textStyleId = ((selection[0] as TextNode).textStyleId as string) ?? ''
  const fillStyleId = ((selection[0] as TextNode).fillStyleId as string) ?? ''
  const textStyle = textStyleId ? figma.getStyleById(textStyleId) : ''
  const fillStyle = fillStyleId ? figma.getStyleById(fillStyleId) : ''
  const textStyleCode = textStyle
    ? '${' + `typography['${textStyle.name}']` + '}'
    : ''
  const colorStyleCode = fillStyle
    ? 'color: ${' + `colors['${fillStyle.name}']` + '};'
    : ''
  return {
    textStyle,
    fillStyle,
    code: `${textStyleCode}\n${colorStyleCode}`,
  }
}
figma.ui.postMessage({
  type: 'styles',
  text: getSelectionStyle().code,
})

figma.ui.onmessage = (msg) => {
  if (msg.type === 'cancel') {
    figma.closePlugin()
  }
}
