// loginApi.tsx
export const loginUser = async (Email: string, password: string): Promise<any> => {
    try {
      const token = sessionStorage.getItem('AdminToken'); // Retrieve the token from sessionStorage
  
      const response = await fetch('https://localhost:7097/api/Users/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token as the Bearer token
        },
        body: JSON.stringify({
          Email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  