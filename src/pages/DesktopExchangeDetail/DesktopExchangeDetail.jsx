import ExchangeList from '@/components/ExchangeList/ExchangeList';
import { useLoaderData } from 'react-router-dom';
import { selectedCardStore } from '@/store/store';

export default function DesktopExchangeDetail() {
  const { selectedCard } = selectedCardStore();

  return (
    <div className="desktop:fixed desktop:right-0 desktop:top-0 desktop:h-full desktop:w-1/3 desktop:overflow-y-auto desktop:bg-white desktop:shadow-lg">
      {/* <ExchangeList photoCardData={selectedCard} /> */}
      <h1>detail</h1>
    </div>
  );
}
