export default function NumberOfExchangeList({ exchangeListData }) {
  return (
    <div className="mx-auto mt-2 w-10/12 self-start border-t border-primary pt-5">
      <span className="text-b04 font-b04 leading-7 text-gray500">
        {exchangeListData ? exchangeListData.length : 0}
      </span>
      <span className=" pl-1 text-b04 font-b04 leading-7 text-gray400">
        개의 교환 글
      </span>
    </div>
  );
}
