import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  department: '',
  position: '',
  salary: '',
};

export default function EmployeeForm({ employee, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        department: employee.department || '',
        position: employee.position || '',
        salary: employee.salary ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.first_name.trim()) nextErrors.first_name = 'First name is required';
    if (!form.last_name.trim()) nextErrors.last_name = 'Last name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  const fields = [
    { name: 'first_name', label: 'First Name', required: true },
    { name: 'last_name', label: 'Last Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'department', label: 'Department' },
    { name: 'position', label: 'Position' },
    { name: 'salary', label: 'Salary', type: 'number', step: '0.01', min: '0' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] flex flex-col my-auto border border-slate-100 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {employee ? 'Edit Employee Record' : 'Add New Employee'}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {employee ? 'Update staff member details below.' : 'Fill in employee details to create record.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {fields.map(({ name, label, type = 'text', required, ...rest }) => (
              <div
                key={name}
                className={name === 'email' ? 'sm:col-span-2' : ''}
              >
                <label
                  htmlFor={name}
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  {label}
                  {required && <span className="text-rose-500"> *</span>}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-50 transition-all ${
                    errors[name] ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                  {...rest}
                />
                {errors[name] && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving...' : employee ? 'Update Record' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
