"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type User = {
  id: number;
  username: string;
  balance: number;
};

export default function Rankings() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and handle loading state
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="title">
        <div className="grid"></div>
        <div className="tRow">Rankings</div>
      </div>
      <div className="header">
        <Image
          src="/rankings.jpeg"
          alt="img"
          className="hd_img"
          priority={true}
          width={495} // Placeholder values
          height={190} // Placeholder values
        />
        <div className="hd_desc">
          Put in the effort and prove your worth.
          <br />
          rank up and show them what you’re made of!
        </div>
      </div>
      <div className="pgres">Place: 3rd</div>

      <div className="mpl">
        <div className="rpl-usr">
          <Image
            src="/rankings.jpeg"
            alt="user_img"
            className="pp"
            width={40}
            height={40}
            priority={true}
          />
          <div className="rpl-usrnm">Username</div>
        </div>
        <div className="rpl-txt">#3</div>
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
                  src="/rankings.jpeg"
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
