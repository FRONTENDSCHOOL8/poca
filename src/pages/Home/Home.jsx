import Carousel from '@/components/Carousel/Carousel';
import VerticalCarousel from '@/components/Carousel/VerticalCarousel';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import ImageLink from '@/components/ImageLink/ImageLink';
import MainCardContainer from '@/components/MainCardContainer/MainCardContainer';
import { isLogin } from '@/store/store';
import PhocaContainer from '../../components/PhocaContainer/PhocaContainer';
import {
  usePhocaDataByCreated,
  usePhocaDataByLikeCount,
} from '../../loader/usePhocaData';

export default function Home() {
  const { init } = isLogin();
  const phocaDataByCreated = usePhocaDataByCreated();
  const phocaDataByLikeCount = usePhocaDataByLikeCount();

  return (
    <div className="mt-55pxr min-w-0 desktop:mt-0 desktop:bg-white">
      <FloatingButton isAuth={init} />
      <Carousel />
      <VerticalCarousel />

      <MainCardContainer
        title="최신 업데이트 포카"
        subTitle="두근두근 오늘의 신상 포카는...!"
      >
        <PhocaContainer phocaData={phocaDataByCreated} />
      </MainCardContainer>
      <ImageLink type="collectBook" />
      <MainCardContainer
        title="가장 많이 찜한 포카"
        subTitle="갖.고.싶.다 🥰  너두? 야 나두!"
      >
        <PhocaContainer phocaData={phocaDataByLikeCount} />
      </MainCardContainer>
      <ImageLink type="faq" />
    </div>
  );
}
