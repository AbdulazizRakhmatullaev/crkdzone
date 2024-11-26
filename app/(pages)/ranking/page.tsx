"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import { useInitData } from "@/app/contexts/initData";
import Spinner from "@/app/components/spinner";

type User = {
  id: number;
  tg_id: bigint;
  firstName: string;
  pic: string;
  balance: number;
  friends: number;
  authDate: Date;
};

type RankedUser = User & { rank: number };

export default function Ranking() {
  const [users, setUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useInitData();
  const [firstName, setFirstName] = useState("Name");
  const [myRank, setMyRank] = useState(0);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (user?.firstName !== undefined) {
      setFirstName(user?.firstName);
    }
    if (user?.balance !== undefined) {
      setBalance(
        user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
      );
    }
  }, [user?.firstName, user?.balance]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users`);
        if (!res.ok) throw new Error("Unable to fetch users");

        const fetchedUsers: RankedUser[] = await res.json();
        const wBalUsers = fetchedUsers.filter((u) => u.balance !== 0)

        // Step 2: Sort users by balance (descending) and authDate (ascending)
        const sortedUsers = wBalUsers.sort((a, b) => {
          if (a.balance !== b.balance) {
            return b.balance - a.balance;
          }
          return new Date(a.authDate).getTime() - new Date(b.authDate).getTime(); // Earlier authDate first
        });

        // Step 3: Assign ranks based on sorted order
        const rankedUsers = sortedUsers.map((u, index, arr) => {
          if (index === 0) {
            return { ...u, rank: 1 }; // First user gets rank 1
          }

          const previousUser = arr[index - 1];
          // If balance and authDate match, assign the same rank
          if (
            u.balance === previousUser.balance &&
            new Date(u.authDate).getTime() === new Date(previousUser.authDate).getTime()
          ) {
            return { ...u, rank: previousUser.rank };
          }

          // Otherwise, assign a rank based on the current index
          return { ...u, rank: index + 1 };
        });

        // Step 4: Sort by rank for consistent display
        const finalRankedUsers = [...rankedUsers].sort((a, b) => a.rank - b.rank);
        setUsers(finalRankedUsers);

        // Step 5: Determine the current user's rank from the original data
        const myRank = fetchedUsers
          .sort((a, b) => {
            if (a.balance !== b.balance) {
              return b.balance - a.balance;
            }
            return new Date(a.authDate).getTime() - new Date(b.authDate).getTime();
          })
          .findIndex((u) => u.tg_id === user?.tg_id) + 1;

        setMyRank(myRank);
      } catch (e) {
        console.error("Failed to fetch users", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.tg_id, user?.balance]);

  return (
    <>
      <Header
        title="Ranking"
        desc="Push hard, give it everything you’ve got, and don’t let up until the job’s done! Earn your stripes and make ‘em remember your name in the heat of battle. Prove you belong out here, where only the toughest survive!"
      />

      {loading ? (
        <div className="mt-5">
          <Spinner />
        </div>
      ) : (
          <div>
            <div className="pl-[10px] pb-[10px] text-[#959595]">Me</div>
            <div className="mpl border border-[#cecece] dvb mb-[15px]">
              <div className="rpl-usr">
                <div className="uspic relative border-solid border border-[#2D2D2D] rounded-full">
                  {user?.pic ? (
                    <Image
                      src={user?.pic}
                      alt="userpic"
                      className="pp w-[45px] h-[45px]"
                      width={45}
                      height={45}
                      priority={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-[45px] h-[45px] bg-black rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[28px] h-[28px]"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.85 7.95A2.849 2.849 0 0 0 12 5.1a2.849 2.849 0 0 0-2.85 2.85A2.849 2.849 0 0 0 12 10.8a2.849 2.849 0 0 0 2.85-2.85Zm1.8 0A4.649 4.649 0 0 1 12 12.6a4.649 4.649 0 0 1-4.65-4.65A4.649 4.649 0 0 1 12 3.3a4.649 4.649 0 0 1 4.65 4.65ZM5.9 18.429c0 .768-.09.671.335.671h11.53c.426 0 .335.097.335-.671 0-1.893-2.778-3.029-6.1-3.029-3.322 0-6.1 1.136-6.1 3.029Zm-1.8 0c0-3.327 3.673-4.829 7.9-4.829s7.9 1.502 7.9 4.829c0 1.735-.685 2.471-2.135 2.471H6.235c-1.45 0-2.135-.736-2.135-2.471Z" />
                      </svg>
                    </div>
                  )}
                  <div className={`pl absolute right-[-5px] border-solid border border-[#2D2D2D] bottom-0 text-xs rounded-full h-[20px] w-[20px] flex items-center justify-center ${myRank === 1 ? "bg-[#FFD700] text-black" : ""} ${myRank === 2 ? "bg-[#c0c0c0] text-black" : ""} ${myRank === 3 ? "bg-[#CD7F32] text-black" : ""} ${myRank > 3 ? "bg-black" : ""}`}>
                    {myRank}
                  </div>
                </div>
                <div className="rpl-usrnm">
                  <div className="fn">{firstName}</div>
                </div>
              </div>
              <div className="rpl-txt">{balance}</div>
            </div>

            <div className="p-[10px] text-[#959595]">Top 100</div>
            <div className="rts">
              {users.map((user) => (
                <div className="rpl dv" key={user.id}>
                  <div className="rpl-usr">
                    <div className="uspic relative border-solid border border-[#2D2D2D] rounded-full">
                      {user?.pic && user?.pic.startsWith("https://t.me/") ? (
                        <Image
                          src={user?.pic}
                          alt="userpic"
                            className="pp w-[45px] h-[45px]"
                            width={50}
                            height={50}
                            priority={true}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-[45px] h-[45px] bg-black rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-[28px] h-[28px]"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.85 7.95A2.849 2.849 0 0 0 12 5.1a2.849 2.849 0 0 0-2.85 2.85A2.849 2.849 0 0 0 12 10.8a2.849 2.849 0 0 0 2.85-2.85Zm1.8 0A4.649 4.649 0 0 1 12 12.6a4.649 4.649 0 0 1-4.65-4.65A4.649 4.649 0 0 1 12 3.3a4.649 4.649 0 0 1 4.65 4.65ZM5.9 18.429c0 .768-.09.671.335.671h11.53c.426 0 .335.097.335-.671 0-1.893-2.778-3.029-6.1-3.029-3.322 0-6.1 1.136-6.1 3.029Zm-1.8 0c0-3.327 3.673-4.829 7.9-4.829s7.9 1.502 7.9 4.829c0 1.735-.685 2.471-2.135 2.471H6.235c-1.45 0-2.135-.736-2.135-2.471Z" />
                            </svg>
                          </div>
                        )}
                        <div className={`pl absolute right-[-5px] bottom-0 border-solid border border-[#2D2D2D] p-1 text-xs rounded-full h-[20px] w-[20px] flex items-center justify-center ${user.rank === 1 ? "bg-[#FFD700] text-black" : ""} ${user.rank === 2 ? "bg-[#c0c0c0] text-black" : ""} ${user.rank === 3 ? "bg-[#CD7F32] text-black" : ""} ${user.rank > 3 ? "bg-black" : ""}`}>
                          {user.rank}
                        </div>
                      </div>
                      <div className="rpl-usrnm">{user.firstName}</div>
                    </div>
                    <div className="rpl-txt">
                      {user.balance
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </div>
                  </div>
                ))}
            </div>
        </div>
      )}
    </>
  );
}
