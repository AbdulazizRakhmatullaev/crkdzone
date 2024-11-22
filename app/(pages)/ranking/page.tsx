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
  firstName: string;
  pic: string;
  balance: number;
  friends: number;
  authDate: Date;
};

type RankedUser = User & { rank: number };

export default function Ranking() {
  const [users, setUsers] = useState<RankedUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { setFullHeight } = useLayout();
  const [firstName, setFirstName] = useState("Name");
  const [userRank, setUserRank] = useState(0);
  const [balance, setBalance] = useState("0");
  const [activeTab, setActiveTab] = useState("Bronze");
  const [myLeague, setMyLeague] = useState("Bronze");

  useEffect(() => {
    setFullHeight(false);
  }, [setFullHeight]);

  useEffect(() => {
    if (user?.firstName !== undefined) {
      setFirstName(user?.firstName);
    }
    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }
  }, [user?.firstName, user?.balance]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users`);
        if (!res.ok) throw new Error("Unable to fetch users");

        const fetchedUsers: RankedUser[] = await res.json();

        const usersWithLeague = fetchedUsers.map((u) => ({
          ...u,
          league:
            u.balance > 50000
              ? "Diamond"
              : u.balance > 25000
                ? "Gold"
                : u.balance > 10000
                  ? "Silver"
                  : "Bronze",
        }));

        // Group users by league
        const leagues = ["Bronze", "Silver", "Gold", "Diamond"];
        const rankedUsers: RankedUser[] = [];
        leagues.forEach((league) => {
          const usersInLeague = usersWithLeague
            .filter((u) => u.league === league)
            .sort((a, b) => b.balance - a.balance || new Date(a.authDate).getTime() - new Date(b.authDate).getTime()); // Sort within league

          // Assign ranks within the league
          usersInLeague.forEach((user, index) => {
            if (index === 0) {
              rankedUsers.push({ ...user, rank: 1 });
            } else {
              const prevUser = usersInLeague[index - 1];
              const rank =
                user.balance === prevUser.balance &&
                  new Date(user.authDate).getTime() === new Date(prevUser.authDate).getTime()
                  ? prevUser.rank
                  : index + 1;

              rankedUsers.push({ ...user, rank });
            }
          });
        });

        const myRankedUser = rankedUsers.find((u) => u.tg_id === user?.tg_id);
        
        setUsers(rankedUsers);
        setUserRank(myRankedUser ? myRankedUser.rank : 0);

        if (user?.balance !== undefined) {
          if (user?.balance >= 0 && user?.balance <= 10000) {
            setMyLeague("Bronze")
          } else if (user?.balance > 10000 && user?.balance <= 25000) {
            setMyLeague("Silver")
          } else if (user?.balance > 25000 && user?.balance <= 50000) {
            setMyLeague("Gold")
          } else if (user?.balance > 50000) {
            setMyLeague("Diamond")
          }
        }
      } catch (e) {
        console.error("Failed to fetch users", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.tg_id, user?.balance]);

  useEffect(() => {
    const filterByTab = () => {
      switch (activeTab) {
        case "Bronze":
          setFilteredUsers(users.filter((u) => u.balance >= 0 && u.balance <= 10000));
          break;
        case "Silver":
          setFilteredUsers(users.filter((u) => u.balance > 10000 && u.balance <= 25000));
          break;
        case "Gold":
          setFilteredUsers(users.filter((u) => u.balance > 25000 && u.balance <= 50000));
          break;
        case "Diamond":
          setFilteredUsers(users.filter((u) => u.balance > 50000));
          break;
        default:
          setFilteredUsers(users);
      }
    };
    filterByTab();
  }, [activeTab, users]);

  return (
    <>
      <Header
        img_src={rnkimg}
        title="Ranking"
        desc="Push hard, give it everything you’ve got, and don’t let up until the job’s done! Earn your stripes and make ‘em remember your name in the heat of battle. Prove you belong out here, where only the toughest survive!"
      />

      {loading ? (
        <div className="mt-5">
          <Spinner />
        </div>
      ) : (
        <div className="">
          <div className="flex mb-5 w-full">
            {["Bronze", "Silver", "Gold", "Diamond"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab flex items-center justify-center gap-1 grow ${activeTab === tab ? "actab" : ""}`}
              >
                {tab}
                {tab === myLeague ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px]" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.9 2.998a.9.9 0 0 1 .9.9v.515l8.733 4.798a.9.9 0 0 1 0 1.578L8.8 15.587v5.515a.9.9 0 1 1-1.8 0V3.898a.9.9 0 0 1 .9-.9Z" /></svg>
                ) : ("")}
              </button>
            ))}
          </div>

          <div className="mpl mb-[15px]">
            <div className="rpl-usr">
              <div className="uspic relative text-xs">
                {user?.pic ? (
                  <Image
                    src={user?.pic}
                    alt="userpic"
                    className="pp"
                    width={50}
                    height={50}
                    priority={true}
                  />
                ) : (
                  <div className="flex items-center justify-center w-[50px] h-[50px] bg-black rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[28px] h-[28px]" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.85 7.95A2.849 2.849 0 0 0 12 5.1a2.849 2.849 0 0 0-2.85 2.85A2.849 2.849 0 0 0 12 10.8a2.849 2.849 0 0 0 2.85-2.85Zm1.8 0A4.649 4.649 0 0 1 12 12.6a4.649 4.649 0 0 1-4.65-4.65A4.649 4.649 0 0 1 12 3.3a4.649 4.649 0 0 1 4.65 4.65ZM5.9 18.429c0 .768-.09.671.335.671h11.53c.426 0 .335.097.335-.671 0-1.893-2.778-3.029-6.1-3.029-3.322 0-6.1 1.136-6.1 3.029Zm-1.8 0c0-3.327 3.673-4.829 7.9-4.829s7.9 1.502 7.9 4.829c0 1.735-.685 2.471-2.135 2.471H6.235c-1.45 0-2.135-.736-2.135-2.471Z" /></svg>
                  </div>
                )}
                <div className="pl absolute right-[-5px] bottom-0 bg-black p-1 text-xs rounded-full h-[20px] w-[20px] flex items-center justify-center">
                  {userRank}
                </div>
              </div>
                <div className="rpl-usrnm">
                  <div className="fn">
                    {firstName}
                  </div>
                  <div className="lg text-xs text-[#959595]">You • {myLeague}</div>
                </div>
              </div>
              <div className="rpl-txt">{balance}</div>
            </div>
            <div className="rts">
              {filteredUsers.map((user) => (
                <div className="rpl" key={user.id}>
                  <div className="rpl-usr">
                    <div className="uspic relative">
                      {user?.pic ? (
                        <Image src={user?.pic} alt="userpic" className="pp w-[50px] h-[50px]" width={50} height={50} priority={true} />
                      ) : (
                        <div className="flex items-center justify-center w-[50px] h-[50px] bg-black rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="..." />
                          </svg>
                        </div>
                      )}
                      <div className="pl absolute right-[-5px] bottom-0 bg-black p-1 text-xs rounded-full h-[20px] w-[20px] flex items-center justify-center">
                        {user.rank}
                      </div>
                    </div>
                    <div className="rpl-usrnm">{user.firstName}</div>
                  </div>
                  <div className="rpl-txt">{user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
                </div>
              ))}
            </div>
        </div>
      )}
    </>
  );
}
