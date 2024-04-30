import CollectBookItem from '../CollectBookItem/CollectBookItem';

export default function CollectBookItemContainer({
  title,
  state,
  phocaData,
  phocaId,
  handleClickCard,
  handlePressCard,
  imgFilter,
  pb,
}) {
  return (
    <div className={`${pb}`}>
      <div className="mb-17pxr pl-20pxr text-xl font-bold leading-7 text-zinc-800">
        {title}
      </div>
      <ul className="mx-20pxr flex h-280pxr flex-wrap justify-start gap-10pxr overflow-y-scroll desktop:h-auto">
        {phocaData.map((item) => {
          if (phocaId.includes(item.id) === state) {
            return (
              <CollectBookItem
                key={item.id}
                item={item}
                handleClickCard={handleClickCard}
                handlePressCard={handlePressCard}
                filter={imgFilter}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}
