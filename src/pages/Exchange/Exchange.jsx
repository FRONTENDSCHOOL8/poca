import BiasContainer from '@/components/BiasContainer/BiasContainer';
import PhocaContainerEx from '@/components/PhocaContainer/PhocaContainerEx';
import SearchBar from '@/components/SearchBar/SearchBar';
import { globalState } from '@/store/store';
import { useLoaderData } from 'react-router';

export default function Exchange() {
  const photoCardsData = useLoaderData();
  const { init } = globalState();
  const filterData = photoCardsData.filter((item) => {
    if (item.groupName === init) return true;
  });
  const biasData = filterData[0].expand.photoCards;

  return (
    <div className="exchange-page pt-75pxr text-center">
      <SearchBar name="Exchange" placeholder="포카찾기" bgStyle="bg-white" />
      <div className="mx-auto mt-20pxr w-fit">
        <BiasContainer photoCardsData={photoCardsData} />
      </div>
      <PhocaContainerEx biasData={biasData} />
    </div>
  );
}
