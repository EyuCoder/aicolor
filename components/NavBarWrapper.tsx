import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NavBar from './NavBar';

const NavBarWrapper = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return (
    <div>
      <NavBar user={data.user} />
    </div>
  );
};

export default NavBarWrapper;
