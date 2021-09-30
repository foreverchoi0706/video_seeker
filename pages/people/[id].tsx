import { ReactNode } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import wrapper from "../../wrapper";
import { FaFacebook, FaInstagram, FaTwitter, FaHome } from "react-icons/fa";
/**@types */
import People from "../../types/People";
/**@reducers */
import {
  getCombinedCredits,
  getExternalIds,
  getPeople,
} from "../../reducers/video";

interface ExternalProps {
  href: string;
  children: ReactNode;
}

const External = ({ href, children }: ExternalProps) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

interface PeopleProps {
  people: People;
  externalIds: any;
}

const PeoplePage: NextPage<any> = ({ people, externalIds }: PeopleProps) => {
  return (
    <article className="flex gap-4 p-4 w-full">
      <section className="w-1/4">
        <img
          className="rounded-md"
          alt={people.name}
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${people.profile_path}`}
        />
        <div className="my-4 flex justify-around">
          {externalIds.facebook_mid && (
            <External href={`https://facebook.com/${externalIds.facebook_mid}`}>
              <FaFacebook />
            </External>
          )}
          {externalIds.facebook_id && (
            <External href={`https://facebook.com/${externalIds.facebook_id}`}>
              <FaFacebook />
            </External>
          )}
          {externalIds.twitter_id && (
            <External href={`https://twitter.com/${externalIds.twitter_id}`}>
              <FaTwitter />
            </External>
          )}
          {externalIds.instagram_id && (
            <External
              href={`https://www.instagram.com/${externalIds.instagram_id}`}
            >
              <FaInstagram />
            </External>
          )}
          {people.homepage && (
            <External href={people.homepage}>
              <FaHome />
            </External>
          )}
        </div>
        <ul>
          <li className="my-4">
            <strong>Known For</strong>
            <div className="pl-2">{people.known_for_department}</div>
          </li>
          <li className="my-4">
            <strong>Known Credits</strong>
          </li>
          <li className="my-4">
            <strong>Gender</strong>
            <div className="pl-2">{people.gender === 1 ? "FEMAL" : "MALE"}</div>
          </li>
          <li className="my-4">
            <strong>Birthday</strong>
            <div className="pl-2">{people.birthday}</div>
          </li>
          <li className="my-4">
            <strong>Place of Birth</strong>
            <div className="pl-2">{people.place_of_birth}</div>
          </li>
          <li className="my-4">
            <strong>Also Known As</strong>
            <ul className="pl-2">
              {people.also_known_as.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      <section className="w-3/4">
        <h2 className="text-3xl my-6 font-bold">{people.name}</h2>
        <div>
          <h3 className="font-bold">Biography</h3>
          <div className="text-sm">{people.biography}</div>
        </div>

        <div>
          <h3 className="font-bold">Known For</h3>
        </div>

        <div>
          <h3 className="font-bold">Acting</h3>
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    await Promise.all([
      store.dispatch(getPeople(id!.toString())),
      store.dispatch(getExternalIds(id!.toString())),
      store.dispatch(getCombinedCredits(id!.toString())),
    ]);

    const { people, externalIds, combinedCredits } = store.getState().video;

    return {
      props: {
        people,
        externalIds,
        combinedCredits,
      },
    };
  }
);

export default PeoplePage;
