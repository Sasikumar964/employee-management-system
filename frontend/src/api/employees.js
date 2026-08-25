const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export function getEmployees() {
  return request('/employees');
}

export function getEmployee(id) {
  return request(`/employees/${id}`);
}

export function createEmployee(employee) {
  return request('/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  });
}

export function updateEmployee(id, employee) {
  return request(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  });
}

export function deleteEmployee(id) {
  return request(`/employees/${id}`, {
    method: 'DELETE',
  });
}
