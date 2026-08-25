import { useCallback, useEffect, useState } from 'react';
import * as employeeApi from '../api/employees';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeApi.getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createEmployee = async (data) => {
    const created = await employeeApi.createEmployee(data);
    await refetch();
    return created;
  };

  const updateEmployee = async (id, data) => {
    const updated = await employeeApi.updateEmployee(id, data);
    await refetch();
    return updated;
  };

  const deleteEmployee = async (id) => {
    await employeeApi.deleteEmployee(id);
    await refetch();
  };

  return {
    employees,
    loading,
    error,
    refetch,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
