import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProgram } from "@/lib/admin-actions";
import ProgramForm from "@/components/admin/ProgramForm";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();

  if (!program) notFound();

  const updateWithId = updateProgram.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Edit Program
      </h1>
      <div className="mt-6 max-w-2xl rounded-2xl border border-forest-800/10 bg-white p-6">
        <ProgramForm action={updateWithId} program={program} />
      </div>
    </div>
  );
}
