const api = async (method = 'GET', slug = '', data = {}, headers = {}) => {
  console.log(slug)
  try {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://nems.nullchemy.com'

    const config: any = {
      method: method,
      headers: { ...headers },
      redirect: 'follow',
      cache: 'no-store',
    }
    if (method !== 'GET') {
      config.body = JSON.stringify(data)
    }

    const response = await fetch(`${origin}/api/${slug}`, config)
    return response
  } catch (error: any) {
    console.log(error)
    if (error.name === 'AbortError') {
      return {
        message: 'Request timed out',
        status: 400,
      }
    } else if (error.message === 'Failed to fetch') {
      return {
        message: 'Connection timed out! Network Error',
        status: error.status || 400,
      }
    } else {
      let errorMessage = 'An unknown error occurred'
      let status = 400
      if (error.json) {
        const errorResponse = await error.json()
        errorMessage = errorResponse.message || errorResponse || errorMessage
        status = error.status || status
      } else {
        errorMessage = error.message || errorMessage
      }

      return {
        message: errorMessage,
        status: status,
      }
    }
  }
}

export default api
