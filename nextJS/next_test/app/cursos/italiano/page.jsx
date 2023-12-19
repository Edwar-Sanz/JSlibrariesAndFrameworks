import Link from 'next/link'

export default function IndexCursoItaliano(params) {
  
  return  (
    <div>

      <h1>IndexCursoItaliano</h1>

      <ul>
        <li><Link href="/cursos">volver</Link></li>
      </ul>

    </div>

  );
}