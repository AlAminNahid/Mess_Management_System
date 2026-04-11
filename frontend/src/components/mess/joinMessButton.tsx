interface JoinProps {
  onClick: () => void;
}

export default function JoinMessButton({ onClick }: JoinProps) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-lg bg-black text-white 
                 text-sm font-semibold
                 hover:bg-slate-900 transition"
    >
      Join
    </button>
  );
}
