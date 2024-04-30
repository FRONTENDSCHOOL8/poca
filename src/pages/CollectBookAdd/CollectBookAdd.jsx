import pb from '@/api/pocketbase';
import Bias from '@/components/Bias/Bias';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import { isLogin } from '@/store/store';
import { useState } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function CollectBookAdd() {
  const { collectBookInfo } = isLogin();
  const groupData = useLoaderData();
  const collectBook = useRef(null);
  const [select, setSelect] = useState('미정'); // group 로고 선택
  const fileRef = useRef(null);
  const thumbNailRef = useRef(null);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [nextButtonStyle, setNextButtonStyle] = useState('bg-zinc-400');

  const [titleCheckDisable, setTitleCheckDisable] = useState(true);
  const [titleCheckStyle, setTitleCheckStyle] = useState('bg-zinc-400');

  const [saveDisable, setSaveDisable] = useState(true);
  const [saveStyle, setSaveStyle] = useState('bg-zinc-400');

  const [fileDisable, setFileDisable] = useState(true);
  const [fileStyle, setFileStyle] = useState('bg-gray-300 opacity-50');

  const [inputDisable, setInputDisable] = useState(true);

  const [titlePlaceholder, setTitlePlaceholder] =
    useState('그룹을 먼저 선택해주세요');

  const [previousDisable, setPreviousDisable] = useState(true);

  const [biasDisable, setBiasDisable] = useState(false);
  const [image, setImage] = useState(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSave = () => {
    const formData = new FormData();
    const thumbNailImage = fileRef.current.files[0];

    formData.append('users', JSON.parse(localStorage.getItem('auth')).user.id);
    formData.append('title', collectBookTitle);
    formData.append('group', select);
    formData.append('thumbNail', thumbNailImage);

    try {
      // 콜렉트북 생성
      pb.collection('collectBook')
        .create(formData)
        .then((collectBookData) => {
          pb.collection('users')
            .getOne(JSON.parse(localStorage.getItem('auth')).user.id)
            .then((usersData) => {
              // 유저 정보에서 기존 콜렉트북에 새로운 콜렉트북 추가
              usersData.collectBook.push(collectBookData.id);

              // 추가된 정보로 업데이트
              pb.collection('users').update(
                JSON.parse(localStorage.getItem('auth')).user.id,
                usersData
              );

              // 콜렉트북 정보는 localStorage에서 가져옴으로 localStorage 업데이트
              pb.collection('users')
                .getOne(JSON.parse(localStorage.getItem('auth')).user.id, {
                  expand: 'collectBook',
                })
                .then((data) => {
                  collectBookInfo(data.expand.collectBook);
                });
            });
        });
    } catch (error) {
      console.log('에러!!: ', error);
    }

    setTimeout(() => {
      navigate('/profile');
    }, 500);
  };

  const navigate = useNavigate();

  const titleRef = useRef(null);

  const [collectBookTitle, setCollectBookTitle] =
    useState('콜렉트북 제목 입력');

  const handleSelectGroup = (e) => {
    if (e.target.tagName === 'IMG') setSelect(e.target.title);
    else if (e.target.tagName === 'BUTTON') setSelect(e.target.id);

    setNextButtonDisabled(false);
    setNextButtonStyle('hover:bg-secondary bg-primary');
  };

  const handleCollectBookTitle = () => {
    if (!titleRef.current.value) setCollectBookTitle('콜렉트북 제목 입력');
    else setCollectBookTitle(titleRef.current.value);

    setFileDisable(false);
    setFileStyle('bg-gray-200 cursor-pointer');

    if (fileRef.current.files.length === 1) {
      setSaveStyle('hover:bg-secondary bg-primary');
      setSaveDisable(false);
    }
  };

  return (
    <>
      {/* 데스크톱 화면 */}
      <div className="max-w-1280pxr hidden h-full justify-center bg-white desktop:flex">
        <div className="flex duration-500" ref={collectBook}>
          <div className="w-730pxr border-r border-neutral-300 pb-150pxr pt-20pxr">
            <h3 className="mt-30pxr pt-30pxr text-center text-24pxr">
              <div>콜렉트북에 추가할 그룹 선택</div>
              <span className="mt-4 inline-block text-center font-bold text-primary">
                {' '}
                {select}
              </span>
            </h3>

            <ul className="mb-10pxr mt-80pxr flex flex-wrap justify-center gap-7">
              {groupData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="mb-10pxr text-center"
                    onClick={(e) => {
                      handleSelectGroup(e);
                      setInputDisable(false);
                      setTitlePlaceholder('ex) 새로운 청바지');
                    }}
                  >
                    <Bias
                      disabled={biasDisable}
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

          <div className="mt-20pxr w-550pxr">
            <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
              {collectBookTitle}
            </h3>

            <div className="m-auto mt-20pxr flex w-450pxr text-center">
              <label htmlFor="collectBookTitle" className="sr-only">
                콜렉트북 제목
              </label>
              <input
                disabled={inputDisable}
                onChange={(e) => {
                  if (e.target.value) {
                    setTitleCheckDisable(false);
                    setTitleCheckStyle('hover:bg-secondary bg-primary');
                    titleRef.current.value = e.target.value;
                  } else {
                    setCollectBookTitle('콜렉트북 제목 입력');
                    setTitleCheckDisable(true);
                    setTitleCheckStyle('bg-zinc-400');
                    setFileDisable(true);
                    setFileStyle('bg-gray-300 opacity-50');
                    setSaveStyle('bg-zinc-400');
                    setSaveDisable(true);
                  }
                }}
                ref={titleRef}
                type="text"
                id="collectBookTitle"
                name="collectBookTitle"
                placeholder={titlePlaceholder}
                className="mr-2 w-full rounded-xl bg-gray-200 px-2 py-2 text-center"
              />
              <button
                disabled={titleCheckDisable}
                onClick={handleCollectBookTitle}
                className={`${titleCheckStyle} w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
              >
                확인
              </button>
            </div>

            {/* <h3 className="mt-85pxr text-center text-18pxr">
            콜렉트북 썸네일 설정
          </h3> */}

            <div className="mb-8 mt-85pxr flex justify-center">
              <label
                className={`${fileStyle} flex h-96 w-64 flex-col items-center justify-center rounded-lg text-center leading-normal`}
              >
                {image ? (
                  <img
                    ref={thumbNailRef}
                    tabIndex={0}
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="h-full w-full rounded-lg object-cover object-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileRef.current.click();
                        e.preventDefault();
                      }
                    }}
                  />
                ) : (
                  <button
                    disabled={fileDisable}
                    className="flex flex-col"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileRef.current.click();
                        e.preventDefault();
                      }
                    }}
                    onClick={() => fileRef.current.click()}
                  >
                    <span className="m-auto text-xl text-gray400" role="none">
                      +
                    </span>
                    <span className="m-auto text-gray400">
                      콜렉트북 썸네일 설정
                    </span>
                    <span className="text-gray400">
                      제목을 먼저 입력해주세요!
                    </span>
                  </button>
                )}

                <input
                  disabled={fileDisable}
                  ref={fileRef}
                  type="file"
                  name="fileInput"
                  id="fileInput"
                  className="m-auto my-20pxr hidden w-3/5"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setSaveStyle('hover:bg-secondary bg-primary');
                    setSaveDisable(false);
                  }}
                />
              </label>
            </div>

            <div className="mb-20pxr flex justify-center gap-2">
              <button
                disabled={saveDisable}
                onClick={() => {
                  setIsSaveModalOpen(true);
                }}
                className={`${saveStyle} h-7 w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
              >
                저장
              </button>

              <ConfirmationModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={handleSave}
                message="정말 저장하시겠습니까?"
                cancelButtonText="취소"
                confirmButtonText="저장"
                modalStyles="rounded-lg bg-white p-6 shadow-lg w-300pxr"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 화면 */}
      <div className="h-full overflow-x-hidden desktop:hidden">
        <DetailHeader title="콜렉트북 추가" />

        <div className="flex  duration-500" ref={collectBook}>
          {/* 콜렉트북에 추가할 그룹 선택 */}
          <div className="mt-20pxr min-w-full">
            <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
              콜렉트북에 추가할 그룹 선택 -
              <span className="text-center font-bold text-primary">
                {' '}
                {select}
              </span>
            </h3>

            <ul className="mb-10pxr mt-20pxr flex flex-wrap justify-center gap-3">
              {groupData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="mb-10pxr text-center"
                    onClick={handleSelectGroup}
                  >
                    <Bias
                      disabled={biasDisable}
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
                  collectBook.current.style.transform = `translateX(-100%)`;
                  setInputDisable(false);
                  setPreviousDisable(false);
                  setBiasDisable(true);
                  setNextButtonDisabled(true);
                }}
                className={`${nextButtonStyle} h-7 w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
                disabled={nextButtonDisabled}
              >
                다음
              </button>
            </div>
          </div>

          {/* 제목, 썸네일 선택 */}
          <div className="relative mt-20pxr min-w-full">
            <h3 className="mt-30pxr pt-30pxr text-center text-18pxr">
              {collectBookTitle}
            </h3>

            <div className="absolute left-1/2 mt-20pxr flex w-4/5 -translate-x-1/2 text-center">
              <label htmlFor="collectBookTitle" className="sr-only">
                콜렉트북 제목
              </label>
              <input
                disabled={inputDisable}
                onChange={(e) => {
                  if (e.target.value) {
                    setTitleCheckDisable(false);
                    setTitleCheckStyle('hover:bg-secondary bg-primary');
                  } else {
                    setCollectBookTitle('콜렉트북 제목 입력');
                    setTitleCheckDisable(true);
                    setTitleCheckStyle('bg-zinc-400');
                    setFileDisable(true);
                    setFileStyle('bg-gray-300 opacity-50');
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

            <div className="mb-8 mt-85pxr flex justify-center">
              <label
                className={`${fileStyle} flex h-96 w-64 flex-col items-center justify-center rounded-lg text-center leading-normal`}
              >
                {image ? (
                  <img
                    ref={thumbNailRef}
                    tabIndex={0}
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="h-full w-full rounded-lg object-cover object-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileRef.current.click();
                        e.preventDefault();
                      }
                    }}
                  />
                ) : (
                  <button
                    disabled={fileDisable}
                    className="flex flex-col"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileRef.current.click();
                        e.preventDefault();
                      }
                    }}
                    onClick={() => fileRef.current.click()}
                  >
                    <span className="m-auto text-xl text-gray400" role="none">
                      +
                    </span>
                    <span className="m-auto text-gray400">
                      콜렉트북 썸네일 설정
                    </span>
                    <span className="text-gray400">
                      제목을 먼저 입력해주세요!
                    </span>
                  </button>
                )}

                <input
                  disabled={fileDisable}
                  ref={fileRef}
                  type="file"
                  name="fileInput"
                  id="fileInput"
                  className="m-auto my-20pxr hidden w-3/5"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setSaveStyle('hover:bg-secondary bg-primary');
                    setSaveDisable(false);
                  }}
                />
              </label>
            </div>

            <div className="mb-20pxr flex justify-center gap-2">
              <button
                disabled={previousDisable}
                onClick={() => {
                  collectBook.current.style.transform = `translateX(0%)`;
                  setInputDisable(true);
                  setTitleCheckDisable(true);
                  setFileDisable(true);
                  setFileStyle('bg-gray-300 opacity-50');
                  setPreviousDisable(true);
                  setSaveDisable(true);
                  setSaveStyle('bg-zinc-400');
                  setBiasDisable(false);
                  setNextButtonDisabled(false);
                  // thumbNailRef.current.src = '';
                  // setImage('');
                }}
                className="h-7 w-64pxr rounded-md bg-primary text-sm font-semibold text-white duration-200 hover:bg-secondary hover:text-white"
              >
                이전
              </button>
              <button
                disabled={saveDisable}
                onClick={() => {
                  collectBook.current.style.transform = `translateX(-200%)`;
                  handleSave();
                }}
                className={`${saveStyle} h-7 w-64pxr rounded-md text-sm font-semibold text-white duration-200`}
              >
                저장
              </button>
            </div>
          </div>

          {/* 저장 완료를 알려주는 부분 */}
          <div className="mt-20pxr min-w-full">
            <h3 className="flex h-full flex-col items-center justify-center text-25pxr font-bold">
              <div>
                <strong>New</strong> 콜렉트북📘 추가완료!
              </div>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
