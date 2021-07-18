import { useRouter } from "next/router";

const Video = () => {
  const router = useRouter();

  return <div>{router.query.id}</div>;
};

export default Video;
