import Link from 'next/link'


export default function NavBar(params) {
  
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
      </ul>
    </nav>
  );
}