export async function basicFetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export async function loginFetcher(
  url: string,
  { arg }: { arg: { username: string; password: string } }
) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: arg.username,
      password: arg.password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  })
    .then((res) => res.json())
    .catch((err) => err.json());
}
