'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        };

        const response = await fetch('/api/list-tasks', { headers });

        if (!response.ok) {
          throw new Error('Erro ao carregar as tarefas');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Tarefas Disponíveis</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task: any) => (
          <li key={task.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
            <h2>{task.titulo}</h2>
            <p>{task.descricao}</p>
            <p><strong>Categoria:</strong> {task.categoria}</p>
            <p><strong>Preço:</strong> R$ {task.preco_min} - R$ {task.preco_max}</p>
            <p><em>Publicado em: {new Date(task.criado_em).toLocaleDateString()}</em></p>
          </li>
        ))}
      </ul>
    </main>
  );
}
