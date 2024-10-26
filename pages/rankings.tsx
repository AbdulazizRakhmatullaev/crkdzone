// import { useState, useEffect } from "react";
import Image from "next/image";

// type User = {
//   id: number;
//   username: string;
//   balance: number;
// };
//
export default function Rankings() {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //
  //   fetch('http://localhost:8080/api/users')
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.error("Error fetching users:", error))
  // }, []);

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
          priority={false}
          loading="lazy"
          decoding="async"
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
          />
          <div className="rpl-usrnm">Username</div>
        </div>
        <div className="rpl-txt">#3</div>
      </div>

      <div className="hr"></div>

      {/* <div className="rts"> */}
      {/*   {users.map((user) => ( */}
      {/*     <div className="rpl" key={user.id}> */}
      {/*       <div className="rpl-usr"> */}
      {/*         <Image src="/rankings.jpeg" alt='user_img' className="pp" width={40} height={40}/> */}
      {/*         <div className="rpl-usrnm">{user.username}</div> */}
      {/*       </div> */}
      {/*       <div className="rpl-txt">{user.balance}</div> */}
      {/*     </div> */}
      {/*   ))} */}
      {/**/}
      {/* </div> */}
    </>
  );
}
