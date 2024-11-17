"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/app/contexts/user";
import Header from "@/app/components/header";
import rnkimg from "@/public/ranking.jpeg";
import { useLayout } from "@/app/contexts/layoutCon";

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
  const userInfo = useContext(UserContext)
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
          <div className="rpl-usrnm">{userInfo?.user?.username}</div>
        </div>
        <div className="rpl-txt">{userInfo?.user?.authDate.toLocaleDateString()}</div>
      </div>
      <div className="hr"></div>
      {loading ? (
        <div className="flex mt-5 justify-center">
          <svg
            className="spinner"
            height="100%"
            viewBox="0 0 32 32"
            width="100%"
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="10"
              strokeWidth="2"
              style={{ stroke: "rgb(255, 255, 255)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="10"
              strokeWidth="2"
              style={{
                stroke: "rgb(255, 255, 255)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>
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
