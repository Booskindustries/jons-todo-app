import React from 'react'
import { useAccount } from '../context/AccountContext'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';


export function AccountWidget() {

const { account }   = useAccount();

const getInitials = (name: string) => {
    const names = name.split(" ")
    if (names.length > 1) {
        return names[0][0] + names[1][0]
    }

    return names[0][0]
}

return (
    <>
        <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={'avatars/pfp.jpg'} alt={account?.name ?? 'bill'
        } />
        <AvatarFallback className="rounded-lg">{getInitials(account?.name?? 'Bill Bob')}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{account?.name ?? 'Bill Bob'}</span>
        <span className="truncate text-xs text-muted-foreground">
            {account?.email ?? 'Bill.Bob@bobmail.com'}
        </span>
        </div>
    </>
)}