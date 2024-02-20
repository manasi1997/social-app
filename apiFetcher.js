// utils/apiFetcher.ts

export const apiFetcher = async (url: string, options: object) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error so the caller can handle it
    }
  };
  