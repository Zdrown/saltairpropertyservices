'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState('');

  const testAPI = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.text();
      setResult(`Status: ${response.status}\nResponse: ${data}`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => testAPI('/api/reviews')}
          style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test GET /api/reviews
        </button>
        
        <button 
          onClick={() => testAPI('/api/reviews/admin?action=approve&reviewId=1')}
          style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Approve Review
        </button>
        
        <button 
          onClick={() => testAPI('/api/reviews/admin?action=reject&reviewId=1')}
          style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Reject Review
        </button>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
        <h3>Result:</h3>
        {result || 'Click a button to test the API'}
      </div>
    </div>
  );
}
