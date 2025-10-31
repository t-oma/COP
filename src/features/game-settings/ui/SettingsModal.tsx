import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { AppModal } from "~/widgets";
import { useGameSettings } from "..";
import type { SubmitHandler } from "react-hook-form";
import type { AppModalProps } from "~/widgets";
import type { GameSettingsUpdateParams } from "..";

type SettingsModalProps = Pick<AppModalProps, "open" | "onClose"> & {
  gameId: number;
};

type SettingsModalFormData = GameSettingsUpdateParams;

function SettingsModal({
  gameId,
  open,
  onClose,
}: Readonly<SettingsModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { settings, updateSettings } = useGameSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsModalFormData>({
    defaultValues: {
      difficulty: settings.difficulty,
      hintLength: settings.hintLength,
      remember: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SettingsModalFormData> = (data) => {
    updateSettings(gameId, data);
    onClose?.();
    navigate(
      `/games/${gameId}/?difficulty=${data.difficulty}&hintLength=${data.hintLength}`
    );
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, open]);

  return (
    <AppModal open={open} closeOnBackdropClick closeOnEsc onClose={onClose}>
      <h2 className="mb-4 text-xl font-semibold">Configure Game</h2>

      <AppForm onSubmit={handleSubmit(onSubmit)}>
        <AppFormField label="Difficulty:" htmlFor="difficulty">
          <select
            id="difficulty"
            className=""
            {...register("difficulty", { required: true })}
            aria-invalid={errors.difficulty ? "true" : "false"}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </AppFormField>

        <AppFormField label="Hint Length (0 full word):" htmlFor="hint-length">
          <input
            type="number"
            id="hint-length"
            placeholder="0"
            className=""
            {...register("hintLength", { required: true, min: 0 })}
            aria-invalid={errors.hintLength ? "true" : "false"}
          />
        </AppFormField>
        {errors.hintLength && (
          <p className="text-sm text-red-500">
            Hint length must be a positive number
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <AppFormField label="Remember for this game" htmlFor="remember">
            <input type="checkbox" id="remember" {...register("remember")} />
          </AppFormField>

          <button
            type="submit"
            className="rounded-md bg-green-500 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </AppForm>
    </AppModal>
  );
}

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

export { SettingsModal };
