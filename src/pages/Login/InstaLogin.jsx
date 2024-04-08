import { Link } from 'react-router-dom';

export default function InstaLogin() {
  const REST_API_KEY = '2082061152161281';
  const REDIRECT_URI = 'https://localhost:3000/api/oauth2-redirect';
  const INSTA_AUTH_URL = `https://api.instagram.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

  return (
    <Link to={INSTA_AUTH_URL}>
      <img src="/icons/instagram.svg" />
    </Link>
  );
}
