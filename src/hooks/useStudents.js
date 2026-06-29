import { useCallback, useEffect, useState } from 'react';
import { getStudents } from '../api/studentService';

const PAGE_SIZE = 8;

export function useStudents({ search, classFilter, sectionFilter, statusFilter, page }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getStudents({
        search,
        classFilter,
        sectionFilter,
        statusFilter,
        page,
        pageSize: PAGE_SIZE,
      });
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError('Could not load students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [search, classFilter, sectionFilter, statusFilter, page]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students: data,
    total,
    pageSize: PAGE_SIZE,
    isLoading,
    error,
    refetch: fetchStudents,
  };
}
