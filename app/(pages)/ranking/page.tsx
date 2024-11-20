"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import rnkimg from "@/public/ranking.jpeg";
import { useUser } from "@/app/contexts/user";
import { useLayout } from "@/app/contexts/layoutCon";
import Spinner from "@/app/components/spinner";

type User = {
  id: number;
  tg_id: bigint;
  username: string;
  avatar_url: string;
  balance: number;
  friends: number;
  authDate: Date;
};

export default function Ranking() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { setFullHeight } = useLayout();
  const balance = user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  useEffect(() => {
    setFullHeight(false);
  }, [setFullHeight]);

  useEffect(() => {
    const fetchUsers = async () => {
      const tg_id = user?.tg_id === undefined ? 0 : user?.tg_id
      try {
        const res = await fetch(`/api/users?tg_id=${tg_id}`);
        if (!res.ok) throw new Error("Unable to fetch users");

        const users = await res.json();
        setUsers(users);
      } catch (e) {
        console.error("Failed to fetch users", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.tg_id]);

  return (
    <>
      <Header
        img_src={rnkimg}
        title="Ranking"
        desc="Push hard, give it everything you’ve got, and don’t let up until the job’s done! Earn your stripes and make ‘em remember your name in the heat of battle. Prove you belong out here, where only the toughest survive!"
      />

      <div className="mpl">
        <div className="rpl-usr">
          {user?.avatar_url ? (
          <Image
              src={user?.avatar_url}
            alt="user_img"
            className="pp"
            width={40}
            height={40}
            priority={true}
          />
          ) : (
              <div className="flex items-center justify-center w-[40px] h-[40px] bg-black rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.85 7.95A2.849 2.849 0 0 0 12 5.1a2.849 2.849 0 0 0-2.85 2.85A2.849 2.849 0 0 0 12 10.8a2.849 2.849 0 0 0 2.85-2.85Zm1.8 0A4.649 4.649 0 0 1 12 12.6a4.649 4.649 0 0 1-4.65-4.65A4.649 4.649 0 0 1 12 3.3a4.649 4.649 0 0 1 4.65 4.65ZM5.9 18.429c0 .768-.09.671.335.671h11.53c.426 0 .335.097.335-.671 0-1.893-2.778-3.029-6.1-3.029-3.322 0-6.1 1.136-6.1 3.029Zm-1.8 0c0-3.327 3.673-4.829 7.9-4.829s7.9 1.502 7.9 4.829c0 1.735-.685 2.471-2.135 2.471H6.235c-1.45 0-2.135-.736-2.135-2.471Z" /></svg>
              </div>
          )}
          <div className="rpl-usrnm">{user?.username}</div>
        </div>
        <div className="rpl-txt">{balance}</div>
      </div>
      <div className="hr"></div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rts">
          {users.map((user) => (
            <div className="rpl" key={user.id}>
              <div className="rpl-usr">
                {user?.avatar_url ? (
                  <Image
                    src={user?.avatar_url}
                    alt="user_img"
                    className="pp"
                    width={40}
                    height={40}
                    priority={true}
                  />
                ) : (
                    <div className="flex items-center justify-center w-[40px] h-[40px] bg-black rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.85 7.95A2.849 2.849 0 0 0 12 5.1a2.849 2.849 0 0 0-2.85 2.85A2.849 2.849 0 0 0 12 10.8a2.849 2.849 0 0 0 2.85-2.85Zm1.8 0A4.649 4.649 0 0 1 12 12.6a4.649 4.649 0 0 1-4.65-4.65A4.649 4.649 0 0 1 12 3.3a4.649 4.649 0 0 1 4.65 4.65ZM5.9 18.429c0 .768-.09.671.335.671h11.53c.426 0 .335.097.335-.671 0-1.893-2.778-3.029-6.1-3.029-3.322 0-6.1 1.136-6.1 3.029Zm-1.8 0c0-3.327 3.673-4.829 7.9-4.829s7.9 1.502 7.9 4.829c0 1.735-.685 2.471-2.135 2.471H6.235c-1.45 0-2.135-.736-2.135-2.471Z" /></svg>
                    </div>
                )}
                <div className="rpl-usrnm">{user.username}</div>
              </div>
              <div className="rpl-txt">{user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
