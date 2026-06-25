import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface TeamProps {
  image: string | StaticImageData;
  name: string;
  post: string;

  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

const TeamImageCard = ({
  image,
  name,
  post,
  facebook,
  instagram,
  twitter,
  linkedin,
  youtube,
  website,
}: TeamProps) => {
  return (
    <div
      className="dz-team style-1 m-md-b0 m-sm-b0 m-b30 wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <div className="dz-media">
        <Link href="/our-team">
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            className="img-fluid"
          />
        </Link>

        <ul className="team-social-icon">
          {facebook && (
            <li>
              <Link href={facebook} target="_blank">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
          )}

          {twitter && (
            <li>
              <Link href={twitter} target="_blank">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
          )}

          {instagram && (
            <li>
              <Link href={instagram} target="_blank">
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
          )}

          {linkedin && (
            <li>
              <Link href={linkedin} target="_blank">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </li>
          )}

          {youtube && (
            <li>
              <Link href={youtube} target="_blank">
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
          )}

          {website && (
            <li>
              <Link href={website} target="_blank">
                <i className="fas fa-globe"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="dz-content">
        <h5 className="title">
          <Link href="/our-team">{name}</Link>
        </h5>

        <span>{post}</span>
      </div>
    </div>
  );
};

export default TeamImageCard;
