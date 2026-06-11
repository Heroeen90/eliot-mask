const API_URL = 'https://eliot1server.pythonanywhere.com/api/execute';

export async function executeCommand(command, timeout = 60) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command: command,
        timeout: timeout
      }),
    });

    const data = await response.json();
    return {
      success: data.success ?? true,
      output: data.output || data.error || 'No output',
      error: data.error || null
    };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: 'Failed to connect: ' + err.message
    };
  }
}
