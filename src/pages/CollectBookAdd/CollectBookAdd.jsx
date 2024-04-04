import pb from '@/api/pocketbase';
import Bias from '@/components/Bias/Bias';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import { isLogin } from '@/store/store';
import { useState } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';

export default function CollectBookAdd() {
  const { collectBookInfo } = isLogin();
  const photoCardsData = useLoaderData();
  const test = useRef(null);
  const [select, setSelect] = useState('미정');
  const [thumbnail, setThumbnail] = useState('NewJeans');
  const fileRef = useRef(null);
  const thumbNailRef = useRef(null);

  const [groupDisabled, setGroupDisabled] = useState(true);
  const [nextButtonStyle, setNextButtonStyle] = useState('bg-zinc-400');

  const [titleCheckDisable, setTitleCheckDisable] = useState(true);
  const [titleCheckStyle, setTitleCheckStyle] = useState('bg-zinc-400');

  const [saveDisable, setSaveDisable] = useState(true);
  const [saveStyle, setSaveStyle] = useState('bg-zinc-400');

  const [fileDisable, setFileDisable] = useState(true);

  const titleRef = useRef(null);
  const [collectBookTitle, setCollectBookTitle] =
    useState('콜렉트북 제목 입력');

  const handleSelectGroup = (e) => {
    if (e.target.tagName === 'IMG') {
      setSelect(e.target.title);
      setThumbnail(e.target.title);
      setGroupDisabled(false);
      setNextButtonStyle('hover:bg-secondary bg-primary');
    } else if (e.target.tagName === 'BUTTON') {
      setSelect(e.target.id);
      setThumbnail(e.target.id);
      setGroupDisabled(false);
      setNextButtonStyle('hover:bg-secondary bg-primary');
    }
  };

  const handleCollectBookTitle = () => {
    if (!titleRef.current.value) setCollectBookTitle('콜렉트북 제목 입력');
    else setCollectBookTitle(titleRef.current.value);
    setFileDisable(false);

    if (fileRef.current.files.length === 1) {
      setSaveStyle('hover:bg-secondary bg-primary');
      setSaveDisable(false);
    }
  };

  return (
    <div className="h-full overflow-x-hidden">
      <DetailHeader title="콜렉트북 추가" />

      <div className="flex  duration-500" ref={test}>
        <div className="mt-20pxr min-w-full">
          <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
            콜렉트북에 추가할 그룹 선택 -
            <span className="text-center font-bold text-primary">
              {' '}
              {select}
            </span>
          </h3>

          <ul className="mb-10pxr mt-20pxr flex flex-wrap justify-center gap-3">
            {photoCardsData.map((item) => {
              return (
                <li
                  key={item.id}
                  className="mb-10pxr text-center"
                  onClick={handleSelectGroup}
                >
                  <Bias
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

          <div className="mb-15pxr text-center">
            <button
              onClick={() => {
                test.current.style.transform = `translateX(-100%)`;
              }}
              className={`${nextButtonStyle} h-7 w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
              disabled={groupDisabled}
            >
              다음
            </button>
          </div>
        </div>

        <div className="relative mt-20pxr min-w-full">
          <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
            {collectBookTitle}
          </h3>

          <div className="absolute left-1/2 mt-20pxr flex w-4/5 -translate-x-1/2 text-center">
            <label htmlFor="collectBookTitle" className="sr-only">
              콜렉트북 제목
            </label>
            <input
              onChange={(e) => {
                if (e.target.value) {
                  setTitleCheckDisable(false);
                  setTitleCheckStyle('hover:bg-secondary bg-primary');
                } else {
                  setCollectBookTitle('콜렉트북 제목 입력');
                  setTitleCheckDisable(true);
                  setTitleCheckStyle('bg-zinc-400');
                  setFileDisable(true);
                  setSaveStyle('bg-zinc-400');
                  setSaveDisable(true);
                }
              }}
              ref={titleRef}
              type="text"
              id="collectBookTitle"
              name="collectBookTitle"
              placeholder="ex) 새로운 청바지"
              className="mr-2 w-full rounded-xl px-2 py-2 text-center"
            />
            <button
              disabled={titleCheckDisable}
              onClick={handleCollectBookTitle}
              className={`${titleCheckStyle} w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
            >
              확인
            </button>
          </div>

          <h3 className="mt-85pxr text-center text-18pxr">
            콜렉트북 썸네일 설정
          </h3>

          <div className="flex flex-col justify-center">
            <label htmlFor="fileInput" className="sr-only">
              썸네일 설정
            </label>
            <input
              disabled={fileDisable}
              ref={fileRef}
              type="file"
              name="fileInput"
              id="fileInput"
              className="m-auto my-20pxr w-3/5"
              onChange={(e) => {
                const url = URL.createObjectURL(e.target.files[0]);
                thumbNailRef.current.src = url;

                setSaveStyle('hover:bg-secondary bg-primary');
                setSaveDisable(false);
              }}
            />
          </div>

          <div className="m-auto mb-20pxr h-350pxr w-[70%] rounded-xl border-2 border-primary p-10pxr">
            <img
              src=""
              alt=""
              ref={thumbNailRef}
              className="object- m-auto h-full rounded object-contain"
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                test.current.style.transform = `translateX(0%)`;
              }}
              className="h-7 w-64pxr rounded-md bg-primary text-sm font-semibold text-white duration-200 hover:bg-secondary hover:text-white"
            >
              이전
            </button>
            <button
              disabled={saveDisable}
              onClick={() => {
                test.current.style.transform = `translateX(-200%)`;

                const formData = new FormData();

                const thumbNailImage = fileRef.current.files[0];

                formData.append(
                  'users',
                  JSON.parse(localStorage.getItem('auth')).user.id
                );
                formData.append('title', collectBookTitle);
                formData.append('group', select);
                formData.append('thumbNail', thumbNailImage);

                pb.collection('collectBook')
                  .create(formData)
                  .then((collectBookData) => {
                    pb.collection('users')
                      .getOne(JSON.parse(localStorage.getItem('auth')).user.id)
                      .then((usersData) => {
                        usersData.collectBook.push(collectBookData.id);

                        pb.collection('users').update(
                          JSON.parse(localStorage.getItem('auth')).user.id,
                          usersData
                        );

                        pb.collection('users')
                          .getOne(
                            JSON.parse(localStorage.getItem('auth')).user.id,
                            {
                              expand: 'collectBook',
                            }
                          )
                          .then((data) => {
                            collectBookInfo(data.expand.collectBook);
                          });
                      });
                  });
              }}
              className={`${saveStyle} h-7 w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
              // className="h-7 w-64pxr rounded-md bg-zinc-400 text-sm font-semibold text-white duration-200 hover:bg-primary hover:text-white"
            >
              저장
            </button>
          </div>
        </div>

        <div className="mt-20pxr min-w-full">
          <h3 className="flex h-full flex-col items-center justify-center text-25pxr font-bold">
            <div>
              <strong>New</strong> 콜렉트북📘 추가완료!
            </div>
            <Link
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
