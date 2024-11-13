// api/api_helper.js
export async function callNodeAPI(endpoint, method = 'GET', data = null) {
    const url = `https://your-deployment-url.vercel.app/api/${endpoint}`; // Replace with your actual deployment URL
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error calling Node API:', error);
      throw error;
    }
  }
  