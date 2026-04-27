import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
});

type FormData = z.infer<typeof schema>;

export default function TaskForm({ onSubmit }: any) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <input {...register("title")} placeholder="title" />
      <textarea {...register("description")} />
      <select {...register("priority")}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}