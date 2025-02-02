// Error text component
export default function ErrorText({ text }: { text: string | undefined }) {
  return <p className="text-destructive text-sm mt-1">{text}</p>;
}
