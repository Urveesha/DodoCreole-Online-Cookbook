export async function handler(event) {
  const path = event.path.replace('/.netlify/functions/wpapi', '')
  const query = event.rawQuery ? `?${event.rawQuery}` : ''

  const url = `https://dodo-creole-recipes.free.nf/wp-json/wp/v2${path}${query}`

  try {
    const response = await fetch(url)
    const data = await response.text()

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}