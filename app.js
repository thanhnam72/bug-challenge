const Replacer = require('./utils/Replacer')
const SaveJSON = require('./utils/SaveJSON')
const TextLoader = require('./utils/TextLoader')
const JSONLoader = require('./utils/JSONLoader')

module.exports = (sample_text, sample_data, result_path) => {
    const data = require(sample_data)
    const sample_string = TextLoader(sample_text)

    const processed_string = Replacer(sample_string, data)
    const save_path = __dirname + '/' + result_path
    const processed_string_enc = encodeURIComponent(processed_string);

    SaveJSON(save_path, `{ "processed": "${ processed_string_enc }" }`)

    const processed_json = JSONLoader(save_path)

    for(key in processed_json) {
      if(typeof processed_json[key] === "string") {
        processed_json[key] = decodeURIComponent(processed_json[key])
      }
    }

    return processed_json
}