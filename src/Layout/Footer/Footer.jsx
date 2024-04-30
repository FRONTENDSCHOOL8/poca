import { Link } from 'react-router-dom';

export default function Footer() {
  const teamMembers = [
    { name: '김경민', email: 'kmkim405@gmail.com', github: 'highballplz' },
    { name: '김충만', email: 'cm730712@gmail.com', github: 'fullkeem' },
    { name: '송현규', email: 'thdgusrb@gmail.com', github: 'song0331' },
    { name: '이슬기나', email: 'kinalee0430@gmail.com', github: 'roben31380' },
    { name: '이현서', email: 'hleehslee@gmail.com', github: 'pistapixie' },
  ];

  return (
    <footer>
      <div className="lg:px-10 flex h-11 w-full items-center justify-between bg-gray100 px-6 text-b01 font-m02 text-gray500">
        <div className="flex flex-grow items-center justify-center">
          <Link to="https://github.com/FRONTENDSCHOOL8/shoong?tab=readme-ov-file#readme">
            프로젝트 소개
          </Link>
        </div>
        <span className="mx-2">|</span>
        <div className="flex flex-grow items-center justify-center">
          <Link to="https://github.com/FRONTENDSCHOOL8/shoong">Github</Link>
        </div>
        <span className="mx-2">|</span>
        <div className="flex flex-grow items-center justify-center">
          <Link to="/">채용정보</Link>
        </div>
        <span className="mx-2">|</span>
        <div className="flex flex-grow items-center justify-center">
          <Link to="/">고객센터</Link>
        </div>
      </div>

      <div className="lg:px-10 mb-2 flex flex-col items-start bg-gray500 px-6 pb-20 text-white">
        <div className="flex flex-col items-start justify-center pb-4 pt-5 ">
          <p className=" pt-4 text-b04 font-b03">SHOONG</p>
          <p className="mt-1 text-b01 font-b02">
            (주)멋쟁이사자처럼 프론트엔드스쿨 8기
          </p>
        </div>
        <div className="w-full border-t border-white border-opacity-50"></div>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-4 pb-5 pt-5">
          <h3 className="col-span-full text-sb02 font-sb02">팀원 소개</h3>
          {teamMembers.map((member) => (
            <div key={member.name} className="mt-2 text-b02 font-b02">
              <p>{member.name}</p>

              <a
                href={`mailto:${member.email}`}
                className="text-gray200 hover:underline"
              >
                {member.email}
              </a>
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray200 hover:underline"
              >
                GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
