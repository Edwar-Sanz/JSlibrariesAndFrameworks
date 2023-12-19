import Link from 'next/link'

export default function IndexCursos(params) {
  
  return  (
    <div>

      <h1>IndexCursos</h1>

      <ul>
        <li><Link href="cursos/ingles">ingles</Link></li>
        <li><Link href="cursos/italiano">italiano</Link></li>
      </ul>

    </div>

  );
}