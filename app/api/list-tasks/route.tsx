import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    console.log("Tentando buscar dados da tabela 'tarefas'...");
    const { data: tasks, error } = await supabase.from('tarefas').select('*');

    if (error) {
      console.error('Erro retornado pelo Supabase:', error);
      return NextResponse.json({ error: 'Erro ao buscar tarefas.' }, { status: 500 });
    }

    console.log("Dados de tarefas encontrados:", tasks);
    return NextResponse.json({ tasks });

  } catch (err) {
    console.error('Ocorreu um erro desconhecido no servidor:', err);
    return NextResponse.json({ error: 'Ocorreu um erro desconhecido.' }, { status: 500 });
  }
}
