export function getDashboardStats(employees) {
  const total = employees.length;

  const deptMap = employees.reduce((acc, emp) => {
    const dept = emp.department?.trim() || 'Unassigned';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departments = Object.entries(deptMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const salaries = employees
    .map((e) => parseFloat(e.salary))
    .filter((s) => !Number.isNaN(s) && s > 0);

  const avgSalary =
    salaries.length > 0
      ? salaries.reduce((sum, s) => sum + s, 0) / salaries.length
      : 0;

  const recent = [...employees]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return { total, departments, avgSalary, recent };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}
