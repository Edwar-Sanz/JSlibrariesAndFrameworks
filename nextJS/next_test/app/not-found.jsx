import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>hello NotFound</h1>
      <div>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
