import Link from 'next/link';

export default function Home() {
  return (
    <p>
      Velkommen til verktøy kassen!{' '}
      <Link href="/folders" className="text-blue-500 hover:underline">
        Ta meg til mappene
      </Link>
    </p>
  );
}
