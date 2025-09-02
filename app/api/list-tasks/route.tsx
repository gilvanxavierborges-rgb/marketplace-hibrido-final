import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tasks = [
      { id: 1, titulo: 'Tarefa de Teste 1', descricao: 'Descrição de teste.', categoria: 'hidraulica' },
      { id: 2, titulo: 'Tarefa de Teste 2', descricao: 'Outra descrição de teste.', categoria: 'eletrica' },
    ];
    console.log("Rota de API funcionando! Retornando dados de teste.");
    return NextResponse.json({ tasks });

  } catch (err) {
    console.error('Erro de teste:', err);
    return NextResponse.json({ error: 'Erro ao buscar tarefas.' }, { status: 500 });
  }
}
