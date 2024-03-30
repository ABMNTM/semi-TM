import axios from "axios";
import { SlowBuffer } from "buffer";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";

interface SignUpProp {
  username: string;
  email: string;
  password: string;
}

const signup = async (data: SignUpProp) => {
  axios.post(DOMAIN + "/token/obtain/", data).then((response) => {
    redirect(response, 201);
  });
};
