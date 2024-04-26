
"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import CreateListComponent from '@/app/components/Lists/create_list/Create_List_Component'; 


export default function Home() {
  const router = useRouter();




  

  return (
    <>
  
    
    <CreateListComponent />

    </>
  )
}