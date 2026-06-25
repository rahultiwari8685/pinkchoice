import Link from "next/link";

import IMAGES from "../../constant/theme";
import TeamImageCard from "./TeamImageCard";

// const allteamDataItem = [
//   { image: IMAGES.Teampic1, name: "Mr. Dinesh Mishra", post: "CEO & Founder" },
//   {
//     image: IMAGES.Teampic2,
//     name: "Miss.Gatika Mishra",
//     post: "Franchise Partner",
//   },
//   {
//     image: IMAGES.Teampic3,
//     name: "Miss. Akansha Mishra",
//     post: "Customer Success",
//   },
//   { image: IMAGES.Teampic4, name: "Mr. Rahul Tiwari", post: "CTO" },
//   {
//     image: IMAGES.Teampic5,
//     name: "Mr. Rahul Tiwari",
//     post: "Backend Developer",
//   },
//   { image: IMAGES.Teampic6, name: "Miss. Shalu Mishra", post: "Designer" },
// ];

const TeamCreators = async () => {
  const sectionRes = await fetch("https://api.pinkchoice.in/api/team-section", {
    cache: "no-store",
  });

  const sectionJson = await sectionRes.json();

  const teamRes = await fetch("https://api.pinkchoice.in/api/team", {
    cache: "no-store",
  });

  const teamJson = await teamRes.json();

  const section = sectionJson.data;
  const teams = teamJson.data;

  return (
    <div className="row g-3 g-xl-4">
      <div
        className="col-xl-6 col-lg-8 col-md-12 col-sm-12 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="section-head ">
          <h2 className="title">{section.heading}</h2>
          <p>{section.description}</p>
          <Link className="btn btn-secondary me-3" href={section.buttonLink}>
            {section.buttonText}
          </Link>
        </div>
      </div>
      {teams.map((item) => (
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6"
          key={item._id}
        >
          <TeamImageCard
            image={`https://api.pinkchoice.in/uploads/team/${item.image}`}
            name={item.name}
            post={item.designation}
            facebook={item.facebook}
            instagram={item.instagram}
            linkedin={item.linkedin}
            twitter={item.twitter}
            youtube={item.youtube}
            website={item.website}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamCreators;
