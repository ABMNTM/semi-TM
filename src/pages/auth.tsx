import Login from "@cmp/forms/Login";
import SignUp from "@cmp/forms/SignUp";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@sty/Auth.module.css";
import { useState } from "react";

export default function Home() {
  const [toggle, setToggle] = useState(false);

  const HandleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const mainForm = !toggle ? (
    <Login onToggle={HandleToggle} />
  ) : (
    <SignUp onToggle={HandleToggle} />
  );

  return (
    <>
      <Head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>احراز هویت | تسکولو</title>
      </Head>
      <main className={styles.main}>
        <div className={styles["aside"]}>
          <h3 className={styles.header3}>برنامه امروزتون چیه؟</h3>
          <h5 className={styles.header5}>وقتشه کارو شروع کنیم</h5>
        </div>
        <div className={styles.alongmain}>
          <Link id={styles.logo} href={"/"}>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src="/assets/taskulu-fa-blue.svg" alt="taskulu logo" />
          </Link>
          <div className={styles["auth-container"]}>
            {mainForm}
            <div className={styles["OAuth-group"]}>
              <Link className={styles.googleContainer} href={"/oauth1"}>
                <div className={styles.google}>
                  اتصال با گوگل
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35"
                    viewBox="0 0 24 24"
                    width="35"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                </div>
              </Link>
              <Link href={"/oauth2"}>
                <div className={styles.github}>
                  اتصال با گیت هاب
                  <Image
                    src="/assets/github-mark-white.svg"
                    alt="github"
                    width={35}
                    height={35}
                  ></Image>
                </div>
              </Link>
            </div>
            <div className={styles.forgetPassword}>
              <Link href={"/forget-password"}>فراموشی گذرواژه</Link>
            </div>
            <div className={styles.callUs}>
              <Link href={"/support"}>پشتیبانی</Link> |{" "}
              <Link href={"/"}>Taskulu</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
