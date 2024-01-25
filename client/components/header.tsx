import React from 'react';
import { User } from '../types/user';
import Link from 'next/link';

interface Props {
    currentUser: User | null;
}
const Header: React.FC<Props> = ({ currentUser }) => {
    console.log({currentUser})
    const links = [
        {
            label: 'Sign up',
            href: '/auth/signup',
            auth: true
        },
        {
            label: 'Sign In',
            href: '/auth/sign-in',
            auth: true
        },
        {
            label: 'Sign out',
            href: '/auth/sign-out',
            auth: false
        }
    ].filter(({ auth }) => auth === (currentUser === null))
    return (
        <div className='navbar navbar-light bg-light'>
            <Link href="/" className='navbar-brand'>
                GitTix
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links.map(({ href,label }) => (
                        <li className='nav-item' key={href}>
                            <Link href={href} className='nav-link'>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header;
