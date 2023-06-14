import { useEffect, useState } from "react";

async function usePost(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseJSON = await response.json();
    console.log("sukses");
    return responseJSON;
  } catch (error) {
    console.log(error, "error post");
  }
}

export default usePost;
