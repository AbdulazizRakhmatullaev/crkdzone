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
        const res = await fetch("/api/users");
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
          <Image
            src="/ranking.jpeg"
            alt="user_img"
            className="pp"
            width={40}
            height={40}
            priority={true}
          />
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
                <Image
                  src={rnkimg}
                  alt="user_img"
                  className="pp"
                  width={40}
                  height={40}
                />
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
