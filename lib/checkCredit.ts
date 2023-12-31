import supabase from './supabase';

async function checkCredit(uid: string): Promise<number> {
  const { data, error } = await supabase
    .from('credit')
    .select('credit_left')
    .eq('uid', uid)
    .single();

  if (error) console.log(error);

  if (data) {
    console.log(data);
    return data.credit_left;
  } else {
    const { error } = await supabase.from('credit').insert({ uid });
    if (error) throw error;

    return 30;
  }
}

export default checkCredit;
