import { useState } from 'react';
import ConfirmDialog from './components/ConfirmDialog';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useEmployees } from './hooks/useEmployees';

function Banner({ type, message, onDismiss }) {
  const isSuccess = type === 'success';
  return (
    <div
      className="mb-6 flex items-center justify-between rounded-xl border px-4 py-3 text-sm shadow-xs animate-fade-in"
      style={{
        borderColor: isSuccess ? '#bbf7d0' : '#fecaca',
        background: isSuccess ? '#f0fdf4' : '#fef2f2',
        color: isSuccess ? 'var(--success)' : 'var(--danger)',
      }}
    >
      <span className="font-medium">{message}</span>
      <button type="button" onClick={onDismiss} className="ml-4 font-semibold opacity-70 hover:opacity-100 cursor-pointer">
        Dismiss
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="h-9 w-9 animate-spin rounded-full border-4"
        style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }}
      />
    </div>
  );
}

export default function App() {
  const {
    employees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('workpulse_user') || sessionStorage.getItem('workpulse_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [banner, setBanner] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('workpulse_user');
    sessionStorage.removeItem('workpulse_user');
    setUser(null);
  };

  const openCreateForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        setBanner({ type: 'success', message: 'Employee updated successfully.' });
      } else {
        await createEmployee(formData);
        setBanner({ type: 'success', message: 'Employee created successfully.' });
      }
      closeForm();
    } catch (err) {
      setBanner({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingEmployee) return;
    setDeleting(true);
    try {
      await deleteEmployee(deletingEmployee.id);
      setBanner({ type: 'success', message: 'Employee deleted successfully.' });
      setDeletingEmployee(null);
    } catch (err) {
      setBanner({ type: 'error', message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 relative pb-16 md:pb-0">
      {/* Left Sidebar Navigation (Mobile Responsive Drawer + Desktop Sticky) */}
      <Sidebar
        view={view}
        setView={setView}
        onOpenCreate={openCreateForm}
        user={user}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Open Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 capitalize leading-tight">
                {view === 'dashboard' ? 'Executive Dashboard' : 'Employee Directory'}
              </h2>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {view === 'dashboard'
                  ? 'Overview of company metrics and department breakdown'
                  : 'Manage staff records, positions, and details'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCreateForm}
              className="py-2 px-3 sm:px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="text-base font-bold leading-none">+</span>
              <span className="hidden xs:inline sm:inline">Add Employee</span>
              <span className="xs:hidden sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {banner && (
            <Banner
              type={banner.type}
              message={banner.message}
              onDismiss={() => setBanner(null)}
            />
          )}

          {loading && <Spinner />}

          {!loading && error && (
            <div
              className="rounded-xl border p-4 text-sm font-medium shadow-xs"
              style={{ borderColor: '#fecaca', background: '#fef2f2', color: 'var(--danger)' }}
            >
              Failed to load employees: {error}
            </div>
          )}

          {!loading && !error && view === 'dashboard' && (
            <Dashboard employees={employees} />
          )}

          {!loading && !error && view === 'employees' && (
            <EmployeeTable
              employees={employees}
              onEdit={openEditForm}
              onDelete={setDeletingEmployee}
            />
          )}
        </main>

        {/* Mobile Bottom Quick Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-30 shadow-lg">
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className={`flex flex-col items-center gap-1 text-xs font-semibold py-1 px-3 rounded-lg transition-colors ${
              view === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setView('employees')}
            className={`flex flex-col items-center gap-1 text-xs font-semibold py-1 px-3 rounded-lg transition-colors ${
              view === 'employees' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Employees</span>
          </button>
        </div>
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          saving={saving}
        />
      )}

      {deletingEmployee && (
        <ConfirmDialog
          title="Delete Employee"
          message={`Are you sure you want to delete ${deletingEmployee.first_name} ${deletingEmployee.last_name}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingEmployee(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
