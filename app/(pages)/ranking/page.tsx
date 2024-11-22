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

type RankedUser = User & { league: string, rank: number };

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
  const [reqs, setReqs] = useState("from 0");

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
        const otherUsers = fetchedUsers.filter((u) => u.tg_id !== user?.tg_id);
        const usersWithLeague = otherUsers.map((u) => ({
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
            .sort((a, b) => b.balance - a.balance || new Date(a.authDate).getTime() - new Date(b.authDate).getTime());

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
        setUsers(rankedUsers);

        // Determine user's league and calculate rank within their league
        const myLeague = user?.balance
          ? user.balance > 50000
            ? "Diamond"
            : user.balance > 25000
              ? "Gold"
              : user.balance > 10000
                ? "Silver"
                : "Bronze"
          : "Bronze";

        setMyLeague(myLeague);

        const myLeagueUsers = rankedUsers.filter((u) => u.league === myLeague);
        const sortedMyLeagueUsers = [...myLeagueUsers].sort(
          (a, b) =>
            b.balance - a.balance ||
            new Date(a.authDate).getTime() - new Date(b.authDate).getTime()
        );

        const myRank =
          sortedMyLeagueUsers.findIndex((u) => u.tg_id === user?.tg_id) + 1;

        setUserRank(myRank);
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
          setFilteredUsers(users.filter((u) => u.balance >= 0 && u.balance <= 25000));
          setReqs("from 0");
          break;
        case "Silver":
          setFilteredUsers(users.filter((u) => u.balance > 25000 && u.balance <= 100000));
          setReqs("from 25k");
          break;
        case "Gold":
          setFilteredUsers(users.filter((u) => u.balance > 100000 && u.balance <= 250000));
          setReqs("from 100k");
          break;
        case "Diamond":
          setFilteredUsers(users.filter((u) => u.balance > 250000));
          setReqs("from 250k");
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
          <div>
            <div
              className="flex mb-5 w-full overflow-x-auto"
            >
            {["Bronze", "Silver", "Gold", "Diamond"].map((tab) => (
              <div
                key={tab}
                className="flex flex-col items-center w-full"
              >
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`tab w-full uppercase font-HitConBlk flex items-center justify-center gap-1 grow ${activeTab === tab ? "actab" : ""}`}
                >
                  {tab}
                  {tab === myLeague ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.475 2.022a.594.594 0 0 1 1.06 0l1.74 3.397L14 6.011a.589.589 0 0 1 .473.413.589.589 0 0 1-.16.61l-2.658 2.49s.378 2.536.615 4.088a.578.578 0 0 1-.246.575.592.592 0 0 1-.624.039l-3.395-1.82s-2.1 1.122-3.414 1.826a.583.583 0 0 1-.615-.037.597.597 0 0 1-.255-.572c.227-1.551.596-4.099.596-4.099s-1.599-1.507-2.63-2.492a.586.586 0 0 1-.16-.608A.585.585 0 0 1 2 6.013l3.735-.594 1.74-3.397Z" clipRule="evenodd" /></svg>
                  ) : null}
                </button>
                <div className={`text-xs mt-2 ${activeTab !== tab ? ("text-black") : ("")}`}>
                    {reqs}
                </div>
              </div>
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
                  <div className="lg text-xs uppercase text-[#959595]">level • {myLeague}</div>
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
