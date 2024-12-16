"use client";

import { useState, useEffect } from "react";
import { useInitData } from "@/app/contexts/initData";
import Spinner from "@/app/components/spinner";

type User = {
  id: number;
  tg_id: bigint;
  name: string;
  balance: number;
  friends: number;
  authDate: Date;
};

type RankedUser = User & { rank: number };

export default function Ranking() {
  const [users, setUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useInitData();
  const [name, setName] = useState("Unkown");
  const [myRank, setMyRank] = useState(0);

  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user?.name);
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users`);
        if (!res.ok) throw new Error("Unable to fetch users");

        // const fetchedUsers: RankedUser[] = res as RankedUser[];
        const fetchedUsers: RankedUser[] = await res.json();
        // const wBalUsers = fetchedUsers.filter((u) => u.balance !== 0)

        // Step 2: Sort users by balance (descending) and authDate (ascending)
        const sortedUsers = fetchedUsers.sort((a, b) => {
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
        const topUsers = finalRankedUsers.slice(0, 150)
        setUsers(topUsers);

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
  }, []);

  const thdSprt = (balance: number) => {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const allSprt = (bal: number) => {
    if (bal >= 10000000) {
      return `${bal.toString().slice(0, 2)}.${bal.toString().slice(3, 4)}M`
    }
    else if (bal >= 1000000) {
      return `${bal.toString().slice(0, 1)}.${bal.toString().slice(2, 4)}M`
    }
    else if (bal >= 100000) {
      return `${bal.toString().slice(0, 3)}.${bal.toString().slice(4, 5)}k`
    }
    else {
      return bal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
  };

  const showBal = (id: number | bigint) => {
    const div = document.getElementById(`userBal-${id}`);
    if (div?.classList.contains("opacity-0")) {
      div.classList.remove("opacity-0");
      return div.classList.add("opacity-1");
    }
    else {
      div?.classList.remove("opacity-1");
      return div?.classList.add("opacity-0");
    }
  };

  return (
    <>
      <div className="uppercase font-HitConBlk text-3xl text-center">Top 150</div>
      <div className="uppercase font-HitConBlk text-[#888888] text-[13px] text-center mt-[-5px] mb-5">Ranked soldiers</div>

      {loading ? (
        <Spinner />
      ) : (
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="w-[80px] text-left py-0">Position</th>
                <th className="text-left py-0">Name</th>
                <th className="text-center w-[80px] py-0">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1c1c1c99] backdrop-blur-sm">
                <td className="text-left">
                  {myRank} <span className="text-[13px] ml-2 p-[2px] py-0 bg-[#FFD700] text-black">You</span>
                </td>
                <td>{name}</td>
                {user?.balance !== undefined ? (
                  user?.balance >= 100000 ? (
                    <td className="text-center relative" onClick={() => showBal(user?.tg_id)}>
                      <span id={`userBal-${user?.tg_id}`} className="absolute opacity-0 w-full text-right right-[68px] text-[#494949]">{thdSprt(user?.balance)} -</span> <span className="cursor-pointer">{allSprt(user?.balance)}</span>
                    </td>
                  ) : (
                    <td className="text-center relative">
                      <span id={`userBal-${user?.tg_id}`} className="absolute opacity-0 w-full text-right right-[68px] text-[#494949]">{thdSprt(user?.balance)} -</span> <span className="cursor-pointer">{allSprt(user?.balance)}</span>
                    </td>
                  )
                ) : (
                  <td className="text-center">0</td>
                )}
              </tr>
              {users.map((user) => (
                <tr key={user.id} className={`bg-[#1c1c1c99] backdrop-blur-sm ${user.rank === 1 ? "text-[#FFD700]" : ""}${user.rank === 2 ? "text-[#c0c0c0] " : ""}${user.rank === 3 ? "text-[#CD7F32]" : ""}`}>
                  <td className="text-left">{user.rank}</td>
                  <td>{user.name}</td>
                  <td className="text-center relative" onClick={user.balance >= 100000 ? () => showBal(user.id) : () => ""}>
                    <span id={`userBal-${user.id}`} className="absolute opacity-0 w-full text-right right-[68px] text-[#494949]">{thdSprt(user.balance)} -</span> <span className="cursor-pointer">{allSprt(user.balance)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </>
  );
}
