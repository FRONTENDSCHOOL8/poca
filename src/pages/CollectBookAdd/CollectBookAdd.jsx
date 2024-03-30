import Bias from '@/components/Bias/Bias';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';

export default function CollectBookAdd() {
  const photoCardsData = useLoaderData();
  const test = useRef(null);
  // const previousButton = useRef(null);
  // const nextButton = useRef(null);
  // const inputRef = useRef(null);
  // const checkButton = useRef(null);
  const [tabIdx, setTabIdx] = useState(0);
  const [previousButton, setPreviousButton] = useState(-1);
  const [nextButton, setNextButton] = useState(-1);
  const [inputRef, setInputRef] = useState(-1);
  const [checkButton, setcheCkButton] = useState(-1);

  // console.log(previousButton);
  // console.log(nextButton);
  // console.log(inputRef);
  // console.log(checkButton);

  return (
    // <div className="h-full">
    <div className="h-full overflow-x-hidden">
      <DetailHeader title="콜렉트북 추가" />

      <div className="flex  duration-500" ref={test}>
        <div className="mt-20pxr min-w-full">
          <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
            콜렉트북에 추가할 그룹 선택
          </h3>

          <div className="mt-5pxr text-center">
            <button
              onClick={() => {
                test.current.style.transform = `translateX(-100%)`;
                setTabIdx(-1);
                setPreviousButton(-1);
                setNextButton(-1);
                setInputRef(-1);
              }}
              className="h-7 w-64pxr rounded-md bg-zinc-400 text-sm font-semibold text-white duration-200 hover:bg-primary hover:text-white"
            >
              다음
            </button>
          </div>

          <ul className="my-20pxr flex flex-wrap justify-center gap-3">
            {photoCardsData.map((item) => {
              return (
                <li key={item.id} className="mb-10pxr text-center">
                  <Bias
                    tabIndex={tabIdx}
                    alt={`${item.groupName} 로고`}
                    style={`hover:translate-y-1 duration-200 h-58pxr rounded-full border m-auto cursor-pointer `}
                    src={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                    value={`https://shoong.pockethost.io/api/files/groups/${item.id}/${item.logoImage}`}
                    groupName={item.groupName}
                  >
                    {item.groupName}
                  </Bias>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mt-20pxr min-w-full">
          <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
            콜렉트북 제목 입력
          </h3>

          <div className="mt-5pxr flex justify-center gap-2">
            <button
              tabIndex={previousButton}
              onClick={() => {
                test.current.style.transform = `translateX(0%)`;
                previousButton.current.tabIndex = -1;
                nextButton.current.tabIndex = -1;
                inputRef.current.tabIndex = -1;
                setTabIdx(0);
              }}
              className="h-7 w-64pxr rounded-md bg-zinc-400 text-sm font-semibold text-white duration-200 hover:bg-primary hover:text-white"
            >
              이전
            </button>
            <button
              tabIndex={nextButton}
              onClick={() => {
                test.current.style.transform = `translateX(-200%)`;
                checkButton.current.tabIndex = 0;
              }}
              className="h-7 w-64pxr rounded-md bg-zinc-400 text-sm font-semibold text-white duration-200 hover:bg-primary hover:text-white"
            >
              다음
            </button>
          </div>

          <div className=" absolute left-1/2 mt-50pxr w-4/5 -translate-x-1/2 text-center">
            <label htmlFor="collectBookTitle" className="">
              콜렉트북 제목
            </label>
            <input
              tabIndex={inputRef}
              type="text"
              id="collectBookTitle"
              name="collectBookTitle"
              placeholder="ex) 새로운 청바지"
              className="w-full rounded-xl px-2 py-2 text-center"
            />
          </div>
        </div>

        <div className="mt-20pxr min-w-full">
          <h3 className="flex h-full flex-col items-center justify-center text-25pxr font-bold">
            <div>
              <strong>New</strong> 콜렉트북📘 추가완료!
            </div>
            <Link
              tabIndex={checkButton}
              to="/profile"
              className="h-7 w-64pxr rounded-md bg-zinc-400 text-center text-sm font-semibold leading-28pxr text-white duration-200 hover:bg-primary hover:text-white"
            >
              확인
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
