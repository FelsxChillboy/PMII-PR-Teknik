import { createProgram } from "@/lib/admin-actions";
import ProgramForm from "@/components/admin/ProgramForm";

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Tambah Program Baru
      </h1>
      <div className="mt-6 max-w-2xl rounded-2xl border border-forest-800/10 bg-white p-6">
        <ProgramForm action={createProgram} />
      </div>
    </div>
  );
}
