import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const { titulo, descricao, categoria } = await req.json();

    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
    }

    const { data: user, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
        return NextResponse.json({ error: 'Token inválido.' }, { status: 401 });
    }

    const { data, error } = await supabase.from('tasks').insert({
      titulo,
      descricao,
      categoria,
      user_id: user.user.id,
    });

    if (error) {
      return NextResponse.json({ error: 'Erro ao criar a tarefa.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tarefa criada com sucesso!' });

  } catch (err) {
    return NextResponse.json({ error: 'Ocorreu um erro desconhecido.' }, { status: 500 });
  }
}
