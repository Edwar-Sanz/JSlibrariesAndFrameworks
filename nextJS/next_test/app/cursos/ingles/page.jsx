import Link from 'next/link'

export default function IndexCursoIngles(params) {
  
  return  (
    <div>
      <h1>IndexCursoIngles</h1>
      <ul>
        <li><Link href="/cursos">volver</Link></li>
      </ul>
    </div>

  );
}