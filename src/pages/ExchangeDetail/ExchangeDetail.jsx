import ExchangeList from '@/components/ExchangeList/ExchangeList';
import { useLoaderData } from 'react-router-dom';

export default function ExchangeDetail() {
  // @ts-ignore
  const { photoCardData } = useLoaderData();
  return (
    <>
      <div>
        <ExchangeList photoCardData={photoCardData} />
      </div>
    </>
  );
}
