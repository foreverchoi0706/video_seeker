import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();

  return <div>{router.query.id}</div>;
};

export default Detail;
