import styles from "./styles.module.scss";

export default function User() {
//   const { data: session } = useSession();
  return (
    <div className={styles.user}>
      {/* <div className={styles.user_container}>
        {session ? (
          <div className={styles.user_info}>
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
}
