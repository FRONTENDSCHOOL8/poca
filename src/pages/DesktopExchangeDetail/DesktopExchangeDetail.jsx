// import ExchangeList from '@/components/ExchangeList/ExchangeList';

export default function DesktopExchangeDetail({ close }) {
  return (
    <div className="z-50 desktop:fixed desktop:right-0 desktop:top-0 desktop:h-full desktop:w-2/3 desktop:overflow-y-auto desktop:bg-white desktop:shadow-lg">
      <button
        onClick={close}
        className="absolute left-5 top-5 p-2 text-xl font-bold text-gray-500"
        aria-label="Close"
      >
        {'>>'}
      </button>

      <h1>detail</h1>
    </div>
  );
}
