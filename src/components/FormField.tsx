import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

export default function FormField({ label, children, hint }: FormFieldProps) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
    </label>
  );
}
