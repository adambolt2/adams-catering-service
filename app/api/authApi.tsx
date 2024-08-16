export const fetchAndStoreAdminToken = async () => {
    try {
      const response = await fetch('https://localhost:7097/api/Users/generate-admin-token', {
        method: 'GET', // Assuming GET request
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch admin token');
      }
  
      const data = await response.json();
     
      const token = data.token;
  
      // Store the token in local storage
      sessionStorage.setItem('AdminToken', token);  
      console.log('Admin token stored successfully');
    } catch (error) {
      console.error('Error fetching admin token:', error);
    }
  };