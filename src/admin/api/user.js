export const fetchUserInfo = async () => {
    try {
      const response = await fetch('/wordpress/wp-json/wp/v2/users/me', {
        credentials: 'same-origin',
        headers: {
          'X-WP-Nonce': window.theBoxSettings.nonce
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  