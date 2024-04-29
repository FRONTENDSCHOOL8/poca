export default function ArtistLogo({ logoImgSrc, groupName, logoImgClass }) {
  return (
    <img src={logoImgSrc} alt={`${groupName} 로고`} className={logoImgClass} />
  );
}
