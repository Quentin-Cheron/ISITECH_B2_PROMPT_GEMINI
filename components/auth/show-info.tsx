export default function ShowInfo({
  title,
  content,
}: {
  title: string;
  content: string | null | undefined;
}) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
      <p className="text-sm font-medium">{title}</p>
      <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
        {content}
      </p>
    </div>
  );
}
