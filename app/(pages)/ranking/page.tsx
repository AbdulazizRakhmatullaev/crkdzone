"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/header";
import { useInitData } from "@/app/contexts/initData";
import Spinner from "@/app/components/spinner";

type User = {
  id: number;
  tg_id: bigint;
  firstName: string;
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

  useEffect(() => {
    if (user?.firstName !== undefined) {
      setFirstName(user?.firstName);
    }

    const fetchUsers = async () => {
      try {
        // const res = await fetch(`/api/users`);
        // if (!res.ok) throw new Error("Unable to fetch users");

        const res = [
          {
            id: user?.id,
            tg_id: user?.tg_id,
            firstName: user?.firstName,
            balance: user?.balance,
            friends: user?.friends,
            authDate: user?.authDate
          },
          {
            id: 23,
            tg_id: BigInt(129372),
            firstName: "user 124",
            balance: 99999,
            friends: 0,
            authDate: new Date()
          },
          {
            id: 22,
            tg_id: BigInt(129372),
            firstName: "user 2",
            balance: 100,
            friends: 0,
            authDate: new Date()
          },
          {
            id: 3,
            tg_id: BigInt(129372),
            firstName: "user 3",
            balance: 1020,
            friends: 0,
            authDate: new Date()
          },
          {
            id: 4,
            tg_id: BigInt(129372),
            firstName: "user ",
            balance: 102240,
            friends: 0,
            authDate: new Date()
          },
          {
            id: 5,
            tg_id: BigInt(129372),
            firstName: "user 5",
            balance: 1200200,
            friends: 0,
            authDate: new Date()
          },
        ]

        const fetchedUsers: RankedUser[] = res as RankedUser[];
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
      <Header
        title="Ranking"
        desc="Put in the effort and prove your worth. Rank up and show them what you’re made of. Where only the toughest survive!"
      />

      {loading ? (
        <Spinner />
      ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[80px] text-left">Position</th>
                <th className="text-left">Name</th>
                <th className="text-center w-[80px]">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#161616]">
                <td className="text-left">
                  {myRank} <span className="text-[13px] ml-2 p-[2px] py-0 bg-[#FFD700] text-black">You</span>
                </td>
                <td>{firstName}</td>
                {user?.balance !== undefined ? (
                  <td className="text-center relative" onClick={user?.balance >= 100000 ? () => showBal(user?.tg_id) : () => ""}>
                    <span id={`userBal-${user?.tg_id}`} className="absolute opacity-0 w-full text-right right-[68px] text-[#494949]">{thdSprt(user?.balance)} -</span> <span className="cursor-pointer">{allSprt(user?.balance)}</span>
                  </td>
                ) : null}
              </tr>
              {users.map((user) => (
                <tr key={user.id} className={`bg-[#161616] border-t-[8px] border-black ${user.rank === 1 ? "text-[#FFD700]" : ""}${user.rank === 2 ? "text-[#c0c0c0] " : ""}${user.rank === 3 ? "text-[#CD7F32]" : ""}`}>
                  <td className="text-left">{user.rank}</td>
                  <td>{user.firstName}</td>
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
