import supabase from './supabase';

const decreaseCreditLeft = async (uid: string, updateCredit: number) => {
  const { data, error } = await supabase
    .from('credit')
    .update({ credit_left: updateCredit })
    .eq('uid', uid);
  if (error) console.log('Error decreasing credit_left:', error.message);
  else console.log('Credit_left decreased successfully:', data);
};

export default decreaseCreditLeft;
