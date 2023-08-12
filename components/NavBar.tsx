'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Textarea,
  link,
  useDisclosure,
} from '@nextui-org/react';
import { useRef } from 'react';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import LoginModal from './Login/LoginModal';

type Props = { session: Session | null };

const NavBar = ({ session }: Props) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const user = session?.user;
  // console.log(user);

  const formRef = useRef<HTMLFormElement>(null);

  const handleLogoutClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <>
      <Navbar className='py-4'>
        <NavbarBrand>
          AI <p className='font-bold text-inherit'>Color</p>
        </NavbarBrand>

        <NavbarContent as='div' justify='end'>
          {user ? (
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  radius='lg'
                  as='button'
                  className='transition-transform'
                  color='secondary'
                  name='Jason Hughes'
                  size='md'
                  src={user?.user_metadata.avatar_url || ''}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='gap-2 h-14'>
                  <p className='font-semibold'>Signed in as</p>
                  <p className='font-semibold'>{user?.email}</p>
                </DropdownItem>
                <DropdownItem key='settings'>Buy Credits</DropdownItem>
                <DropdownItem key='logout' color='danger'>
                  <form ref={formRef} action='/auth/signout' method='post'>
                    <p onClick={handleLogoutClick}>Log Out</p>
                  </form>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              onPress={onOpen}
              as={Link}
              color='primary'
              href='#'
              variant='flat'>
              Login
            </Button>
          )}
        </NavbarContent>
        <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </Navbar>
    </>
  );
};

export default NavBar;
