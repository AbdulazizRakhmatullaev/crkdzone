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

  useEffect(() => {
    setFullHeight(false);
  }, [setFullHeight]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users?tg_id=${user?.tg_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  }, []);

  return (
    <>
      <Header
        img_src={rnkimg}
        title="Ranking"
        desc="Push hard, give it everything you’ve got, and don’t let up until the job’s done! Earn your stripes and make ‘em remember your name in the heat of battle. Prove you belong out here, where only the toughest survive!"
        res={`Place: ${3}`}
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
            <svg className="w-[40px] h-[40px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 8.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm-3.5 1.7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 2.1A9.872 9.872 0 0 0 5 5a9.872 9.872 0 0 0-2.9 7c0 2.733 1.11 5.21 2.9 7a9.872 9.872 0 0 0 7 2.9c2.733 0 5.21-1.11 7-2.9a9.872 9.872 0 0 0 2.9-7c0-2.734-1.11-5.21-2.9-7a9.872 9.872 0 0 0-7-2.9Zm4.382 16.713A7.067 7.067 0 0 0 12 17.3a7.066 7.066 0 0 0-4.382 1.513A8.06 8.06 0 0 0 12 20.1a8.06 8.06 0 0 0 4.382-1.287ZM6.272 6.273A8.072 8.072 0 0 1 12 3.9c2.237 0 4.26.906 5.727 2.372A8.072 8.072 0 0 1 20.1 12a8.07 8.07 0 0 1-2.297 5.651A8.868 8.868 0 0 0 12 15.5a8.869 8.869 0 0 0-5.803 2.151A8.07 8.07 0 0 1 3.9 12c0-2.237.906-4.26 2.372-5.728ZM8.5 10.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM12 8.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z" clipRule="evenodd" /></svg>
          )}
          <div className="rpl-usrnm">{user?.username}</div>
        </div>
        <div className="rpl-txt">{user?.balance}</div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 8.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm-3.5 1.7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 2.1A9.872 9.872 0 0 0 5 5a9.872 9.872 0 0 0-2.9 7c0 2.733 1.11 5.21 2.9 7a9.872 9.872 0 0 0 7 2.9c2.733 0 5.21-1.11 7-2.9a9.872 9.872 0 0 0 2.9-7c0-2.734-1.11-5.21-2.9-7a9.872 9.872 0 0 0-7-2.9Zm4.382 16.713A7.067 7.067 0 0 0 12 17.3a7.066 7.066 0 0 0-4.382 1.513A8.06 8.06 0 0 0 12 20.1a8.06 8.06 0 0 0 4.382-1.287ZM6.272 6.273A8.072 8.072 0 0 1 12 3.9c2.237 0 4.26.906 5.727 2.372A8.072 8.072 0 0 1 20.1 12a8.07 8.07 0 0 1-2.297 5.651A8.868 8.868 0 0 0 12 15.5a8.869 8.869 0 0 0-5.803 2.151A8.07 8.07 0 0 1 3.9 12c0-2.237.906-4.26 2.372-5.728ZM8.5 10.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM12 8.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z" clipRule="evenodd" /></svg>
                )}
                <div className="rpl-usrnm">{user.username}</div>
              </div>
              <div className="rpl-txt">{user.balance}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
