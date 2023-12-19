import Link from 'next/link'
import Button from '@/components/Button';

export default function IndexHome() {
  return (
    <main>
      <h1>hello</h1>
      <div>
        <ul>
          <li>
            <Link href="/cursos">cursos</Link>
          </li>
          <li>
            <Link href="/tienda">tienda</Link>
          </li>
        </ul>
        <Button/>
      </div>
    </main>
  );
}
