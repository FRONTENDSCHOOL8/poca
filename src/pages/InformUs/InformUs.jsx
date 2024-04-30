import React from 'react';
import { Link } from 'react-router-dom';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import { TbCardsFilled, TbCards } from 'react-icons/tb';
import { MdPlace } from 'react-icons/md';
import ProfileSetting from '../ProfileSetting/ProfileSetting';

export default function InformUs() {
  return (
    <div className="mb-28 flex flex-col items-center pb-28 pt-16 desktop:mb-0 desktop:flex-row desktop:bg-white desktop:pb-0 desktop:pt-0">
      <DetailHeader title="제보하기" desktop="desktop:hidden" />

      <div className="hidden w-310pxr border-r border-neutral-300 pt-100pxr desktop:block">
        <ProfileSetting />
      </div>

      <div className="pt-12 text-3xl desktop:hidden">👀</div>
      <h1 className="pb-20 text-xl font-semibold desktop:hidden">
        원하는 정보가 없나요? 슝에 제보해 주세요!
      </h1>
      <div className="flex flex-col items-center space-y-6 desktop:hidden">
        <Link
          to="/informUs/photoCardSubmit"
          className="flex w-full max-w-xs items-center justify-center rounded-lg bg-secondary px-8 py-4 text-white transition duration-300 ease-in-out hover:bg-primary"
        >
          포토카드 제보하러 가기 {'>'}
        </Link>
        <Link
          to="/informUs/meetupSubmit"
          className="flex w-full max-w-xs items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 text-primary transition duration-300 ease-in-out hover:font-bold"
        >
          밋업 제보하러 가기 {'>'}
        </Link>
      </div>

      {/* 데스크톱 화면  */}
      <div className="m-auto hidden flex-col desktop:flex">
        <div className="text-center text-3xl">👀</div>
        <h1 className="pb-20 text-xl font-semibold">
          원하는 정보가 없나요? 슝에 제보해 주세요!
        </h1>
        <div className="flex flex-col items-center space-y-6">
          <Link
            to="/informUs/photoCardSubmit"
            className="flex w-full max-w-xs items-center justify-center rounded-lg bg-secondary px-8 py-4 text-white transition duration-300 ease-in-out hover:bg-primary desktop:h-150pxr"
          >
            포토카드 제보하러 가기 >
          </Link>
          <Link
            to="/informUs/meetupSubmit"
            className="flex w-full max-w-xs items-center justify-center rounded-lg border-2 border-primary bg-white px-8 py-4 text-primary transition duration-300 ease-in-out hover:font-bold desktop:h-150pxr"
          >
            밋업 제보하러 가기 >
          </Link>
        </div>
      </div>
    </div>
  );
}
