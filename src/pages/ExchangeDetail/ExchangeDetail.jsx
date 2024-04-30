import ExchangeList from '@/components/ExchangeList/ExchangeList';
import { useLoaderData } from 'react-router-dom';

export default function ExchangeDetail() {
  // @ts-ignore
  const { photoCardData } = useLoaderData();
  return (
    <>
      <div className=" desktop:hidden">
        <ExchangeList photoCardData={photoCardData} />
      </div>
      <div className="bg-blue-400 ">
        <ExchangeList photoCardData={photoCardData} />
      </div>
    </>
  );
}
