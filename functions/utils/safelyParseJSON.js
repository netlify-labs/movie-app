// util for safetly parsing JSON if body empty
export default function safelyParseJSON(json) {
  var parsed = {}
  try {
    parsed = JSON.parse(json)
  } catch (e) {
  	console.log('JSON parse error', e)
    // ¯\_(ツ)_/¯
  }

  return parsed
}