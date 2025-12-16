type AppFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

function AppForm({ onSubmit, children }: Readonly<AppFormProps>) {
  return (
    <form className="flex flex-col space-y-2" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

type AppFormFieldProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
};

function AppFormField({
  label,
  htmlFor,
  children,
}: Readonly<AppFormFieldProps>) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export { AppForm, AppFormField };
