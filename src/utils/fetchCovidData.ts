export async function fetchCovidData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching COVID-19 data:', error);
    return null;
  }
}