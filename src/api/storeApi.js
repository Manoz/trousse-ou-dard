const jsonBinAccessKey = import.meta.env.VITE_JSONBIN_API_KEY
const headers = { 'X-Access-Key': jsonBinAccessKey }

/**
 * Fetch content from JSONBin
 *
 * @param {string} binId - JSONBin ID
 * @returns {array} fetchData
 */
export const fetchApi = async (binId) => {
  try {
    const fetchData = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, { headers })
      .then((response) => response.json())
      .then((data) => {
        return data?.record?.content || []
      })
      .catch((error) => {
        console.error('Oops, something went wrong with JSONBin.io', error)
      })

    return fetchData || []
  } catch (error) {
    console.error('Oops, something went wrong while loading content', error)
  }
}

/**
 * Add content to JSONBin
 *
 * @param {string} binId - JSONBin ID
 * @param {array} oldContent - The old JSONBin.io content
 * @param {string} newContent - The new content to add
 * @returns {array} newDatas
 */
export const addContentApi = async (binId, oldContent, newContent) => {
  try {
    const content = oldContent
    content.push(newContent)

    // Send the updated content array to JSONBin
    const newDatas = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({ content })
    })
      .then((response) => response.json())
      .then((data) => {
        return data?.record?.content || []
      })
      .catch((error) => {
        console.error(error)
      })

    return newDatas
  } catch (error) {
    console.error('Oops, something went wrong while adding content', error)
  }
}
